import fs from 'fs';

import { parse } from 'node-html-parser';
import { $ } from 'zx';

const storybookConfigBaseUri = (indexHtmlPath: string, baseUri: string = '/') => {
  const html = fs.readFileSync(indexHtmlPath, 'utf-8');
  const root = parse(html);
  const head = root.querySelector('head');
  if (!head) {
    throw new Error('No <head> tag found in the HTML file');
  }
  const baseTag = parse(`<base href="${baseUri}" />`);
  head.prepend(baseTag);
  fs.writeFileSync(indexHtmlPath, root.toString());
};

const basePaths = (() => {
  if (!!process.env.VERCEL) {
    return {
      appFrontendServerBasePath: '/storybook/app-frontend-server/',
      uiElementsBasePath: '/storybook/ui-elements/',
    };
  }
  // For GitHub Pages
  return {
    appFrontendServerBasePath: '/trastocker/storybook/app-frontend-server/',
    uiElementsBasePath: '/trastocker/storybook/ui-elements/',
  };
})();

const rootPath = `${process.cwd()}/../..`;

// Generate mock database and build Storybook for the app-frontend-server
await $`cd ${rootPath}/apps/app-frontend-server && pnpm run generate:mock-database && pnpm run storybook:build`;

// Copy the built Storybook to the app-frontend-server
await $`mkdir -p ${rootPath}/apps/app-preview-server/dist/storybook/app-frontend-server`;
await $`cp -r ${rootPath}/apps/app-frontend-server/storybook-static/* ${rootPath}/apps/app-preview-server/dist/storybook/app-frontend-server`;
storybookConfigBaseUri(`${rootPath}/apps/app-preview-server/dist/storybook/app-frontend-server/index.html`, basePaths.appFrontendServerBasePath);

// Generate mock database and build Storybook for the app-ui-elements
await $`cd ${rootPath}/libraries/ui-elements && pnpm run storybook:build`;

// copy the built UI elements to the app-ui-elements
await $`mkdir -p ${rootPath}/apps/app-preview-server/dist/storybook/ui-elements`;
await $`cp -r ${rootPath}/libraries/ui-elements/storybook-static/* ${rootPath}/apps/app-preview-server/dist/storybook/ui-elements`;
storybookConfigBaseUri(`${rootPath}/apps/app-preview-server/dist/storybook/ui-elements/index.html`, basePaths.uiElementsBasePath);
