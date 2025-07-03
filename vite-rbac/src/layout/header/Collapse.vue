<template>
    <el-icon @click="setCollapse" color="#112D4E" size="30" style="cursor: pointer;">
        <component :is="status ? Fold : Expand"></component>
    </el-icon>
</template>

<script setup lang="ts">
import { menuStore } from '../../store/menu/index'
import { Fold, Expand } from "@element-plus/icons-vue"
import { computed } from 'vue';

// 获取 Store
const store = menuStore()

// 获取状态
const status = computed(() => {
    return !store.getCollapse
})

// 切换图标样式
const setCollapse = () => {
    store.setCollapse(!store.getCollapse)
}
</script>

<style scoped></style>