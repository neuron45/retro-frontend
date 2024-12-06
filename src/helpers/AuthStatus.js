export function isRestroUserAuthenticated() {
    console.log({cookie: document.cookie});
    const restroAuthenticated = document.cookie.includes("restroprosaas__authenticated=");
    return restroAuthenticated;
}