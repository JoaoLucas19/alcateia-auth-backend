-- CreateTable
CREATE TABLE `ClientAccessLog` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NULL,
    `usernameAttempted` VARCHAR(191) NOT NULL,
    `ipAddress` VARCHAR(191) NOT NULL,
    `hwid` VARCHAR(191) NULL,
    `action` VARCHAR(191) NOT NULL DEFAULT 'LOGIN',
    `success` BOOLEAN NOT NULL,
    `reason` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ClientAccessLog_createdAt_idx`(`createdAt`),
    INDEX `ClientAccessLog_success_createdAt_idx`(`success`, `createdAt`),
    INDEX `ClientAccessLog_ipAddress_createdAt_idx`(`ipAddress`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClientAccessLog` ADD CONSTRAINT `ClientAccessLog_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX `KeyUsageLog_attemptedAt_idx` ON `KeyUsageLog`(`attemptedAt`);

-- CreateIndex
CREATE INDEX `KeyUsageLog_result_attemptedAt_idx` ON `KeyUsageLog`(`result`, `attemptedAt`);

-- CreateIndex
CREATE INDEX `KeyUsageLog_ipAddress_attemptedAt_idx` ON `KeyUsageLog`(`ipAddress`, `attemptedAt`);

-- CreateIndex
CREATE INDEX `AccessLog_createdAt_idx` ON `AccessLog`(`createdAt`);

-- CreateIndex
CREATE INDEX `AccessLog_success_createdAt_idx` ON `AccessLog`(`success`, `createdAt`);

-- CreateIndex
CREATE INDEX `AccessLog_ipAddress_createdAt_idx` ON `AccessLog`(`ipAddress`, `createdAt`);
