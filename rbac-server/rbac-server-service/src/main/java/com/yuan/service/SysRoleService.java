package com.yuan.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.yuan.dto.RoleListParam;
import com.yuan.entity.SysRole;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
* @author yuan
* @description 针对表【sys_role】的数据库操作Service
* @createDate 2025-06-23 20:59:46
*/
public interface SysRoleService extends IService<SysRole> {
    public IPage<SysRole> getListByPageAndName(RoleListParam roleListParam);
}
