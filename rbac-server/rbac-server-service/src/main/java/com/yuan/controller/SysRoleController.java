package com.yuan.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.yuan.dto.RoleListParam;
import com.yuan.entity.SysRole;
import com.yuan.service.SysRoleService;
import com.yuan.util.R;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/role")
public class SysRoleController {
    @Resource
    private SysRoleService sysRoleService;

    @GetMapping("getList")
    public R getList(RoleListParam roleListParam) {
        IPage<SysRole> pageList = sysRoleService.getListByPageAndName(roleListParam);

        return R.success(pageList);
    }

    @PostMapping
    public R add(@RequestBody SysRole sysRole) {
        if (sysRoleService.save(sysRole)) {
            return R.success("添加成功!");
        }

        return R.error("添加失败!");
    }

    @PutMapping
    public R update(@RequestBody SysRole sysRole) {
        if (sysRoleService.updateById(sysRole)) {
            return R.success("修改成功!");
        }

        return R.error("修改失败!");
    }

    @DeleteMapping("/{roleId}")
    public R delete(@PathVariable Long roleId) {
        if (sysRoleService.removeById(roleId)) {
            return R.success("删除成功!");
        }

        return R.error("删除失败!");
    }
}