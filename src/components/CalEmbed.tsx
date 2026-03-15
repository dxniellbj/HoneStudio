"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CalEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <Cal
      calLink="niell-alfajora/30min"
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
      config={{
        layout: "month_view",
        theme: "dark",
      }}
    />
  );
}
