-- AlterTable
ALTER TABLE `Client` ADD COLUMN `discordId` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Client_discordId_idx` ON `Client`(`discordId`);

-- CreateTable
CREATE TABLE `banned_hwids` (
    `id` VARCHAR(191) NOT NULL,
    `hwid` VARCHAR(191) NOT NULL,
    `reason` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `banned_hwids_hwid_key`(`hwid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
