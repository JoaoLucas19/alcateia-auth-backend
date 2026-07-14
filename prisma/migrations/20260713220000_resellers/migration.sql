-- CreateTable
CREATE TABLE `resellers` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `owner` VARCHAR(191) NOT NULL,
    `discord` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `notes` TEXT NULL,
    `status` ENUM('ACTIVE', 'PAUSED', 'BANNED', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `resellers_status_idx`(`status`),
    INDEX `resellers_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reseller_history` (
    `id` VARCHAR(191) NOT NULL,
    `resellerId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `actor` VARCHAR(191) NOT NULL DEFAULT 'admin',
    `metadata` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `reseller_history_resellerId_createdAt_idx`(`resellerId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AlterTable Key: vincular à loja/revendedor
ALTER TABLE `Key` ADD COLUMN `resellerId` VARCHAR(191) NULL;
CREATE INDEX `Key_resellerId_idx` ON `Key`(`resellerId`);
CREATE INDEX `Key_status_idx` ON `Key`(`status`);

-- AddForeignKey
ALTER TABLE `reseller_history` ADD CONSTRAINT `reseller_history_resellerId_fkey` FOREIGN KEY (`resellerId`) REFERENCES `resellers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `Key` ADD CONSTRAINT `Key_resellerId_fkey` FOREIGN KEY (`resellerId`) REFERENCES `resellers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
