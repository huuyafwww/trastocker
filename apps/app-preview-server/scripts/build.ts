import { $ } from 'zx';

const rootPath = `${process.cwd()}/../..`;

// Generate mock database and build Storybook for the app-frontend-server
await $`cd ${rootPath}/apps/app-frontend-server && pnpm run generate:mock-database && pnpm run storybook:build`;

// Copy the built Storybook to the app-frontend-server
await $`mkdir -p ${rootPath}/apps/app-preview-server/dist/storybook/app-frontend-server`;
await $`cp -r ${rootPath}/apps/app-frontend-server/storybook-static/* ${rootPath}/apps/app-preview-server/dist/storybook/app-frontend-server`;

// Generate mock database and build Storybook for the app-ui-elements
await $`cd ${rootPath}/apps/app-preview-server && pnpm run storybook:build`;

// copy the built UI elements to the app-ui-elements
await $`mkdir -p ${rootPath}/apps/app-preview-server/dist/storybook/ui-elements`;
await $`cp -r ${rootPath}/libraries/ui-elements/storybook-static/* ${rootPath}/apps/app-preview-server/dist/storybook/ui-elements`;
