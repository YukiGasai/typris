import { backendUrl } from "./backendUrl";
import { user } from "./gameSignals";

export const logout = () => {
    localStorage.removeItem("token");
    user.value = null;
}

export const startLogin = (provider) => {
    window.location.href = `${backendUrl()}/api/auth/${provider}`

    // window.location.href = `${backendUrl()}/api/auth/github`
}