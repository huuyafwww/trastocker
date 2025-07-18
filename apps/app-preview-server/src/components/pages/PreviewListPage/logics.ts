export const usePreviewLinks = (): {
  appFrontendServer: string;
  uiElements: string;
  liam: string;
  tbls: string;
} => {
  return {
    appFrontendServer: 'storybook/app-frontend-server',
    uiElements: 'storybook/ui-elements',
    liam: `https://liambx.com/erd/p/github.com/huuyafwww/trastocker/blob/${process.env.NEXT_PUBLIC_GIT_COMMIT_REF}/definitions/database-definition/schema.json`,
    tbls: `https://github.com/huuyafwww/trastocker/blob/${process.env.NEXT_PUBLIC_GIT_COMMIT_REF}/definitions/database-definition/dbdoc/README.md`,
  };
};
