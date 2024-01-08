import { backendUrl } from "./backendUrl";
import { user } from "./gameSignals";

export const logout = () => {
    localStorage.removeItem("token");
    user.value = null;
    window.location.reload();
}

export const startLogin = (provider) => {
    window.location.href = `${backendUrl()}/api/auth/login?provider=${provider}`
}