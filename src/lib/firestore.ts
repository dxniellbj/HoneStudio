import { initializeApp, getApps, cert, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function initAdmin() {
  if (getApps().length > 0) return getApps()[0];

  // On Firebase Hosting (frameworksBackend), default credentials are available automatically.
  // For local dev, set GOOGLE_APPLICATION_CREDENTIALS to a service account key JSON.
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccount) {
    return initializeApp({
      credential: cert(JSON.parse(serviceAccount)),
    });
  }

  return initializeApp({
    credential: applicationDefault(),
  });
}

const app = initAdmin();
export const db = getFirestore(app);
