<template>
    <div class="logo">
        <img :src="MenuLogo" alt="项目Logo">
        <span v-if="show" class="logo-title">{{ title }}</span>
    </div>
</template>

<script setup lang="ts">
import MenuLogo from '@/assets/vue.svg';
import { menuStore } from '../../store/menu/index';
import { ref, watch } from 'vue';

const title = ref('通用权限系统')

// 获取 Store
const store = menuStore()

const show = ref(true)
watch(
    () => store.getCollapse,
    (collapsed: boolean) => {
        if (!collapsed) {
            setTimeout(() => {
                show.value = !collapsed;
            }, 300);
        } else {
            show.value = !collapsed;
        }
    }
)
</script>

<style scoped lang="scss">
.logo {
    display: flex;
    width: 100%;
    height: 60px;
    background-color: #112D4E;
    text-align: center;
    cursor: pointer;
    align-items: center;

    img {
        width: 36px;
        height: 36px;
        margin-right: 12px;
        margin-left: 20px;
    }

    .logo-title {
        color: #DBE2EF;
        font-weight: 800;
        line-height: 60px;
        font-size: 22px;
        font-family: FangSong;
    }
}
</style>