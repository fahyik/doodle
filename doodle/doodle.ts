import fetch from "node-fetch";

import charges from "./charges.json";
import customerCharges from "./customer-charges.json";

export async function replayRequests(): Promise<void> {
  const idMap = new Map<string, string>();

  for (const obj of customerCharges) {
    const { request, response } = obj;

    // replace the template ids
    let newBody = request.body;
    let newRequestUrl = request.url;
    idMap.forEach((value, key) => {
      newBody = newBody.replace(key, value);
      newRequestUrl = newRequestUrl.replace(key, value);
    });

    try {
      const result = await fetch(`https://api.stripe.com${newRequestUrl}`, {
        method: request.method,
        // library doesnt allow body when method is get or head
        body: ["GET", "HEAD"].includes(request.method) ? undefined : newBody,
        headers: request.headers,
      });
      const data = await result.json();

      // tracking the template ids returned
      if (data.id) {
        const bodyInTemplate = JSON.parse(response.body);
        idMap.set(bodyInTemplate.id, data.id);
      }
      console.log(data);

      assert(result.status, response.code);
      console.log("success");
      console.log(result.status);
    } catch (error) {
      console.log(error);
    }
  }
}

function assert(expected: any, actual: any) {
  if (expected !== actual) {
    throw new Error("Assertion error");
  }
}

replayRequests();
