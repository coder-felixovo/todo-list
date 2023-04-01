/*
 Navicat Premium Data Transfer

 Source Server         : FelixDB
 Source Server Type    : MySQL
 Source Server Version : 50736
 Source Host           : localhost:3306
 Source Schema         : todo

 Target Server Type    : MySQL
 Target Server Version : 50736
 File Encoding         : 65001

 Date: 01/04/2023 10:19:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `userid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户ID，用户唯一标识',
  `username` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '密文密码',
  `password2` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '明文密码',
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户身份令牌',
  `status` int(1) NULL DEFAULT NULL COMMENT '账户状态，1：正常；-1：封禁；-2：注销中',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '账户创建日期',
  `nickname` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `contact` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '头像URL',
  PRIMARY KEY (`userid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('1b78666478d446108cbc10569a9445af', '123456', 'bXXM7iCjGjKN++jPvlf5nw==', 'abc123456', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIxYjc4NjY2NDc4ZDQ0NjEwOGNiYzEwNTY5YTk0NDVhZiIsImlhdCI6MTY3NTE0NDgwOH0.zo62VFf4hld4XTYqnR_TTsxMuEuOhlsgmcov-dD4-rg', 1, '2023-01-15 13:03:54', NULL, NULL, NULL, NULL);
INSERT INTO `account` VALUES ('97f529611d784ab2823d3dd07cc2238b', 'abc001', 'bXXM7iCjGjKN++jPvlf5nw==', 'abc123456', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI5N2Y1Mjk2MTFkNzg0YWIyODIzZDNkZDA3Y2MyMjM4YiIsImlhdCI6MTY3NjcxMDk0Nn0.z9yU50fHx2AxO-KHSiAn2JOwC1uRP-EU9xi7mpeDj38', 1, '2023-02-18 14:18:18', NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for todo
-- ----------------------------
DROP TABLE IF EXISTS `todo`;
CREATE TABLE `todo`  (
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户id',
  `todo_id` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '待办事项ID',
  `todo_title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '待办事项标题',
  `todo_checked` int(1) NOT NULL COMMENT '待办事项是否完成：0未完成、1已完成',
  `todo_status` int(1) NOT NULL COMMENT '待办事项状态：1正常、-1回收站、-2已放弃',
  `todo_deadline` datetime(0) NULL DEFAULT NULL COMMENT '待办事项截止时间',
  `todo_group_id` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分组ID',
  `todo_matrix_id` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '四象限ID，也表示优先级',
  `todo_tag_id` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签ID',
  `create_time` datetime(0) NOT NULL COMMENT '待办事项创建时间',
  `finish_time` datetime(0) NULL DEFAULT NULL COMMENT '待办事项完成时间',
  `todo_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '待办事项详情内容',
  PRIMARY KEY (`todo_id`) USING BTREE,
  INDEX `fky_todo_of_user`(`user_id`) USING BTREE,
  INDEX `fky_todo_of_status`(`todo_status`) USING BTREE,
  CONSTRAINT `fky_todo_of_status` FOREIGN KEY (`todo_status`) REFERENCES `todo_status` (`status_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fky_todo_of_user` FOREIGN KEY (`user_id`) REFERENCES `account` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of todo
-- ----------------------------
INSERT INTO `todo` VALUES ('97f529611d784ab2823d3dd07cc2238b', '154bd71c21e144f', 'b2', 1, 1, '2023-02-18 21:58:58', '', 'a498e4e60d9d41d', '', '2023-02-18 21:58:58', '2023-02-17 21:58:58', NULL);
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', '1f088a13218d44b', 'checked2', 1, 1, '2023-03-27 15:16:16', '79c0c8c405644b7', NULL, NULL, '2023-03-28 15:16:16', '2023-03-28 15:16:16', NULL);
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', '21f7186b3cb6411', 'eee', 1, 1, NULL, NULL, '2001f49b136f42b', NULL, '2023-03-28 15:19:19', '2023-03-28 19:18:18', NULL);
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', '2d9fb8eb69b9413', '整理JavaScript Object笔记', 1, 1, '2023-03-25 15:14:14', 'fe50006f34aa4c2', NULL, '94ed4abfe5d0476', '2023-03-28 15:14:14', '2023-03-28 15:20:07', NULL);
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', '2ddbbbec3a5247d', 'aaa', 1, 1, '2023-03-28 15:18:18', 'fe50006f34aa4c2', '6354b1e6b2fd4c2', 'c029d0609c01451', '2023-03-28 15:19:01', '2023-03-28 15:20:06', NULL);
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', '2ee26a2aa2d346d', 'checked1', 1, 1, '2023-03-26 15:16:01', '95adae8e37fe492', NULL, NULL, '2023-03-28 15:16:16', '2023-03-28 15:16:16', NULL);
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', '4c5e5ca472924ce', 'abcde', 1, 1, NULL, NULL, NULL, '88755ec96c5a410', '2023-03-28 15:22:03', '2023-03-28 15:22:22', NULL);
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', '5d24cfed5ce14cd', '整理房间杂物', 0, 1, '2023-03-28 15:50:50', '95adae8e37fe492', NULL, NULL, '2023-03-27 16:32:32', NULL, NULL);
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', '61e0f09c209440b', '录制答辩视频', 1, 1, '2023-03-28 20:10:10', 'fe50006f34aa4c2', '6354b1e6b2fd4c2', NULL, '2023-03-28 20:12:12', '2023-03-28 20:12:12', NULL);
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', '6bd395633df9473', '测试一', 0, 1, '2023-03-28 15:12:12', '95adae8e37fe492', NULL, NULL, '2023-03-28 15:12:12', NULL, NULL);
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', '8ba42bb03c244dd', '录制答辩视频', 0, 1, '2023-03-28 20:10:10', 'fe50006f34aa4c2', NULL, NULL, '2023-03-28 20:10:10', NULL, '<p>录制PPT讲述</p><p>录制项目演示</p>');
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', 'a21db1834b4b40f', '测试三', 0, 1, '2023-03-27 15:13:13', '95adae8e37fe492', NULL, NULL, '2023-03-28 15:13:13', NULL, NULL);
INSERT INTO `todo` VALUES ('97f529611d784ab2823d3dd07cc2238b', 'ab8542b71d8b425', 'a1', 1, 1, '2023-02-18 21:50:05', '', '765ea982c16245a', '', '2023-02-18 21:50:07', '2023-02-18 22:00:00', NULL);
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', 'af37d18472a1404', 'bbb', 1, 1, '2023-03-29 00:00:00', 'fe50006f34aa4c2', '5420aa5115e9463', '94ed4abfe5d0476', '2023-03-28 15:19:19', '2023-03-26 15:20:09', NULL);
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', 'b792e51b1d6a4d1', '测试二', 1, 1, '2023-03-29 15:13:03', '95adae8e37fe492', NULL, NULL, '2023-03-28 15:13:13', '2023-03-28 20:12:12', NULL);
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', 'c3ca5e6e32904c3', 'ccc', 1, 1, '2023-04-07 00:00:00', '95adae8e37fe492', '6354b1e6b2fd4c2', 'c029d0609c01451', '2023-03-28 15:19:19', '2023-03-26 15:20:20', NULL);
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', 'e7fe620cc481468', '整理Java多线程笔记', 1, 1, '2023-03-26 15:14:14', 'fe50006f34aa4c2', NULL, 'c029d0609c01451', '2023-03-28 15:14:14', '2023-03-27 15:20:05', NULL);
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', 'e87c4d73f3544e2', '购买到广州的火车票', 1, 1, '2023-03-06 20:27:27', '95adae8e37fe492', NULL, NULL, '2023-03-27 20:27:27', '2023-03-27 20:29:29', NULL);
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', 'eb51fc6a20a6489', 'ddd', 1, 1, NULL, NULL, '28d3eb766eac4d5', '88755ec96c5a410', '2023-03-28 15:19:19', '2023-03-28 15:21:21', NULL);
INSERT INTO `todo` VALUES ('1b78666478d446108cbc10569a9445af', 'ffadc081cd7f49c', 'checked3', 1, 1, '2023-03-27 15:16:16', '79c0c8c405644b7', NULL, NULL, '2023-03-28 15:16:16', '2023-03-28 15:16:16', NULL);

-- ----------------------------
-- Table structure for todo_focus
-- ----------------------------
DROP TABLE IF EXISTS `todo_focus`;
CREATE TABLE `todo_focus`  (
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '作为外键与account表关联',
  `focus_id` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `todo_id` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '作为外键与todo表关联',
  `focus_time` int(1) NOT NULL COMMENT '专注时长，单位：秒',
  `create_time` datetime(0) NOT NULL COMMENT '创建时间',
  `start_time` datetime(0) NOT NULL COMMENT '实际开始时间',
  `end_time` datetime(0) NOT NULL COMMENT '实际结束时间',
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '笔记',
  PRIMARY KEY (`focus_id`) USING BTREE,
  INDEX `fky_focus_of_todo`(`todo_id`) USING BTREE,
  INDEX `fky_focus_of_user`(`user_id`) USING BTREE,
  CONSTRAINT `fky_focus_of_user` FOREIGN KEY (`user_id`) REFERENCES `account` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of todo_focus
-- ----------------------------
INSERT INTO `todo_focus` VALUES ('1b78666478d446108cbc10569a9445af', '03150d1d9741432', 'b792e51b1d6a4d1', 300, '2023-03-25 15:28:06', '2023-03-25 15:02:00', '2023-03-25 15:08:00', 'testtest');
INSERT INTO `todo_focus` VALUES ('1b78666478d446108cbc10569a9445af', '195c8bd13e9540a', '6bd395633df9473', 5, '2023-03-28 15:17:17', '2023-03-28 15:17:17', '2023-03-28 15:17:17', NULL);
INSERT INTO `todo_focus` VALUES ('1b78666478d446108cbc10569a9445af', '346b0d5bb3324fe', '5d24cfed5ce14cd', 600, '2023-03-26 15:23:23', '2023-03-26 10:10:00', '2023-03-26 10:20:00', 'aaaa');
INSERT INTO `todo_focus` VALUES ('1b78666478d446108cbc10569a9445af', '8009656a737d4fc', '5d24cfed5ce14cd', 5, '2023-03-28 20:13:04', '2023-03-28 20:12:12', '2023-03-28 20:13:04', NULL);

-- ----------------------------
-- Table structure for todo_group
-- ----------------------------
DROP TABLE IF EXISTS `todo_group`;
CREATE TABLE `todo_group`  (
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户账户id',
  `group_id` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分组id',
  `group_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '名称',
  `group_icon` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图标',
  `create_time` datetime(0) NOT NULL COMMENT '创建日期',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新日期',
  PRIMARY KEY (`group_id`) USING BTREE,
  INDEX `fky_group_user`(`user_id`) USING BTREE,
  CONSTRAINT `fky_group_user` FOREIGN KEY (`user_id`) REFERENCES `account` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of todo_group
-- ----------------------------
INSERT INTO `todo_group` VALUES ('1b78666478d446108cbc10569a9445af', '79c0c8c405644b7', '工作', 'el-icon-star-on', '2023-03-27 17:56:00', NULL);
INSERT INTO `todo_group` VALUES ('1b78666478d446108cbc10569a9445af', '7dd631801076430', '分组', 'el-icon-star-on', '2023-03-28 15:48:48', NULL);
INSERT INTO `todo_group` VALUES ('1b78666478d446108cbc10569a9445af', '95adae8e37fe492', '日常', 'el-icon-star-on', '2023-02-16 14:02:20', NULL);
INSERT INTO `todo_group` VALUES ('1b78666478d446108cbc10569a9445af', 'fe50006f34aa4c2', '学习', 'el-icon-star-on', '2023-03-26 10:51:51', NULL);

-- ----------------------------
-- Table structure for todo_matrix
-- ----------------------------
DROP TABLE IF EXISTS `todo_matrix`;
CREATE TABLE `todo_matrix`  (
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户ID',
  `matrix_id` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '四象限ID',
  `matrix_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '四象限名称',
  `matrix_priority` int(1) NOT NULL COMMENT '四象限优先级',
  `create_time` datetime(0) NOT NULL COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`matrix_id`) USING BTREE,
  INDEX `fky_matrix_user`(`user_id`) USING BTREE,
  CONSTRAINT `fky_matrix_user` FOREIGN KEY (`user_id`) REFERENCES `account` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of todo_matrix
-- ----------------------------
INSERT INTO `todo_matrix` VALUES ('1b78666478d446108cbc10569a9445af', '2001f49b136f42b', '不重要不紧急', 4, '2023-02-17 16:39:03', NULL);
INSERT INTO `todo_matrix` VALUES ('1b78666478d446108cbc10569a9445af', '28d3eb766eac4d5', '不重要但紧急', 3, '2023-02-17 16:39:06', NULL);
INSERT INTO `todo_matrix` VALUES ('1b78666478d446108cbc10569a9445af', '5420aa5115e9463', '重要不紧急', 2, '2023-02-17 16:39:09', NULL);
INSERT INTO `todo_matrix` VALUES ('1b78666478d446108cbc10569a9445af', '6354b1e6b2fd4c2', '重要且紧急', 1, '2023-02-17 16:39:12', NULL);
INSERT INTO `todo_matrix` VALUES ('97f529611d784ab2823d3dd07cc2238b', '765ea982c16245a', '重要且紧急', 1, '2023-02-18 14:18:18', NULL);
INSERT INTO `todo_matrix` VALUES ('97f529611d784ab2823d3dd07cc2238b', '97a62394ca74493', '不重要但紧急', 3, '2023-02-18 14:18:18', NULL);
INSERT INTO `todo_matrix` VALUES ('97f529611d784ab2823d3dd07cc2238b', 'a498e4e60d9d41d', '重要不紧急', 2, '2023-02-18 14:18:18', NULL);
INSERT INTO `todo_matrix` VALUES ('97f529611d784ab2823d3dd07cc2238b', 'f86ff85e2a6047e', '不重要不紧急', 4, '2023-02-18 14:18:18', NULL);

-- ----------------------------
-- Table structure for todo_status
-- ----------------------------
DROP TABLE IF EXISTS `todo_status`;
CREATE TABLE `todo_status`  (
  `status_id` int(1) NOT NULL COMMENT '待办事项状态ID',
  `status_name` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '待办事项状态名称， 1正常，-1回收站，-2已放弃',
  PRIMARY KEY (`status_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of todo_status
-- ----------------------------
INSERT INTO `todo_status` VALUES (-2, '已放弃');
INSERT INTO `todo_status` VALUES (-1, '回收站');
INSERT INTO `todo_status` VALUES (1, '正常');

-- ----------------------------
-- Table structure for todo_tag
-- ----------------------------
DROP TABLE IF EXISTS `todo_tag`;
CREATE TABLE `todo_tag`  (
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户账户id，作为外键，与account表关联。',
  `tag_id` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '待办事项标签ID，作为主键。',
  `tag_name` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标签名',
  `tag_icon` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签图标表示的类名',
  `create_time` datetime(0) NOT NULL COMMENT '标签创建日期',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '标签修改日期',
  PRIMARY KEY (`tag_id`) USING BTREE,
  INDEX `fky_tag_user`(`user_id`) USING BTREE,
  CONSTRAINT `fky_tag_user` FOREIGN KEY (`user_id`) REFERENCES `account` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of todo_tag
-- ----------------------------
INSERT INTO `todo_tag` VALUES ('1b78666478d446108cbc10569a9445af', '88755ec96c5a410', '其它', NULL, '2023-03-28 15:21:03', NULL);
INSERT INTO `todo_tag` VALUES ('1b78666478d446108cbc10569a9445af', '94ed4abfe5d0476', 'JavaScript', NULL, '2023-03-16 18:17:17', NULL);
INSERT INTO `todo_tag` VALUES ('1b78666478d446108cbc10569a9445af', 'c029d0609c01451', 'Java', NULL, '2023-03-16 18:13:09', NULL);

SET FOREIGN_KEY_CHECKS = 1;
