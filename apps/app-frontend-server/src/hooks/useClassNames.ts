import { useMemo } from 'react';

export type UseClassNamesProps = Array<string | undefined>;

const useClassNames = (classNames: UseClassNamesProps): string => {
  return useMemo(() => classNames.filter(Boolean).join(' '), [classNames]);
};

export default useClassNames;
