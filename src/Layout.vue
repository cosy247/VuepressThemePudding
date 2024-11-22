<template>
  <PageOuter />
  <ListHome v-if="pathType === 'listHome'" />
  <MdView v-if="pathType === 'introduceHome'" />
  <Blog v-else-if="pathType === 'blog'" />
  <NotFound v-else-if="pathType === 'notFound'" />
</template>

<script setup>
import './styles/common.css';
import ListHome from './views/ListHome.vue';
import Blog from './views/Blog.vue';
import PageOuter from './components/PageOuter.vue';
import NotFound from './views/NotFound.vue';
import { computed } from 'vue';
import { useRoute } from '@vuepress/client';
import { pageConfig } from './utils/blogMate';
import MdView from './components/MdView.vue';

const { isNotFound } = defineProps(['isNotFound']);
const { path } = useRoute();

const pathType = computed(() => {
  if (path === '/') {
    if (pageConfig.homeType === 'introduce') {
      return 'introduceHome';
    } else {
      return 'listHome';
    }
  } else if (isNotFound) {
    return 'notFound';
  } else {
    return 'blog';
  }
});
</script>

<style scoped>
.Index {
  position: relative;
  height: 100vh;
  width: 100vw;
  border: var(--outer-width) solid #1a232c;
  box-sizing: border-box;
}

.Index::before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  outline: var(--outer-width) solid #1a232c;
  z-index: 600;
  pointer-events: none;
  border-radius: var(--outer-width);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

.router {
  position: relative;
  width: 100%;
  min-height: 100%;
  z-index: 1;
  padding-bottom: 100px;
}

.notFound {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.notFound-icon {
  font-size: 40vmin;
}

.notFound-text {
  font-size: 10vmin;
}
</style>
·
