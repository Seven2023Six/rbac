create database `rbac`;

use rbac;

# 用户表  部门 1 -N 用户 用户1-N角色
create table sys_user
(
    id         bigint unsigned primary key auto_increment comment '主键',
    username   varchar(20) not null comment '用户名',
    realname   varchar(20) not null comment '姓名',
    password   varchar(20) not null comment '密码',
    email      varchar(50) comment '邮箱',
    phone      varchar(20) comment '电话',
    dept_id    int comment '部门id',
    address    varchar(20) comment '地址',
    gmt_create datetime default current_timestamp,
    gmt_modify datetime default current_timestamp
);
#     用户角色 中间表
create table sys_user_role
(
    id         bigint unsigned primary key auto_increment comment '主键',
    user_id    bigint comment '用户id',
    role_id    bigint comment '角色id',
    gmt_create datetime default current_timestamp,
    gmt_modify datetime default current_timestamp
);
# 角色 表
create table sys_role
(
    id          bigint unsigned primary key auto_increment comment '主键',
    role_name   varchar(20) not null comment '角色名',
    role_code   varchar(20) not null comment '角色code',
    description varchar(20) comment '描述',
    gmt_create  datetime default current_timestamp,
    gmt_modify  datetime default current_timestamp
);
#     中间表
create table sys_role_permission
(
    id            bigint unsigned primary key auto_increment comment '主键',
    role_id       bigint comment '角色id',
    permission_id bigint comment '权限id',
    gmt_create    datetime default current_timestamp,
    gmt_modify    datetime default current_timestamp
);
# 权限 表
create table sys_permission
(
    id         bigint unsigned primary key auto_increment comment '主键',
    parent_id  bigint not null comment '父id',
    icon       varchar(20) comment '图标',
    title      varchar(20) comment '标题',
    url        varchar(20) comment '地址',
    level      int comment '排序',
    gmt_create datetime default current_timestamp,
    gmt_modify datetime default current_timestamp
);

-- 插入数据

-- 用户表(sys_user)
INSERT INTO `sys_user` (`username`, `realname`, `password`, `email`, `phone`, `dept_id`, `address`) VALUES 
('user1', '张三', 'pass1', 'zhangsan@example.com', '12345678901', 1, '北京市'),
('user2', '李四', 'pass2', 'lisi@example.com', '12345678902', 2, '上海市'),
('user3', '王五', 'pass3', 'wangwu@example.com', '12345678903', 3, '广州市'),
('user4', '赵六', 'pass4', 'zhaoliu@example.com', '12345678904', 4, '深圳市'),
('user5', '孙七', 'pass5', 'sunqi@example.com', '12345678905', 1, '杭州市'),
('user6', '周八', 'pass6', 'zhouba@example.com', '12345678906', 2, '南京市'),
('user7', '吴九', 'pass7', 'wujiu@example.com', '12345678907', 3, '武汉市'),
('user8', '郑十', 'pass8', 'zhengshi@example.com', '12345678908', 4, '成都市'),
('user9', '钱十一', 'pass9', 'qianshiyi@example.com', '12345678909', 1, '西安市'),
('user10', '刘十二', 'pass10', 'liushier@example.com', '12345678910', 2, '重庆市');

-- 用户角色中间表(sys_user_role)
INSERT INTO `sys_user_role` (`user_id`, `role_id`) VALUES 
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 1), (7, 2), (8, 3), (9, 4), (10, 5);

-- 角色表(sys_role)
INSERT INTO `sys_role` (`role_name`, `role_code`, `description`) VALUES 
('管理员', 'admin', '系统管理角色'),
('普通用户', 'user', '一般使用角色'),
('访客', 'guest', '临时访问角色'),
('审计员', 'auditor', '审计功能角色'),
('开发者', 'developer', '开发与调试角色');

-- 角色权限中间表(sys_role_permission)
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES 
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (1, 6), (2, 7), (3, 8), (4, 9), (5, 10);

-- 权限表(sys_permission)
INSERT INTO `sys_permission` (`parent_id`, `icon`, `title`, `url`, `level`) VALUES 
(0, 'icon-home', '首页', '/home', 1),
(0, 'icon-settings', '设置', '/settings', 2),
(0, 'icon-user', '用户管理', '/users', 3),
(0, 'icon-lock', '权限管理', '/permissions', 4),
(0, 'icon-bell', '通知中心', '/notifications', 5),
(0, 'icon-info', '关于', '/about', 6),
(0, 'icon-envelope', '消息', '/messages', 7),
(0, 'icon-calendar', '日历', '/calendar', 8),
(0, 'icon-book', '文档', '/docs', 9),
(0, 'icon-support', '支持', '/support', 10);