const timeout = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const sleepAsync =  async (ms: number = 1000, fn: Function = () => {}) => {
  await timeout(ms);
  fn();
};