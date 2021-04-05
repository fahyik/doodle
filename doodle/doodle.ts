export function buildCheckLimit(dataStore: Map<string, Date[]>) {
  function checkLimit(customer: string): boolean {
    const log = dataStore.get(customer);

    if (log === undefined) {
      return true;
    }

    const now = new Date();
    let counter = 0;
    for (const request of log) {
      if (now.getTime() - request.getTime() < 2000) {
        counter += 1;
      }
    }

    return counter < 5;
  }

  return { checkLimit };
}

// TODO; type result
export function buildRateLimiter(): any {
  let counter: number = 0;

  const dataStore = new Map<string, Date[]>();

  const checkLimit = buildCheckLimit(dataStore);

  const api = {
    execute_endpoint: (customer: string) => {
      return "results for " + customer;
    },
  };

  function callApi(customer: string) {
    if (!checkLimit.checkLimit(customer)) {
      // return and not process
      return;
    }

    const log = dataStore.get(customer);
    if (log === undefined) {
      dataStore.set(customer, [new Date()]);
    } else {
      log.push(new Date());
    }

    const result = api.execute_endpoint(customer);

    return result;
  }

  return { callApi };
}
