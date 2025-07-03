<template>
    <el-main>
        <!-- 搜索栏 -->
        <el-form :model="searchPram" :inline="true" size="default">
            <el-form-item>
                <el-input placeholder="请输入关键字" v-model="searchPram.roleName"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button icon="Search" type="" @click="searchBtn">搜索</el-button>
                <el-button icon="Close" type="danger" plain @click="resetBtn">重置</el-button>
                <el-button icon="Plus" type="primary" @click="addBtn">新增</el-button>
            </el-form-item>
        </el-form>

        <el-table :height="tableHeight" :data="tableData" border stripe>
            <el-table-column prop="roleCode" label="角色代码" />
            <el-table-column prop="roleName" label="角色名称" />
            <el-table-column prop="description" label="描述" />
            <el-table-column label="操作" width="220" align="center">
                <template #default="scope">
                    <el-button type="primary" icon="Edit" size="default" @click="editBtn(scope.row)">编辑</el-button>
                    <el-button type="danger" icon="Delete" size="default"
                        @click="deleteBtn(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-pagination class="pagination" @size-change="sizeChange" @current-change="currentChange"
            :current-page.sync="searchPram.currentPage" :page-sizes="[10, 20, 40, 80, 100]"
            :page-size="searchPram.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="searchPram.total"
            background>
        </el-pagination>


        <!-- 新增/编辑 弹框 -->
        <SysDialog :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible"
            @on-close="onClose" @on-confirm="onCommit">
            <template v-slot:content>
                <el-form :model="addModel" ref="addRef" :rules="rules" label-width="80px" :inline="false"
                    size="default">
                    <el-form-item prop="roleName" label="角色名称">
                        <el-input v-model="addModel.roleName"></el-input>
                    </el-form-item>

                    <el-form-item prop="roleCode" label="角色Code">
                        <el-input v-model="addModel.roleCode"></el-input>
                    </el-form-item>

                    <el-form-item prop="description" label="描述">
                        <el-input v-model="addModel.description"></el-input>
                    </el-form-item>
                </el-form>
            </template>
        </SysDialog>
    </el-main>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue';
import SysDialog from '../../../components/SysDialog.vue';
import useDialog from '../../../hooks/useDialog';
import useInstance from '../../../hooks/useInstance.ts';
import { type FormInstance, ElMessage } from 'element-plus';
import { addApi, deleteApi, editApi, getListApi } from '../../../api/role/index.ts'
import type { SysRole } from '../../../api/role/RoleModel.ts';


const { global } = useInstance();

// 表单 ref 属性
const addRef = ref<FormInstance>();

// 弹框属性
const { dialog, onClose, onShow } = useDialog();

// 表单绑定对象
const searchPram = reactive({
    currentPage: 1,
    pageSize: 10,
    roleName: '',
    total: 0
})

const addModel = reactive({
    id: '',
    roleName: '',
    roleCode: '',
    description: '',
})

const tableHeight = ref(0)

const tableData = ref([]);

const tags = ref('');

// 新增按钮
const addBtn = () => {
    tags.value = '0';
    dialog.title = '新增角色';

    onShow();

    addModel.id = '';
    addRef.value?.resetFields();
}

// 查询列表
const getList = async () => {
    let res = await getListApi(searchPram);
    if (res && res.code == 200) {
        tableData.value = res.data.records;
        searchPram.total = res.data.total;
    }
}

// 搜索按钮
const searchBtn = () => {
    getList();
}

// 重置按钮
const resetBtn = () => {
    searchPram.roleName = '';
    searchPram.currentPage = 1;
    getList();
}

// 提交表单
const onCommit = () => {
    addRef.value?.validate(async (valid) => {
        // 表单验证是否通过
        if (valid) {
            let res = null;
            if (tags.value == '0') {
                res = await addApi(addModel);
            } else {
                res = await editApi(addModel);
            }

            if (res && res.code == 200) {
                ElMessage.success(res.msg);
                getList();
                onClose();
            }
        }
    })
}

// 表单验证规则
const rules = reactive({
    roleName: [
        {
            required: true,
            message: "请输入角色名称",
            trigger: "change"
        }
    ]
});

const editBtn = async (row: SysRole) => {
    tags.value = '1';

    dialog.visible = true;
    dialog.title = '编辑角色';

    nextTick(() => {
        Object.assign(addModel, row);
    })

    addModel.id = '';
    addRef.value?.resetFields();
}

const deleteBtn = async (roleId: string) => {
    const confirm = await global.$myconfirm('确定删除该数据吗？');

    if (confirm) {
        let res = await deleteApi(roleId);

        if (res && res.code == 200) {
            ElMessage.success(res.msg);
            getList();
        }
    }
}

const sizeChange = (size: number) => {
    searchPram.pageSize = size;
    getList();
}

const currentChange = (page: number) => {
    searchPram.currentPage = page;
    getList();
}

onMounted(() => {
    nextTick(() => {
        tableHeight.value = window.innerHeight - 250;
    });
    getList();
})
</script>

<style lang="scss" scoped>
.pagination {
    margin-top: 15px;
}
</style>