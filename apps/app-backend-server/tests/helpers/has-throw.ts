// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasThrow = (fn: () => any): boolean => {
  try {
    fn();
    return false;
  }
  catch {
    return true;
  }
};
