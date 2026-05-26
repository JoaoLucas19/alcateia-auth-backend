-- CreateTable
CREATE TABLE `notification_settings` (
    `id` VARCHAR(191) NOT NULL,
    `discordWebhookUrl` TEXT NULL,
    `discordAlertsEnabled` BOOLEAN NOT NULL DEFAULT true,
    `discordNotifyBruteForce` BOOLEAN NOT NULL DEFAULT true,
    `discordNotifyKeyScanning` BOOLEAN NOT NULL DEFAULT true,
    `discordNotifyHighThreat` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
