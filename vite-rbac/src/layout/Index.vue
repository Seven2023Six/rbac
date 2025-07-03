<template>
    <el-container class="container">
        <el-aside width="auto" class="left-menu">
            <MenuBar></MenuBar>
        </el-aside>
        <el-container>
            <el-header class="header">
                <Header></Header>
            </el-header>
            <el-main class="main">
                <div class="tabs">
                    <Tabs class="tabs-content"></Tabs>
                    <CloseTabs></CloseTabs>
                </div>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Header from '@/layout/header/Header.vue'
import MenuBar from '@/layout/menu/MenuBar.vue'
import Tabs from './tabs/Tabs.vue'
import CloseTabs from './tabs/CloseTabs.vue'
</script>

<style scoped>
.container {
    height: 100%;

    .left-menu {
        background-color: #3F72AF;
    }

    .header {
        background-color: #DBE2EF;
        display: flex;
        align-items: center;
    }
}

.main {
    padding: 0px;

    .tabs {
        display: flex;
        justify-content: space-between;
        flex-grow: 1px;
        padding: 3px;
        border-bottom: 1px solid #3F72AF;
        padding-right: 85px;

        .el-tabs {
            width: 100%;
            height: 33px;
        }

        .tabs-content {
            padding-top: 8px;
            padding-left: 10px;
            padding-right: 10px;
        }
    }
}
</style>