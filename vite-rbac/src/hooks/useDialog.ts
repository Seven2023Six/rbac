import { reactive } from 'vue';
import { type DialogModel } from '../type/BaseType';

export default function useDialog() {
    // 定义弹框属性
    const dialog = reactive<DialogModel>({
        title: '',
        visible: false,
        width: 630,
        height: 280
    })

    const onShow = () => {
        dialog.visible = true;
    }

    const onClose = () => {
        dialog.visible = false;
    }

    const onConfirm = () => {
        dialog.visible = false;
    }

    return {
        dialog,
        onShow,
        onClose,
        onConfirm
    }
}
