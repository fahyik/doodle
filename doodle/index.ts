import fs from "fs";
import csv from "csv-parser";
import { parsePhoneNumberWithError } from "libphonenumber-js";
import { v5 as uuidv5, NIL } from "uuid";

import * as EmailValidator from "email-validator";
import { videoAskData } from "./videoask-data";

function capitalize(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

function convertSituation(input: string): string {
  switch (input.toLowerCase()) {
    case "étudiant":
      return "student";
    case "actif":
      return "employed";
    case "sans activité":
      return "unemployed";
    default:
      return "unknown";
  }
}

interface CSVRow {
  [key: string]: string;
}

const filePath = "/Users/fahyik/Dev/doodle/doodle/companions-2023-07-24.csv";

async function readCSV(filePath: string): Promise<string> {
  const data: Record<string, Record<string, any>> = {};

  try {
    const stream = fs.createReadStream(filePath).pipe(csv());

    for await (const row of stream) {
      const phoneNumber = parsePhoneNumberWithError(row.telephone, "FR");
      const isEmailValid = EmailValidator.validate(row.email);

      if (phoneNumber.isValid() === false || isEmailValid === false) {
        continue;
      }

      const dataRow = {
        id: uuidv5(row.tally_respondent_id, NIL),
        user_id: null,
        first_name: capitalize(row.first_name),
        last_name: capitalize(row.last_name),
        employment_status: convertSituation(row.situation),
        phone_number: phoneNumber.number,
        email: row.email.toLowerCase(),
        postal_code: row.postal_code,
        age: row.age,
        created_at: new Date(row.submitted_at),
        tally_submission_id: row.tally_submission_id,
        tally_respondent_id: row.tally_respondent_id,
        intro_video_media_url: videoAskData[row.email]?.media_url ?? null,
        intro_video_share_url: videoAskData[row.email]?.share_url ?? null,
      };

      data[dataRow.phone_number] = dataRow;
    }
  } catch (err) {
    console.error("Error reading CSV file:", err);
  }

  for (const [_key, dataRow] of Object.entries(data)) {
    console.log(
      `('${dataRow.id}', NULL, '${dataRow.first_name}', '${
        dataRow.last_name
      }', '${dataRow.employment_status}', '${dataRow.phone_number}', '${
        dataRow.email
      }', '${dataRow.postal_code}', ${
        dataRow.age
      }, '${dataRow.created_at.toISOString()}', '${
        dataRow.tally_submission_id
      }', '${dataRow.tally_respondent_id}', ${
        dataRow.intro_video_media_url
          ? `'${dataRow.intro_video_media_url}'`
          : "NULL"
      }, ${
        dataRow.intro_video_share_url
          ? `'${dataRow.intro_video_share_url}'`
          : "NULL"
      }),`
    );
  }

  return "success";
}

(async () => {
  const data = await readCSV(filePath);
  console.log(data);
})();
