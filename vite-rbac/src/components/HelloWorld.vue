<template>
  <el-button type="primary" size="default" @click="addBtn">点击</el-button>
  <div>
    {{ count }}
  </div>
</template>

<script setup lang="ts">
import { testStore } from '@/store/test/index.ts';
import { computed } from 'vue';

// 获取 store
const store = testStore();

// count 展示到页面
const count = computed(() => {
  return store.getCount
});

// 点击按钮事件 改变 count
const addBtn = () => {
  // store.count++;
  store.setCount(++store.count);
  // store.$path({
  //   count: ++store.count,
  // });
};

</script>

<style scoped></style>