import prisma from "../../prisma/client";

export const NOTIFICATION_SETTINGS_ID = "singleton";

/** Linha da tabela notification_settings (espelha o schema Prisma) */
export interface NotificationSettingsRow {
  id: string;
  discordWebhookUrl: string | null;
  discordAlertsEnabled: boolean;
  discordNotifyBruteForce: boolean;
  discordNotifyKeyScanning: boolean;
  discordNotifyHighThreat: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type NotificationSettingsWriteData = {
  discordWebhookUrl?: string | null;
  discordAlertsEnabled?: boolean;
  discordNotifyBruteForce?: boolean;
  discordNotifyKeyScanning?: boolean;
  discordNotifyHighThreat?: boolean;
};

type NotificationSettingsDelegate = {
  findUnique(args: { where: { id: string } }): Promise<NotificationSettingsRow | null>;
  update(args: {
    where: { id: string };
    data: NotificationSettingsWriteData;
  }): Promise<NotificationSettingsRow>;
  create(args: {
    data: NotificationSettingsWriteData & { id: string };
  }): Promise<NotificationSettingsRow>;
};

/** Acesso tipado ao delegate (evita erro de IDE quando o Prisma Client ainda não foi gerado) */
function notificationSettings(): NotificationSettingsDelegate {
  return (prisma as unknown as { notificationSettings: NotificationSettingsDelegate })
    .notificationSettings;
}

export async function findNotificationSettings(): Promise<NotificationSettingsRow | null> {
  return notificationSettings().findUnique({
    where: { id: NOTIFICATION_SETTINGS_ID },
  });
}

export type NotificationSettingsPatch = NotificationSettingsWriteData;

function buildUpdateData(patch: NotificationSettingsPatch): NotificationSettingsWriteData {
  const data: NotificationSettingsWriteData = {};

  if (patch.discordWebhookUrl !== undefined) {
    data.discordWebhookUrl = patch.discordWebhookUrl;
  }
  if (patch.discordAlertsEnabled !== undefined) {
    data.discordAlertsEnabled = patch.discordAlertsEnabled;
  }
  if (patch.discordNotifyBruteForce !== undefined) {
    data.discordNotifyBruteForce = patch.discordNotifyBruteForce;
  }
  if (patch.discordNotifyKeyScanning !== undefined) {
    data.discordNotifyKeyScanning = patch.discordNotifyKeyScanning;
  }
  if (patch.discordNotifyHighThreat !== undefined) {
    data.discordNotifyHighThreat = patch.discordNotifyHighThreat;
  }

  return data;
}

function buildCreateData(patch: NotificationSettingsPatch): NotificationSettingsWriteData & { id: string } {
  return {
    id: NOTIFICATION_SETTINGS_ID,
    discordWebhookUrl: patch.discordWebhookUrl ?? null,
    discordAlertsEnabled: patch.discordAlertsEnabled ?? true,
    discordNotifyBruteForce: patch.discordNotifyBruteForce ?? true,
    discordNotifyKeyScanning: patch.discordNotifyKeyScanning ?? true,
    discordNotifyHighThreat: patch.discordNotifyHighThreat ?? true,
  };
}

export async function upsertNotificationSettings(
  patch: NotificationSettingsPatch
): Promise<NotificationSettingsRow> {
  const db = notificationSettings();
  const existing = await findNotificationSettings();
  const updateData = buildUpdateData(patch);

  if (existing) {
    if (Object.keys(updateData).length === 0) {
      return existing;
    }
    return db.update({
      where: { id: NOTIFICATION_SETTINGS_ID },
      data: updateData,
    });
  }

  return db.create({
    data: buildCreateData(patch),
  });
}
