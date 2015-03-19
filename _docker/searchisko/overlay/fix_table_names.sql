use searchisko;

ALTER TABLE `searchisko`.`contributor` RENAME TO  `searchisko`.`contributor2` ;
ALTER TABLE `searchisko`.`contributor2` RENAME TO  `searchisko`.`Contributor` ;

ALTER TABLE `searchisko`.`config` RENAME TO  `searchisko`.`config2` ;
ALTER TABLE `searchisko`.`config2` RENAME TO  `searchisko`.`Config` ;

ALTER TABLE `searchisko`.`project` RENAME TO  `searchisko`.`project2` ;
ALTER TABLE `searchisko`.`project2` RENAME TO  `searchisko`.`Project` ;

ALTER TABLE `searchisko`.`provider` RENAME TO  `searchisko`.`provider2` ;
ALTER TABLE `searchisko`.`provider2` RENAME TO  `searchisko`.`Provider` ;

ALTER TABLE `searchisko`.`rating` RENAME TO  `searchisko`.`rating2` ;
ALTER TABLE `searchisko`.`rating2` RENAME TO  `searchisko`.`Rating` ;

ALTER TABLE `searchisko`.`taskstatusinfo` RENAME TO  `searchisko`.`taskstatusinfo2` ;
ALTER TABLE `searchisko`.`taskstatusinfo2` RENAME TO  `searchisko`.`TaskStatusInfo` ;
