# How to configure Jest in this project

This project uses **Jest 30** with **ts-jest** for TypeScript support and **ESM** (ES Modules).

## 1. Install packages

```bash
npm install --save-dev jest @types/jest ts-jest cross-env
```

- `jest` — test runner
- `@types/jest` — TypeScript type definitions for Jest
- `ts-jest` — TypeScript preprocessor for Jest
- `cross-env` — cross-platform environment variables (needed to pass `NODE_OPTIONS`)

## 2. Add the test script to `package.json`

In the `"scripts"` section, add:

```json
"test": "cross-env NODE_OPTIONS=--experimental-vm-modules jest --detectOpenHandles"
```

`--experimental-vm-modules` is required because the project uses ESM (e.g. the `typebox` dependency is ESM-only).

## 3. Create `jest.config.ts`

Create `jest.config.ts` in the project root:

```ts
export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    moduleNameMapper: {
        '\\.css$': '<rootDir>/src/__mocks__/styleMock.ts',
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    transformIgnorePatterns: [
        'node_modules/(?!(typebox)/)',
    ],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {useESM: true, tsconfig: 'tsconfig.test.json'}],
        '^.+\\.mjs$': ['ts-jest', {useESM: true}],
    },
};
```

Key options explained:

- **`preset`** — uses the ts-jest ESM preset
- **`moduleNameMapper`** — maps `.css` imports to a mock so tests don't fail on CSS modules
- **`extensionsToTreatAsEsm`** — tells Jest to treat `.ts` and `.tsx` files as ESM
- **`transformIgnorePatterns`** — allows Jest to transform ESM-only packages inside `node_modules` (e.g. `typebox`)
- **`transform`** — uses ts-jest with ESM mode and a separate tsconfig for tests

## 4. Create `tsconfig.test.json`

Create `tsconfig.test.json` in the project root. This relaxes strict rules that would cause noise in test files:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noUnusedParameters": false,
    "noUnusedLocals": false,
    "allowUnusedLabels": true,
    "outDir": "dist"
  }
}
```

## 5. Create the CSS mock

Create `src/__mocks__/styleMock.ts`:

```ts
export default {};
```

This prevents Jest from failing when a module imports a `.css` file (CSS modules are a webpack feature, not available in Node).

## 6. Write a test

Create a test file next to the source file with a `.test.ts` extension (e.g. `src/services/api/restdb.test.ts`).

Since the project runs in ESM mode, Jest globals (`jest`, `describe`, `it`, `expect`, etc.) are **not** available automatically. You must import them:

```ts
import {jest, describe, it, expect, beforeEach} from '@jest/globals';
```

## 7. Run the tests

```bash
npm test
```

## IDE configuration (JetBrains WebStorm / IntelliJ)

The IDE test runner does not read the `cross-env` wrapper from `package.json`, so you need to configure it manually:

1. Open **Run > Edit Configurations**
2. Select (or create) a **Jest** run configuration
3. In the **Node options** field, add: `--experimental-vm-modules`
4. Click **Apply**

Alternatively, set it in the **Environment variables** field:

```
NODE_OPTIONS=--experimental-vm-modules
```
