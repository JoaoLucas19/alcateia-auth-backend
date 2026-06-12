export type AuthToastType = "success" | "info" | "warning" | "error";

export interface AuthToastNotification {
  type: AuthToastType;
  title: string;
  message: string;
}

export function buildLoginNotification(username: string): AuthToastNotification {
  return {
    type: "success",
    title: "Login realizado",
    message: `Bem-vindo, ${username}!`,
  };
}

export function buildLogoutNotification(username: string): AuthToastNotification {
  return {
    type: "info",
    title: "Logout",
    message: `Até logo, ${username}. Sessão encerrada com sucesso.`,
  };
}
