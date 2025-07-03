package com.yuan.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yuan.dto.RoleListParam;
import com.yuan.entity.SysRole;
import com.yuan.service.SysRoleService;
import com.yuan.dao.SysRoleMapper;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

/**
* @author yuan
* @description 针对表【sys_role】的数据库操作Service实现
* @createDate 2025-06-23 20:59:46
*/
@Service
public class SysRoleServiceImpl extends ServiceImpl<SysRoleMapper, SysRole>
    implements SysRoleService{

    @Override
    public IPage<SysRole> getListByPageAndName(RoleListParam roleListParam) {
        IPage<SysRole> page = new Page<>(roleListParam.getCurrentPage(), roleListParam.getPageSize());
        QueryWrapper<SysRole> wrapper = new QueryWrapper<>();

        if (roleListParam.getRoleName() != null && !roleListParam.getRoleName().isEmpty()) {
            wrapper.lambda().like(SysRole::getRoleName, roleListParam.getRoleName());
        }

        return this.page(page, wrapper);
    }
}




