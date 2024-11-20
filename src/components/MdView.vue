<template>
    <div class="mdView">
        <Content :path="path" class="mdContent" />
    </div>
</template>

<script setup>
import '../styles/md.css';

const { path } = defineProps(['path']);
</script>

<style scoped>
.MdView {
    position: relative;
}
</style>
