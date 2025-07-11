import { $ } from 'zx';

const rootPath = '../..';

// Generate mock database and build Storybook for the app-frontend-server
await $`cd ${rootPath}/apps/app-frontend-server && pnpm run generate:mock-database && pnpm run storybook:build`;

// Copy the built Storybook to the app-preview-server
await $`cp -r ${rootPath}/apps/app-frontend-server/storybook-static/* ${rootPath}/apps/app-preview-server/dist/storybook/app-frontend-server`;

// copy the built UI elements to the app-preview-server
await $`cp -r ${rootPath}/libraries/ui-elements/storybook-static/* ${rootPath}/apps/app-preview-server/dist/storybook/ui-elements`;
