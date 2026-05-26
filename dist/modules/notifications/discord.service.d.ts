import type { SecurityAlert, ThreatLevel } from "../logs/log.types";
export declare function isDiscordConfigured(): boolean;
export declare function sendDiscordMessage(payload: {
    content?: string;
    embeds?: Array<{
        title: string;
        description: string;
        color: number;
        fields?: Array<{
            name: string;
            value: string;
            inline?: boolean;
        }>;
        timestamp?: string;
    }>;
}): Promise<boolean>;
export declare function sendSecurityAlert(alert: SecurityAlert): Promise<boolean>;
export declare function sendSecuritySummary(payload: {
    threatLevel: ThreatLevel;
    threatScore: number;
    alertCount: number;
    topAlerts: SecurityAlert[];
}): Promise<boolean>;
export declare function sendDiscordTest(): Promise<boolean>;
