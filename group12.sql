-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema group12_industrial
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema group12_industrial
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `group12_industrial` DEFAULT CHARACTER SET utf8 ;
USE `group12_industrial` ;

-- -----------------------------------------------------
-- Table `group12_industrial`.`data_uploads`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `group12_industrial`.`data_uploads` (
  `id` SMALLINT(6) NOT NULL AUTO_INCREMENT,
  `periodStart` VARCHAR(25) NOT NULL,
  `periodEnd` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `group12_industrial`.`retail_data`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `group12_industrial`.`retail_data` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `dateTime` VARCHAR(25) NOT NULL,
  `OutletRef` SMALLINT(5) UNSIGNED NOT NULL,
  `Customer` VARCHAR(15) NOT NULL,
  `TransactionType` VARCHAR(30) NOT NULL,
  `Spent` DECIMAL(4,2) NOT NULL,
  `Discount` DECIMAL(4,2) NOT NULL,
  `Total` DECIMAL(4,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `time_user_unique` (`dateTime` ASC, `Customer` ASC, `TransactionType` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 34
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
