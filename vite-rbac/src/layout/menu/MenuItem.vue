<template>
    <template v-for="menu in menuList" :key="menu.path">
        <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path">
            <template #title>
                <el-icon>
                    <!-- 动态组件方式生成图标 -->
                    <component :is="menu.meta.icon"></component>
                </el-icon>
                <span>{{ menu.meta.title }}</span>
            </template>
            <!-- 递归调用，自己调用自己 -->
            <menu-item :menuList="menu.children"></menu-item>
        </el-sub-menu>
        <el-menu-item style="color: #F9F7F7;" v-else :index="menu.path">
            <el-icon>
                <!-- 动态组件方式生成图标 -->
                <component :is="menu.meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ menu.meta.title }}</span>
            </template>
        </el-menu-item>
    </template>
</template>


<script setup lang="ts">
// 获取父组件传递的参数
defineProps(['menuList'])
</script>

<style scoped></style>