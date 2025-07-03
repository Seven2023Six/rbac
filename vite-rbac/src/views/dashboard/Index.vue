<template>
    <div>
        <el-button type="primary" size="default" @click="addBtn">新增</el-button>
        <SysDialog :title="dialog.title" :visible="dialog.visible" :width="dialog.width" :height="dialog.height"
            @on-close="onClose" @on-confirm="onConfirm">
            <template v-slot:content>
                <div>张三</div>
            </template>
        </SysDialog>
    </div>
</template>

<script setup lang="ts">
import useDialog from '../../hooks/useDialog';
import SysDialog from '../../components/SysDialog.vue';

const { dialog, onClose, onConfirm, onShow } = useDialog();

const addBtn = () => {
    dialog.title = '新增';
    onShow();
}
</script>

<style scoped></style>