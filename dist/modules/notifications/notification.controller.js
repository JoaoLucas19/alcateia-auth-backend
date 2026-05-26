"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDiscord = testDiscord;
exports.sendTestAlert = sendTestAlert;
const discord_service_1 = require("./discord.service");
const discord_dispatcher_1 = require("./discord.dispatcher");
async function testDiscord(req, res, next) {
    try {
        if (!(0, discord_service_1.isDiscordConfigured)()) {
            res.status(400).json({
                success: false,
                message: "DISCORD_WEBHOOK_URL não configurado ou alertas desativados",
            });
            return;
        }
        const ok = await (0, discord_service_1.sendDiscordTest)();
        res.status(ok ? 200 : 502).json({
            success: ok,
            message: ok ? "Mensagem de teste enviada ao Discord" : "Falha ao enviar para o Discord",
        });
    }
    catch (err) {
        next(err);
    }
}
async function sendTestAlert(req, res, next) {
    try {
        const alert = {
            type: "SPIKE_FAILURES",
            severity: "MEDIUM",
            message: "Teste manual de alerta de segurança do painel Alcateia Auth",
            detectedAt: new Date().toISOString(),
        };
        const ok = await (0, discord_dispatcher_1.dispatchImmediateAlert)(alert, 0);
        res.status(ok ? 200 : 502).json({
            success: ok,
            message: ok ? "Alerta de teste enviado" : "Falha ao enviar alerta",
        });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=notification.controller.js.map