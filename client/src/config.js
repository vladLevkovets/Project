import axios from "axios";
// =======  preparing to the deplyment  ========
const URL =
    window.location.hostname === `localhost`
        ? `http://localhost:4040` // 3030 should be replaced with your server port
        : `http://206.189.100.116`; // it should be replaced with actual domain during the deployment
// =============================================
const customInstance = axios.create({
    baseURL: URL,
    headers: { Accept: "application/json" },
});

export {URL};