/*
Navicat MySQL Data Transfer

Source Server         : 127
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : myoa

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2017-07-14 18:34:13
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
-- Table structure for `library`
-- ----------------------------
DROP TABLE IF EXISTS `library`;
CREATE TABLE `library` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libraryName` char(255) DEFAULT NULL,
  `libraryToken` char(255) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `timestamp` int(11) DEFAULT NULL,
  `libraryMarks` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of library
-- ----------------------------
INSERT INTO `library` VALUES ('21', '陈东梅123414', '220f52cece8d505996a67062cb8f14ab', '0', '1500001778', '121');
INSERT INTO `library` VALUES ('24', '宝宝', 'a6017be7f18eb2b50d6726cdc0c1b4ad', '0', '1500025287', 'undefined');
INSERT INTO `library` VALUES ('23', '陈东梅123414', '2bcae4f4426354b155fa21e128e0da06', '0', '1500003275', '121');
INSERT INTO `library` VALUES ('22', '景甜', 'd96e490d2b5dd0f2f45223e313a0929f', '0', '1500002800', '大甜甜wer');

-- ----------------------------
-- Table structure for `picture`
-- ----------------------------
DROP TABLE IF EXISTS `picture`;
CREATE TABLE `picture` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pictureUrl` char(255) DEFAULT NULL,
  `snapshotUrl` char(255) DEFAULT NULL,
  `timestamp` int(11) DEFAULT NULL,
  `libraryId` int(11) DEFAULT NULL,
  `attributes` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of picture
-- ----------------------------

-- ----------------------------
-- Table structure for `picture_cache`
-- ----------------------------
DROP TABLE IF EXISTS `picture_cache`;
CREATE TABLE `picture_cache` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pictureUrl` char(255) DEFAULT NULL,
  `snapshotUrl` char(255) DEFAULT NULL,
  `timestamp` int(11) DEFAULT NULL,
  `libraryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of picture_cache
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(255) NOT NULL AUTO_INCREMENT,
  `userName` char(255) NOT NULL,
  `passwd` char(255) NOT NULL,
  `phone` char(255) DEFAULT NULL,
  `regTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `groupId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'chen', '111111', '18112530040', '2017-06-27 18:39:59', '0');
INSERT INTO `user` VALUES ('2', 'chen', '111111', '18112530041', '2017-06-27 18:25:20', '0');
INSERT INTO `user` VALUES ('3', 'chen112', '123123', '18112530041', '2017-06-27 18:25:34', '0');
INSERT INTO `user` VALUES ('4', 'asdasd', '123123', '181125300436', '2017-06-27 18:40:02', '0');

-- ----------------------------
-- Table structure for `usergroup`
-- ----------------------------
DROP TABLE IF EXISTS `usergroup`;
CREATE TABLE `usergroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupName` char(255) NOT NULL,
  `groupDescription` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of usergroup
-- ----------------------------
INSERT INTO `usergroup` VALUES ('1', '开发', '开发组');
INSERT INTO `usergroup` VALUES ('2', '测试', '测试组');
INSERT INTO `usergroup` VALUES ('3', '前端', '前端组');
INSERT INTO `usergroup` VALUES ('4', 'UI', 'UI组');
