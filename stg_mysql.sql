ALTER TABLE `appeal`
ADD COLUMN  `email_id` varchar(255) DEFAULT NULL,
ADD COLUMN `status` varchar(100) DEFAULT NULL,
ADD COLUMN `status_date` datetime DEFAULT NULL,
ADD COLUMN  `status_remarks` varchar(300) DEFAULT NULL,
ADD COLUMN  `status_by` int(11) DEFAULT NULL,
ADD COLUMN  `raised_by` int(11) DEFAULT NULL;

ALTER TABLE `appeal`
MODIFY COLUMN `appeal_file_path` varchar(500) DEFAULT NULL;

ALTER TABLE `buildings`
ADD COLUMN `alternumber` varchar(100) DEFAULT NULL,
ADD COLUMN `simnumber` varchar(100) DEFAULT NULL,
ADD COLUMN `Ass_No` char(1) DEFAULT NULL AFTER FACR,
ADD COLUMN `rq_TP_BranchId` varchar(10) DEFAULT NULL,
ADD COLUMN `rq_TP_InternalDep` varchar(10) DEFAULT NULL,
ADD COLUMN `rq_TP_Language` varchar(10) DEFAULT NULL,
ADD COLUMN `rq_TP_Merchant` varchar(10) DEFAULT NULL,
ADD COLUMN `rq_TP_PayerName` varchar(10) DEFAULT NULL,
ADD COLUMN `rq_TP_RefNo` varchar(10) DEFAULT NULL,
ADD COLUMN `res_TP_Amount` varchar(10) DEFAULT NULL,
ADD COLUMN `res_TP_PayMethod` varchar(10) DEFAULT NULL,
ADD COLUMN `res_TP_ReceiptNo` varchar(30) DEFAULT NULL,
ADD COLUMN `res_TP_RefNo` varchar(10) DEFAULT NULL,
ADD COLUMN `res_TP_ResultCode` varchar(10) DEFAULT NULL,
ADD COLUMN `rq_TP_ReturnURL` varchar(255) DEFAULT NULL,
ADD COLUMN `rq_TP_ServiceInfo` varchar(255) DEFAULT NULL,
ADD COLUMN `res_TP_ExtraFees` varchar(255) DEFAULT NULL,
ADD COLUMN `res_TP_PaymentDate` varchar(255) DEFAULT NULL,
ADD COLUMN `res_TP_TaxFees` varchar(255) DEFAULT NULL,
ADD COLUMN `D1` varchar(300) DEFAULT NULL,
ADD COLUMN `D2` varchar(300) DEFAULT NULL,
ADD COLUMN `D3` varchar(300) DEFAULT NULL,
ADD COLUMN `D4` varchar(300) DEFAULT NULL,
ADD COLUMN `D5` varchar(300) DEFAULT NULL,
ADD COLUMN `D6` varchar(300) DEFAULT NULL,
ADD COLUMN `D7` varchar(300) DEFAULT NULL,
ADD COLUMN `D8` varchar(300) DEFAULT NULL,
ADD COLUMN `D9` varchar(300) DEFAULT NULL;

ALTER TABLE `buildings`
MODIFY COLUMN `email_id` varchar(250) DEFAULT NULL,
MODIFY COLUMN `Buildingname` varchar(250) DEFAULT NULL,
MODIFY COLUMN `type` varchar(200) DEFAULT NULL,
MODIFY COLUMN `address` varchar(250) DEFAULT NULL,	
MODIFY COLUMN `lat` varchar(250) DEFAULT NULL,
MODIFY COLUMN `lon` varchar(250) DEFAULT NULL,
MODIFY COLUMN `cdccn` varchar(250) DEFAULT NULL,
MODIFY COLUMN `AMC` varchar(250) DEFAULT NULL,
MODIFY COLUMN `NSP` varchar(250) DEFAULT NULL,
MODIFY COLUMN `SPCN` varchar(250) DEFAULT NULL,
MODIFY COLUMN `path3` varchar(250) DEFAULT NULL,
MODIFY COLUMN `push_notify_count` int(11) DEFAULT '0';

ALTER TABLE `feedback`
ADD COLUMN  `status` varchar(45) DEFAULT NULL;

ALTER TABLE `payment`
MODIFY COLUMN `id` varchar(45) DEFAULT NULL;

ALTER TABLE `Schedules`
ADD COLUMN  `email_id` varchar(100) DEFAULT NULL,
ADD COLUMN  `rank` varchar(500) DEFAULT NULL,
ADD COLUMN  `A1P220V` varchar(100) DEFAULT NULL,
ADD COLUMN  `A1FASA` varchar(100) DEFAULT NULL,
ADD COLUMN  `A1FARS` varchar(100) DEFAULT NULL,
ADD COLUMN  `A1FAFS` varchar(100) DEFAULT NULL,
ADD COLUMN  `A1TAMS` varchar(100) DEFAULT NULL,
ADD COLUMN  `A1FPPS` varchar(100) DEFAULT NULL,
ADD COLUMN  `A1FPFS` varchar(100) DEFAULT NULL,
ADD COLUMN  `A1SIM` varchar(100) DEFAULT NULL,
ADD COLUMN  `A1TLA` varchar(100) DEFAULT NULL,
ADD COLUMN  `A1FACR` varchar(100) DEFAULT NULL,
ADD COLUMN  `A2P220V` varchar(100) DEFAULT NULL,
ADD COLUMN  `A2FASA` varchar(100) DEFAULT NULL,
ADD COLUMN  `A2FARS` varchar(100) DEFAULT NULL,
ADD COLUMN  `A2FAFS` varchar(100) DEFAULT NULL,
ADD COLUMN  `A2TAMS` varchar(100) DEFAULT NULL,
ADD COLUMN  `A2FPPS` varchar(100) DEFAULT NULL,
ADD COLUMN  `A2FPFS` varchar(100) DEFAULT NULL,
ADD COLUMN  `A2SIM` varchar(100) DEFAULT NULL,
ADD COLUMN  `A2TLA` varchar(100) DEFAULT NULL,
ADD COLUMN  `A2FACR` varchar(100) DEFAULT NULL,
ADD COLUMN  `A3P220V` varchar(100) DEFAULT NULL,
ADD COLUMN  `A3FASA` varchar(100) DEFAULT NULL,
ADD COLUMN  `A3FARS` varchar(100) DEFAULT NULL,
ADD COLUMN  `A3FAFS` varchar(100) DEFAULT NULL,
ADD COLUMN  `A3TAMS` varchar(100) DEFAULT NULL,
ADD COLUMN `A3FPPS` varchar(100) DEFAULT NULL,
ADD COLUMN  `A3FPFS` varchar(100) DEFAULT NULL,
ADD COLUMN  `A3SIM` varchar(100) DEFAULT NULL,
ADD COLUMN  `A3TLA` varchar(100) DEFAULT NULL,
ADD COLUMN  `A3FACR` varchar(100) DEFAULT NULL,
ADD COLUMN  `orderid` varchar(45) DEFAULT NULL;


CREATE TABLE `blockchain` (
	`email_id` VARCHAR(100) NULL COLLATE 'utf8_general_ci',
	`firstname_en` VARCHAR(100) NULL COLLATE 'utf8_general_ci',
	`firstname_ar` VARCHAR(100) NULL COLLATE 'utf8_general_ci',
	`lastname_en` VARCHAR(100) NULL COLLATE 'utf8_general_ci',
	`lastname_ar` VARCHAR(100) NULL COLLATE 'utf8_general_ci',
	`company_en` VARCHAR(100) NULL COLLATE 'utf8_general_ci',
	`company_ar` VARCHAR(100) NULL COLLATE 'utf8_general_ci',
	`address_en` VARCHAR(300) NULL COLLATE 'utf8_general_ci',
	`address_ar` VARCHAR(300) NULL COLLATE 'utf8_general_ci',
	`nationality_en` VARCHAR(100) NULL COLLATE 'utf8_general_ci',
	`nationality_ar` VARCHAR(100) NULL COLLATE 'utf8_general_ci',
	`alter_number` VARCHAR(100) NULL COLLATE 'utf8_general_ci',
	`mobile_number` VARCHAR(50) NULL COLLATE 'utf8_general_ci',
	`emirates_id` VARCHAR(100) NULL COLLATE 'utf8_general_ci',
	`po_box` VARCHAR(300) NULL COLLATE 'utf8_general_ci',
	`reg_date` DATETIME NULL,
	`Buildingname` VARCHAR(250) NULL COLLATE 'utf8_general_ci',
	`orderid` VARCHAR(45) NULL COLLATE 'latin1_swedish_ci',
	`address` VARCHAR(250) NULL COLLATE 'utf8_general_ci',
	`lat` VARCHAR(250) NULL COLLATE 'utf8_general_ci',
	`lon` VARCHAR(250) NULL COLLATE 'utf8_general_ci',
	`AMC` VARCHAR(250) NULL COLLATE 'utf8_general_ci',
	`cdccn` VARCHAR(250) NULL COLLATE 'utf8_general_ci',
	`NSP` VARCHAR(250) NULL COLLATE 'utf8_general_ci',
	`SPCN` VARCHAR(250) NULL COLLATE 'utf8_general_ci',
	`suplier_id` VARCHAR(500) NULL COLLATE 'latin1_swedish_ci',
	`schedule_time` VARCHAR(300) NULL COLLATE 'utf8_general_ci',
	`requestdate` VARCHAR(300) NULL COLLATE 'utf8_general_ci',
	`status` VARCHAR(300) NULL COLLATE 'latin1_swedish_ci',
	`FACP` VARCHAR(300) NULL COLLATE 'latin1_swedish_ci',
	`CSI` VARCHAR(300) NULL COLLATE 'latin1_swedish_ci',
	`BRAND` VARCHAR(300) NULL COLLATE 'latin1_swedish_ci'
) ENGINE=MyISAM;


