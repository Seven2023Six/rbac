// 角色数据类型
export type SysRole = {
    id: string,
    roleName: string,
    roleCode: string,
    description: string,
}

export type RoleListParm = {
    currentPage: number;
    pageSize: number;
    roleName: string;
    total: number;
}