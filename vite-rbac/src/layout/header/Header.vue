<template>
    <div class="header-container">
        <Collapse></Collapse>
        <BreadCrumb></BreadCrumb>
    </div>
</template>

<script setup lang="ts">
import Collapse from './Collapse.vue';
import BreadCrumb from './BreadCrumb.vue';
</script>

<style scoped lang="scss">
.header-container {
    display: flex;
    align-items: center;
}
</style>