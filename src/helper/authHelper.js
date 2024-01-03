import { user } from "./gameSignals";

export const logout = () => {
    localStorage.removeItem("token");
    user.value = null;
}

export const startLogin = () => {
    if(window.location.href.startsWith("http:")){
        console.log("here")
        window.location.href = "http://localhost:8888/api/auth/github"
    } else {
        //Todo change this to the production url
        window.location.href = "https://skjdahb;vsa;sdjfhgla/api/auth/github"
    }
}