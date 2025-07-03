<template>
    <el-dialog :model-value="props.visible" :title="props.title" :width="props.width + 'px'" :before-close="onClose"
        append-to-body>

        <!-- 弹框内容展示 -->
        <div class="container" :style="{ height: props.height + 'px' }">
            <slot name="content"></slot>
        </div>

        <template #footer>
            <span class="dialog-footer">
                <el-button type="danger" @click="onClose">取消</el-button>
                <el-button type="primary" @click="onConfirm">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
// 定义参数类型
interface DialogProps {
    title?: string,
    visible: boolean,
    width?: number,
    height?: number
}
// 接收父组件传递的数据
const props = withDefaults(defineProps<DialogProps>(), {
    title: '标题',
    visible: false,
    width: 630,
    height: 280
})

const emit = defineEmits(["onClose", "onConfirm"])

const onClose = () => {
    emit('onClose');
}

const onConfirm = () => {
    emit('onConfirm');
}
</script>

<style lang="scss" scope>
.container {
    overflow-x: initial;
    overflow-y: auto;
}

.el-dialog {
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;

    .el-dialog__header {
        border-top-left-radius: 4px !important;
        border-top-right-radius: 4px !important;
        background-color: #3F72AF !important;

        padding: 0;
        height: 48px;

        .el-dialog__title {
            color: #fff;
            font-size: 24px;
            font-weight: 600;

            position: absolute;
            margin-top: 10px;
            margin-left: 12px;
        }
    }

    .el-dialog__headerbtn {
        margin-top: 16px;
        margin-right: 16px;

        .el-dialog__close {
            color: #fff;
        }
    }

    .el-dialog__body {
        padding: 10px;
    }

    .el-dialog__footer {
        border-top: 1px solid #e8eaec !important;
        padding: 10px;
    }
}
</style>