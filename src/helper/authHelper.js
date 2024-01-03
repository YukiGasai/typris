import { user } from "./gameSignals";

export const logout = () => {
    localStorage.removeItem("token");
    user.value = null;
}

export const startLogin = () => {
    if(window.location.href.startsWith("http:")){
        window.location.href = "http://localhost:8888/api/auth/github"
    } else {
        //Todo change this to the production url
        window.location.href = "https://tetris-tutor-back.vercel.app/api/auth/github"
    }
}