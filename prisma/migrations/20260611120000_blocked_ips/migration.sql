-- CreateTable
CREATE TABLE `blocked_ips` (
    `id` VARCHAR(191) NOT NULL,
    `ipAddress` VARCHAR(191) NOT NULL,
    `reason` VARCHAR(191) NULL,
    `source` VARCHAR(191) NULL DEFAULT 'AUTO',
    `blockedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NULL,

    UNIQUE INDEX `blocked_ips_ipAddress_key`(`ipAddress`),
    INDEX `blocked_ips_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
