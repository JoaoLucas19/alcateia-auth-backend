"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLoginNotification = buildLoginNotification;
exports.buildLogoutNotification = buildLogoutNotification;
function buildLoginNotification(username) {
    return {
        type: "success",
        title: "Login realizado",
        message: `Bem-vindo, ${username}!`,
    };
}
function buildLogoutNotification(username) {
    return {
        type: "info",
        title: "Logout",
        message: `Até logo, ${username}. Sessão encerrada com sucesso.`,
    };
}
//# sourceMappingURL=auth-notifications.js.map