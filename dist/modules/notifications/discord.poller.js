"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDiscordAlertPoller = startDiscordAlertPoller;
const env_1 = require("../../config/env");
const logger_1 = require("../../utils/logger");
const log_service_1 = require("../logs/log.service");
const discord_dispatcher_1 = require("./discord.dispatcher");
const discord_service_1 = require("./discord.service");
let pollerStarted = false;
let pollInFlight = false;
async function runPoll() {
    if (pollInFlight)
        return;
    if (!(0, discord_service_1.isDiscordConfigured)())
        return;
    pollInFlight = true;
    try {
        const evaluation = await log_service_1.logService.evaluateSecurity();
        await (0, discord_dispatcher_1.dispatchSecurityAlerts)(evaluation.alerts, {
            threatLevel: evaluation.threatLevel,
            threatScore: evaluation.threatScore,
        });
    }
    catch (err) {
        logger_1.logger.error("Discord poller falhou", {
            error: err instanceof Error ? err.message : String(err),
        });
    }
    finally {
        pollInFlight = false;
    }
}
function startDiscordAlertPoller() {
    if (pollerStarted)
        return;
    pollerStarted = true;
    if (!(0, discord_service_1.isDiscordConfigured)()) {
        logger_1.logger.info("Discord alerts: desativado (defina DISCORD_WEBHOOK_URL no Railway)");
        return;
    }
    logger_1.logger.info("Discord alerts: poller ativo", {
        intervalMs: env_1.env.DISCORD_ALERT_POLL_MS,
    });
    // Primeira verificação após 45s (servidor e DB estáveis)
    setTimeout(() => {
        runPoll().catch(() => undefined);
    }, 45000);
    setInterval(() => {
        runPoll().catch(() => undefined);
    }, env_1.env.DISCORD_ALERT_POLL_MS);
}
//# sourceMappingURL=discord.poller.js.map