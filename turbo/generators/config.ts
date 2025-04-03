import type { PlopTypes } from '@turbo/gen';

const PACKAGE_TYPES = {
  app: 'apps',
  definition: 'definitions',
  helper: 'helpers',
};

type PackageType = keyof typeof PACKAGE_TYPES;

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setHelper('package', (type: PackageType) => PACKAGE_TYPES[type]);
  plop.setHelper('library', (type: PackageType, name: string) => ({
    app: `app-${name}-server`,
    definition: `${name}-definition`,
    helper: `${name}-helper`,
  }[type]));

  plop.setGenerator('package', {
    description: 'Create a new package',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'What type of package do you want to create?',
        choices: ['app', 'definition', 'helper'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is your package name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{package type}}/{{library type name}}/package.json',
        templateFile: 'templates/package.json.hbs',
      },
      {
        type: 'add',
        path: '{{package type}}/{{library type name}}/eslint.config.ts',
        templateFile: 'templates/eslint.config.ts',
      },
      {
        type: 'add',
        path: '{{package type}}/{{library type name}}/tsconfig.json',
        templateFile: 'templates/tsconfig.json',
      },
    ],
  });
}
