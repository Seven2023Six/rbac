import { defineStore } from 'pinia'

// 定义选项卡数据类型
export type Tab = {
    title: string;
    path: string; 
}

// 定义 state 的数据类型
export type TabState = {
    tabList: Tab[]
}

export const tabStore = defineStore('tabStore', {
    state: (): TabState => {
        return {
            tabList: []
        }
    },
    getters: {
        getTab(state) {
            return state.tabList
        }
    },
    actions: {
        // 添加选项卡
        addTab(tab:Tab) {
            // 判断数据是否存在
            if(this.tabList.some(item => item.path === tab.path)) {
                return;
            }
            if(tab.path == '/dashboard') {
                this.tabList.unshift(tab)
            } else {
                this.tabList.push(tab);
            }            
        }
    },
    persist: {
        enable: true,
        strategies: [
            { storage: localStorage, path: ['tabList'] }
        ]
    }
})