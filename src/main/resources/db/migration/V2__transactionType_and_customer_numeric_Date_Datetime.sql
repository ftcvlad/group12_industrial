ALTER TABLE `group12_industrial`.`retail_data` 
CHANGE COLUMN `Customer` `Customer` SMALLINT UNSIGNED NOT NULL ,
CHANGE COLUMN `TransactionType` `TransactionType` TINYINT UNSIGNED NOT NULL,
CHANGE COLUMN `dateTime` `dateTime` DATETIME NOT NULL;

ALTER TABLE `group12_industrial`.`data_uploads` 
CHANGE COLUMN `periodStart` `periodStart` DATETIME NOT NULL ,
CHANGE COLUMN `periodEnd` `periodEnd` DATETIME NOT NULL ;
