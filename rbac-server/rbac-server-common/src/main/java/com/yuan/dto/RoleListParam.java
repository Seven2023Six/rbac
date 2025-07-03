package com.yuan.dto;

import lombok.Data;

@Data
public class RoleListParam {
    private Long currentPage;
    private Long pageSize;
    private String roleName;
}