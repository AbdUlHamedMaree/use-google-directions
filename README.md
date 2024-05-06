# use-google-directions

<a href="https://github.com/AbdUlHamedMaree/use-google-directions/actions/workflows/release.yml">
  <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/AbdUlHamedMaree/use-google-directions/release.yml?logo=github">
</a>
<a href="https://www.npmjs.com/package/use-google-directions">
  <img alt="NPM Version" src="https://img.shields.io/npm/v/use-google-directions?logo=npm">
</a>
<a href="https://www.npmjs.com/package/use-google-directions">
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dw/use-google-directions?logo=npm">
</a>
<a href="https://www.npmjs.com/package/use-google-directions">
  <img alt="NPM License" src="https://img.shields.io/npm/l/use-google-directions">
</a>
<a href="https://jsr.io/@mrii/use-google-directions">
  <img alt="JSR Version" src="https://img.shields.io/jsr/v/%40mrii/use-google-directions?logo=jsr">
</a>
<a href="https://github.com/AbdUlHamedMaree/use-google-directions">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/AbdUlHamedMaree/use-google-directions">
</a>

Small library that provides hooks for google direction api

This package is using [`lbundle`](https://github.com/AbdUlHamedMaree/lbundle) as bundler ✨

## 🚀 Motivation

There is always this repeated pattern for creating a library while following best practices that you need to maintain across all of your libraries,
but then I thought maybe creating a library for bundling libraries is a good idea.

## 💾 install

This package requires the following packages `@tanstack/react-query>=5.0.0`, `axios>=1.0.0` and `react>=16.0.0`

### NPM registry

```bash
# npm
npm i -D use-google-directions

# yarn
yarn add -D use-google-directions

# pnpm
pnpm i -D use-google-directions

# bun
bun i -D use-google-directions
```

### JSR registry

```bash
# deno
deno add -D @mrii/use-google-directions

# jsr
npx jsr add -D @mrii/use-google-directions
```

## 🔧 Usage

```tsx
import { useGoogleMapsDirectionsQuery } from 'use-google-directions';

// or with jsr
// import { useGoogleMapsDirectionsQuery } from '@mrii/use-google-directions';

const Component: React.FC = () => {
  /* ... */
  const focusedTripDirectionsQuery = useGoogleMapsDirectionsQuery({
    origin: {
      latitude: 1,
      longitude: 1,
    },
    destination: {
      latitude: 3,
      longitude: 3,
    },
  });

  const response = focusedTripDirectionsQuery.data?.data;

  const points = useDirectionPolylinePoints({ response, precision: 'hight' });

  console.log('available_travel_modes', response.available_travel_modes);
};
```

## 🧰 API
