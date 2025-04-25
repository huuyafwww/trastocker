import which from 'which';

export const hasBin = async (path: string): Promise<boolean> => {
  return !!await which(path, { nothrow: true });
};
