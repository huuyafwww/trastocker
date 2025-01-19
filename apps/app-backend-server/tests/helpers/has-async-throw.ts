// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasAsyncThrow = async (fn: () => Promise<any>): Promise<boolean> => {
  try {
    await fn();
    return false;
  }
  catch {
    return true;
  }
};
