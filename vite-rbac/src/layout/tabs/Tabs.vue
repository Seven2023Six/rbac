<template>
    <el-tabs v-model="activeTab" type="card" class="demo-tabs" closable @tab-remove="removeTab" @tab-click="clickBtn">
        <el-tab-pane v-for="item in tabsList" :key="item.path" :name="item.path">
            <template #label>
                <el-icon class="icon">
                    <Lock v-if="item.title == '首页'"></Lock>
                    <Unlock v-else></Unlock>
                </el-icon>
                <span>{{ item.title }}</span>
            </template>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { tabStore } from '../../store/tabs/index';
import type { Tab } from '../../store/tabs/index';
import { useRoute, useRouter } from 'vue-router';
import type { TabsPaneContext } from 'element-plus';
import { Lock } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();

// 获取 Store
const store = tabStore()

// 选中的选项卡数据
const activeTab = ref('');

// 选项卡数据
const tabsList = computed(() => {
    return store.getTab;
})

// 选项卡点击事件
const clickBtn = (pane: TabsPaneContext) => {
    const { props } = pane
    // 跳转路由
    router.push({ path: props.name as string })
}

// 删除选项卡
const removeTab = (targetName: string) => {
    if (targetName === '/dashboard') return;
    const tabs = tabsList.value
    let activeName = activeTab.value
    if (activeName === targetName) {
        tabs.forEach((tab: Tab, index: number) => {
            if (tab.path === targetName) {
                const nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                    activeName = nextTab.path
                }
            }
        })
    }

    // 重新设置激活的选项卡
    activeTab.value = activeName;
    // 重新设置选项卡数据
    store.tabList = tabs.filter((tab) => tab.path !== targetName)
    // 跳转路由
    router.push({ path: activeName })
}

const addTab = () => {
    const { path, meta } = route;

    const tab: Tab = {
        path: path,
        title: meta.title as string
    }

    store.addTab(tab)
}

// 添加选项卡：监听当前路由
watch(
    () => route.path,
    () => {
        setActiveTab()
        // 添加选项卡数据
        addTab();
    }
)

// 设置激活选项卡
const setActiveTab = () => {
    activeTab.value = route.path;
}

onMounted(() => {
    setActiveTab()
    addTab()
})
</script>

<style scoped lang="scss">
:deep(.el-tabs__header) {
    margin: 0px;
}

:deep(.el-tabs__item) {
    height: 26px !important;
    line-height: 26px !important;
    text-align: center !important;
    border: 1px solid #DBE2EF !important;
    margin: 0px 3px !important;
    color: #112D4E;
    font-size: 12px !important;
    padding: 0xp 10px !important;
}

:deep(.el-tabs__nav) {
    border: none !important;
}

:deep(.is-active) {
    border-bottom: 1px solid transparent !important;
    border: 1px solid #3F72AF !important;
    background-color: #3F72AF !important;
    color: #F9F7F7 !important;
}

:deep(.el-tabs__item:hover) {
    color: #3F72AF !important;
}

:deep(.is-active:hover) {
    color: #F9F7F7 !important;
}

:deep(.e-tabs__nav-next) {
    line-height: 26px !important;
}

:deep(.el-tabs_nav-prev) {
    line-height: 26px !important;
}

:deep(.el-tabs__header) {
    border-bottom: none !important;
}

.icon {
    margin-right: 10px;
}
</style>