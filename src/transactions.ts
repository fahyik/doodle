import { readFile } from "fs";
import { promisify } from "util";
import * as path from "path";

type Transaction = {
  ibanSource: string;
  amount: string;
  transactionType: string;
  companyName: string;
};

type ReadFilter = {
  iban?: string;
};

interface TransactionService {
  read(filter: ReadFilter): Promise<Transaction[]>;
  readLargest(filter: ReadFilter): Promise<Transaction | undefined>;
}

function buildTransactionService(): TransactionService {
  var data: Transaction[] | undefined = undefined;

  async function loadData(): Promise<Transaction[]> {
    const asyncReadFile = promisify(readFile);

    const dataString = await asyncReadFile(
      path.resolve(__dirname, "data/transactions.csv"),
      "utf8"
    );
    const rows = dataString.split("\n"); // list of strings with comma

    return rows.slice(1).map((row) => {
      const [ibanSource, amount, transactionType, companyName] = row.split(",");
      return {
        ibanSource,
        amount,
        transactionType,
        companyName,
      };
    });
  }

  function getLargestTransaction(transactions: Transaction[]) {
    var max: Transaction | undefined = undefined;

    for (const transaction of transactions) {
      if (max === undefined) {
        max = transaction;
      }

      // FIXME: check that this works for string
      if (Number(transaction.amount) > Number(max.amount)) {
        max = transaction;
      }
    }

    return max;
  }

  async function read(filter: ReadFilter) {
    if (!data) {
      data = await loadData();
    }

    if (filter.iban !== undefined) {
      const filtered = data.filter((transaction) =>
        transaction.ibanSource.includes(filter.iban as string)
      );
      return filtered;
    }

    return data;
  }

  async function readLargest(filter: ReadFilter) {
    const filtered = await read(filter);

    return getLargestTransaction(filtered);
  }

  return {
    read,
    readLargest,
  };
}

export { buildTransactionService };
