<template>
    <el-breadcrumb class="bread" separator="/">
        <el-breadcrumb-item v-for="item in tabs">{{ item.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import { useRoute, type RouteLocationMatched } from 'vue-router';

// 定义面包屑导航数据
const tabs: Ref<RouteLocationMatched> = ref([]);

const route = useRoute()

const getBreadCrumb = () => {
    let mached = route.matched.filter((item) => item.meta && item.meta.title)
    const first = mached[0]
    if (first.path !== '/dashboard') {
        mached = [{ path: '/dashboard', meta: { title: '首页' } } as any].concat(mached)
    }
    tabs.value = mached;
}

getBreadCrumb()

watch(
    () => route.path,
    () => getBreadCrumb()
)
</script>

<style scoped lang="scss">
.bread {
    margin-left: 20px;
}

:deep(.el-breadcrumb__inner) {
    color: #112D4E !important;
}

:deep(.el-breadcrumb__inner a) {
    color: #112D4E !important;
}
</style>