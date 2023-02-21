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

 Date: 21/02/2023 16:15:26
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
-- Table structure for security_question
-- ----------------------------
DROP TABLE IF EXISTS `security_question`;
CREATE TABLE `security_question`  (
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '帐户ID',
  `sq_id` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密保问题ID',
  `sq_title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密保问题',
  `sq_answer` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密保问题答案',
  PRIMARY KEY (`sq_id`) USING BTREE,
  INDEX `fky_sq_user`(`user_id`) USING BTREE,
  CONSTRAINT `fky_sq_user` FOREIGN KEY (`user_id`) REFERENCES `account` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

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
-- Table structure for todo_focus
-- ----------------------------
DROP TABLE IF EXISTS `todo_focus`;
CREATE TABLE `todo_focus`  (
  `todo_id` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '作为外键与todo表关联。',
  `focus_id` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务专注ID',
  `focus_time` int(1) NOT NULL COMMENT '任务专注时长，单位：秒',
  `create_time` datetime(0) NOT NULL COMMENT '任务专注记录的创建时间',
  PRIMARY KEY (`focus_id`) USING BTREE,
  INDEX `fky_focus_of_todo`(`todo_id`) USING BTREE,
  CONSTRAINT `fky_focus_of_todo` FOREIGN KEY (`todo_id`) REFERENCES `todo` (`todo_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

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
-- Table structure for todo_status
-- ----------------------------
DROP TABLE IF EXISTS `todo_status`;
CREATE TABLE `todo_status`  (
  `status_id` int(1) NOT NULL COMMENT '待办事项状态ID',
  `status_name` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '待办事项状态名称， 1正常，-1回收站，-2已放弃',
  PRIMARY KEY (`status_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

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

SET FOREIGN_KEY_CHECKS = 1;
