/*
Navicat MySQL Data Transfer

Source Server         : 127
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : myoa

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2017-06-30 17:29:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `book`
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `bookName` char(255) NOT NULL,
  `parentId` bigint(20) DEFAULT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('book1', '1', '1');
INSERT INTO `book` VALUES ('book2', '1', '2');
INSERT INTO `book` VALUES ('book3', '1', '3');
INSERT INTO `book` VALUES ('book4', '2', '4');
INSERT INTO `book` VALUES ('book5', '2', '5');
INSERT INTO `book` VALUES ('book6', '1', '6');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userName` char(255) NOT NULL,
  `passwd` char(255) NOT NULL,
  `phone` char(255) DEFAULT NULL,
  `regTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `id` bigint(255) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('chen', '111111', '18112530040', '2017-06-27 18:39:59', '1');
INSERT INTO `user` VALUES ('chen', '111111', '18112530041', '2017-06-27 18:25:20', '2');
INSERT INTO `user` VALUES ('chen112', '123123', '18112530041', '2017-06-27 18:25:34', '3');
INSERT INTO `user` VALUES ('asdasd', '123123', '181125300436', '2017-06-27 18:40:02', '4');
