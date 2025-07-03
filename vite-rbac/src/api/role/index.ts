import http from "../../http";
import type { SysRole, RoleListParm } from "./RoleModel";

export const addApi = (param: SysRole) => {
    return http.post("/api/role", param);
}

export const getListApi = (param: RoleListParm) => {
    return http.get("/api/role/getList", param);
}

export const editApi = (param: SysRole) => {
    return http.put("/api/role", param);
}

export const deleteApi = (roleId: string) => {
    return http.delete(`/api/role/${roleId}`);
}