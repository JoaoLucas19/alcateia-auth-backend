export type ResolvedNotificationDeliveryConfig = {
    webhookUrl: string;
    alertsEnabled: boolean;
    notifyBruteForce: boolean;
    notifyKeyScanning: boolean;
    notifyHighThreat: boolean;
    /** webhook válido + alertas ligados — pronto para enviar ao Discord */
    configured: boolean;
};
export declare function resolveNotificationDeliveryConfig(): Promise<ResolvedNotificationDeliveryConfig>;
/** Mascarar URL para GET (nunca retornar webhook completo) */
export declare function maskWebhookPreview(url: string): string;
