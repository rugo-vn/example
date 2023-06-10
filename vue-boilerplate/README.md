# Vue Boilerplate

## Usage

**`.env`**

| Name     | Description           | Example                 |
| -------- | --------------------- | ----------------------- |
| API_BASE | Api base for Rugo Api | "http://localhost:8080" |

## Step by Step

**Step 1.** Init

```bash
npm init -y
npm i -S \
  vue@3.2.45 \
  pinia@2.0.28 \
  vue-router@4.1.6
npm i -D \
  @rugo-vn/open@1.1.0-beta.5 \
  @rugo-vn/vue@1.1.0-beta.4 \
  @vitejs/plugin-vue \
  @vueuse/core@10.1.2 \
  vite@4.3.9 \
  tailwindcss@3.3.2 \
  postcss@8.4.24 \
  autoprefixer@10.4.14
```

**Step 2.** `package.json`

```json
{
  "type": "module",
  "scripts": {
    "dev": "NODE_ENV=development rugo"
  }
}
```

**Step 3.** `rugo.config.js`

```js
export default {
  space: {
    id: '648485885816cbcba8a4cbdd',
    assets: [
      { name: 'statics', type: 'static', mount: '/' },
      { name: 'views', type: 'view', mount: '/' },
    ],
  },
};
```

**Step 4.** `vite.config.js`

```js
import vue from '@vitejs/plugin-vue';

export default {
  plugins: [vue()],
};
```

**Step 5.** `tailwind.config.js`

```js
import colors from 'tailwindcss/colors';

// delete unsupported colors
delete colors.lightBlue;
delete colors.warmGray;
delete colors.coolGray;
delete colors.blueGray;
delete colors.trueGray;

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/@rugo-vn/vue/src/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.{html}',
    './client/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: colors.cyan,
      secondary: colors.stone,
      danger: colors.rose,
      info: colors.indigo,
      warn: colors.amber,
      success: colors.emerald,
      ...colors,
    },
    fontFamily: {
      sans: ['PoppinsVN', 'sans-serif'],
      mono: ['"Fira Code"'],
    },
    extend: {},
    fontSize: {
      xs: '.75rem',
      sm: '.825rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
  },
  plugins: [],
};
```

**Step 6.** `client/style.css`

```css
@import '../node_modules/@rugo-vn/vue/src/style.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 7.** `client/App.vue`

```vue
<template>
  <h1>Vue Boilerplate</h1>
</template>
```

**Step 8.** `client/main.js`

```js
import { createApp } from 'vue';

import App from './App.vue';
import RugoVue from '@rugo-vn/vue';
import './style.css';

const app = createApp(App);
app.use(RugoVue);

app.mount('#app');
```

**Step 9.** `src/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="X-UA-Compatible"
      content="IE=edge"
    />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Vue Boilerplate</title>
  </head>
  <body>
    <div id="app"></div>
    <script
      src="../client/main.js"
      type="module"
    ></script>
  </body>
</html>
```

**Step 10.** Fonts

```bash
mkdir public && cp -r node_modules/@rugo-vn/vue/dist/assets public/assets
```

## License

MIT
