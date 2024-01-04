export const backendUrl = () => {
    if(window.location.href.startsWith("http:")){
        return "http://localhost:8888"
    } else {
        return "https://tetris-tutor-back.vercel.app"
    }
}