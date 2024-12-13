import { useMemo } from 'react';

import { style } from '@vanilla-extract/css';

import type { StyleRule, ComplexStyleRule } from '@vanilla-extract/css';

type useCreateStyleProps = {
  styleRule: StyleRule;
  classNames?: string[];
};

const useCreateStyle = ({ styleRule, classNames }: useCreateStyleProps) => {
  return useMemo(() => (className?: string) => [style([styleRule, className].filter(Boolean) as ComplexStyleRule), ...classNames ?? []], [styleRule, classNames]);
};

export default useCreateStyle;
