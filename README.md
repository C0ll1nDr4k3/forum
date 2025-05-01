# forum

## Usage

To start the development server, run:

```
yarn dev
```

To build the project, run:

```
yarn build
```

## Installation

We use [Yarn](https://yarnpkg.com) as our package manager. You can install it by running:

```
npm install -g yarn
```

Moreover, it must be a newer version of Yarn.

```
yarn set version berry
```

For boilerplate, we use [shadcn-svelte](https://www.shadcn-svelte.com/). Make sure to run:

```
yarn dlx sv add tailwindcss
```

To install shadcn components, run:

```
yarn dlx shadcn-svelte@latest add <component>
```

For our icons, we use [Lucide](https://lucide.netlify.app). You can install it by running:

```
yarn add lucide
```

For our graph components, we use [SvelteFlow](https://svelteflow.dev/). You can install it by running:

```
yarn add @xyflow/svelte
```

For auth, we use [Auth.js](https://authjs.dev/). You can install it by running:

```
yarn add @auth/sveltekit
npx auth secret
```

For GCP Run, be sure to execute `poetry export --without-hashes --format=requirements.txt > requirements.txt` before running `gcloud run deploy --source src/gcp`

GCP redeploys automatically with GitHub, but in case of a dependency change run:

```
poetry export --without-hashes --format=requirements.txt > src/gcp/requirements.txt && gcloud run deploy --source src/gcp
```

This does require that you have the `gcloud` cli and that you're signed in.