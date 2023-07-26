import pageOne from "./responses-page-1.json";
import pageTwo from "./responses-page-2.json";

const data: Record<string, unknown> = {};

for (const row of pageOne.results) {
  data[row.contact_email] = {
    share_url: row.share_url,
    media_url: row.media_url,
  };
}

for (const row of pageTwo.results) {
  data[row.contact_email] = {
    share_url: row.share_url,
    media_url: row.media_url,
  };
}

console.log(data);
