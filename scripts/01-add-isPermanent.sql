-- Passo 1: criar coluna (rode antes do fix-lifetime-manual.sql)
ALTER TABLE `Key` ADD COLUMN `isPermanent` TINYINT(1) NOT NULL DEFAULT 0;
