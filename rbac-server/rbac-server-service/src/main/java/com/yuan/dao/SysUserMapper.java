package com.yuan.dao;

import com.yuan.entity.SysUser;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
* @author yuan
* @description 针对表【sys_user】的数据库操作Mapper
* @createDate 2025-06-23 20:58:48
* @Entity com.yuan.entity.SysUser
*/
@Mapper
public interface SysUserMapper extends BaseMapper<SysUser> {

}




