const timeout = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const sleepWithCallbackAsync = async (fn: Function, ms: number) => {
  await timeout(ms || 1000);
  return fn();
};

export const sleepAsync =  async ( ms: number) => {
  await timeout(ms || 1000);
};