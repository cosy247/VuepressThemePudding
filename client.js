import { defineClientConfig } from '@vuepress/client';
import Layout from './src/Layout.vue';
import NotFound from './src/NotFound.vue';

export default defineClientConfig({
  layouts: {
    Layout,
    NotFound,
  },
  enhance: ({ app }) => {},
});
