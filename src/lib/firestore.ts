import { initializeApp, getApps, cert, applicationDefault } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const PROJECT_ID = process.env.GCLOUD_PROJECT || "hone-studio";
const SECRET_NAME = process.env.FIREBASE_SECRET_NAME || "firebase-service-account";

let dbInstance: Firestore | null = null;
let initPromise: Promise<Firestore> | null = null;

async function getServiceAccountFromSecretManager(): Promise<string | null> {
  try {
    const client = new SecretManagerServiceClient();
    const [version] = await client.accessSecretVersion({
      name: `projects/${PROJECT_ID}/secrets/${SECRET_NAME}/versions/latest`,
    });
    
    const payload = version.payload?.data;
    if (payload) {
      return typeof payload === "string" ? payload : payload.toString("utf8");
    }
    return null;
  } catch (err) {
    console.warn("Could not fetch secret from Secret Manager:", err);
    return null;
  }
}

async function initAdmin() {
  if (getApps().length > 0) {
    return getFirestore(getApps()[0]);
  }

  // Priority 1: Direct env var (for CI/CD or local override)
  let serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  
  console.log("[Firestore] Init - has service account env:", !!serviceAccount);

  // Priority 2: Pull from Secret Manager
  if (!serviceAccount) {
    serviceAccount = await getServiceAccountFromSecretManager() ?? undefined;
  }

  // Priority 3: Use service account JSON
  if (serviceAccount) {
    console.log("[Firestore] Using service account from env var");
    try {
      const parsed = JSON.parse(serviceAccount);
      console.log("[Firestore] Service account project:", parsed.project_id);
      const app = initializeApp({
        credential: cert(parsed),
      });
      return getFirestore(app);
    } catch (err) {
      console.error("[Firestore] Failed to parse service account:", err);
    }
  }

  // Priority 4: Application default credentials (Firebase Hosting, Cloud Run, etc.)
  console.log("[Firestore] Falling back to application default credentials");
  const app = initializeApp({
    credential: applicationDefault(),
  });
  return getFirestore(app);
}

// Lazy initialization - returns a promise that resolves to Firestore
function getDb(): Promise<Firestore> {
  if (dbInstance) return Promise.resolve(dbInstance);
  
  if (!initPromise) {
    initPromise = initAdmin().then((firestore) => {
      dbInstance = firestore;
      return firestore;
    });
  }
  
  return initPromise;
}

// Export a proxy that lazily initializes
export const db = new Proxy({} as Firestore, {
  get(_, prop: keyof Firestore) {
    // For collection(), we need to return an async-aware wrapper
    if (prop === "collection") {
      return (collectionPath: string) => {
        return {
          async add(data: FirebaseFirestore.WithFieldValue<FirebaseFirestore.DocumentData>) {
            const firestore = await getDb();
            return firestore.collection(collectionPath).add(data);
          },
          async doc(docPath?: string) {
            const firestore = await getDb();
            return docPath 
              ? firestore.collection(collectionPath).doc(docPath)
              : firestore.collection(collectionPath).doc();
          },
          async get() {
            const firestore = await getDb();
            return firestore.collection(collectionPath).get();
          },
        };
      };
    }
    return undefined;
  },
});
