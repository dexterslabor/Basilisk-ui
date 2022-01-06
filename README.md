# Basilisk UI

Storybook based front-end for Basilisk parachain employing react-use hooks and Apollo Client for data layer.

## Develop

Use yarn to install dependencies

```
yarn install
```

Start Storybook component development environment.

```
yarn storybook
```

Storybook can be opened at [:6006](http://localhost:6006)

Run the app in the development mode locally.

_Requires to have [Basilisk API](https://github.com/galacticcouncil/Basilisk-api#readme) testnet running and
optionally its indexer and processor as well._

```
yarn start
```

Open [:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any lint errors in the console.

Start tests interactive mode

```
yarn test
```

## Deploy

GitHub Actions Workflow is configured for deployment of UI application and Storybooks
at the same time. Each branch `develop|feat|fix/**` deploys to appropriate folder in `app-builds-gh-pages` branch.
Branch folder contains 2 sub-folders: `app` and `storybook` for UI app and Storybook builds
accordingly.

App UI builds and Storybooks are hosted in GitHub Pages.

For access to the builds you can use these paths:

- **UI app** - `https://galacticcouncil.github.io/basilisk-ui/<folder_name>/<subfolder_name?>/app`
- **Storybook build** - `https://galacticcouncil.github.io/basilisk-ui/<folder_name>/<subfolder_name?>/storybook`

Deployment triggers:

```yaml
push:
  branches:
    - develop
    - 'fix/**'
    - 'feat/**'
pull_request:
  branches:
    - 'fix/**'
    - 'feat/**'
```

To build optimized production artifacts locally you can run

```
yarn build
```

## Code style

To ensure consistent code across our codebase, we're using both Prettier and ESLint.
You can either use `yarn lint / yarn lint --fix` or `yarn prettier / yarn prettier --write`,
or make use of the built-in pre-commit prettier & linting for staged files.

## UI Architecture

This section outlines the approaches followed while implementing this UI as a React app, including the distinction
between different application layers.

### Presentational layer

The presenational layer is used to present and transform the normalized data provided by the *composition layer*. It begins on the *dumb* component level,
which are fed data via containers through props. Dumb components should be developed in isolation via *storybook* to fit the visual/layout/structural design requirements. Dumb components should only hold local state specific to their own presentational logic (e.g. `isModalOpen`), and should communicate with their respective parent components via props and handlers (e.g. `onClick / handleOnClick`).


Example:

```tsx
// reuse generated models from the data layer
import { Account } from './generated/graphql'

// data to be presented passed via props
export interface WalletProps {
  activeAccount?: Account  
}

export const Wallet = ({ account }: WalletProps) => {
  return <div>
    <p>{account?.name}</p>
  </div>
}
```

### Composition layer

The composition layer brings together the *presentational layer* and the *data layer*. Instead of dumb components, *smart containers* should be utilized to orchestrate fetching of the data required for presentational layer. The aforementioned containers should not contain any direct data fetching themselves, but instead they should utilize simple-to-complex GraphQL queries. This ensures a clear separation of concerns, and allows for a transparent data flow and debugging.

One of the major roles of the composition layer is to determine when data should be initially fetched (or subsequently refetched). Since our data layer is powered by the [Apollo client](https://www.apollographql.com), fetching any data means just dispatching a query to the client itself. If data isn't present in the data layer's normalized cache, sending a query will trigger actual fetching of the data - e.g. from a remote source (depending on the underlying data layer implementation). 

There are three major approaches to data composition within our UI:

1. `useQuery` - this will imidiatelly request data via the data layer's resolvers
2. `useLazyQuery` - this will return a callback, that can be timed or manually executed to request the data at a later time (e.g. after a timeout or on user interaction)
3. `constate` - both query types can be contextualized to avoid concurency issues in a case where multiple containers use the same queries at the same times (at time of rendering)



Example:

```tsx
import { Wallet as WalletComponent } from './components/Wallet'
import { Query } from './generated/graphql'

export interface GetActiveAccountQueryResponse {
  // you have to be extra careful when composing the generated types, this issue leaks to the data layer itself in terms of the data returned from a query
  activeAccount: Query['activeAccount']
}

// query
export const GET_ACTIVE_ACCOUNT = gql`
  query GetActiveAccount {
    activeAccount {
      name,
      id,
      balances
    }
  }
`;
export const useGetActiveAccountQuery = () => useQuery<GetActiveAccountQueryResponse>(GET_ACTIVE_ACCOUNT);

// container
export const Wallet = () => {
  // request data from the data layer
  const { data: { activeAccount } } = useGetActiveAccountQuery(); 
  // render the component with the provided data
  return <WalletComponent activeAccount={activeAccount} />
}
```

### Data layer

TBD

## E2E testing

### Build Polkadot extension

1. Clone polkadot-dapp [repo](https://github.com/polkadot-js/extension) to `./polkadot-dapp` folder
2. `cd extension`
3. `yarn`
4. `yarn build`
5. Unzip newly built archive `master-build` to the same folder as archive's root. All necessary
   extension files are located in `master-build` folder which can be used as dapp src root.

### E2E Testing requirements

GH Actions musk have configured next Repo secrets:
```yaml
E2E_TEST_ACCOUNT_NAME_ALICE
E2E_TEST_ACCOUNT_PASSWORD_ALICE
E2E_TEST_ACCOUNT_SEED_ALICE
```
For local running e2e tests root project's folder must contain `.env.test.e2e.local` config file with the same 
variable definitions as `.env.test.e2e.ci` but with replaced `__VAR_NAMER__` placeholders to real values (these placeholders are replacing to 
repo secrets during GH Actions workflow). 

For running e2e test locally you should:
1) Build UI project
2) Run testnet
3) Run built UI project in local server `http://127.0.0.1:3000`
4) Run tests with `yarn test:e2e-local`



### Github Actions workflows

`E2E and Unit Testing Flow` (`.github/workflows/e2e-and-unit-tisting-flow.yml`) workflow generates testing reports and 
screenshots traces which are available as artifacts in this workflow.

Possible artifacts:
- `ui-app-e2e-results.html`
- `ui-app-unit-tests-results.html`
- `traces` (contains bunches of screenshots for each test separately)

`Add artifact links to pull request` (`.github/workflows/publish-testing-artifacts-to-pr-comment.yml`) workflow runs 
after each `E2E and Unit Testing Flow` ([workflow_run](https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows#workflow_run)) 
and publishes names and links of available artifacts after tests as comment in related PR, which has triggered
`E2E and Unit Testing Flow` workflow. 
`Add artifact links to pull request` workflow must be published in **default branch** of the repo (currently it's `develop`). 
Workflow config from default branch will be used for all actions 
( [... will only trigger a workflow run if the workflow file is on the default branch.v](https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows#workflow_run) ).




### VSCode extensions

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## FAQ

### Why my build fails on `error:03000086:digital envelope routines::initialization error` ?

You have to use legacy openssl provider in node 17+. Set this to node options

```
export NODE_OPTIONS=--openssl-legacy-provider
```
