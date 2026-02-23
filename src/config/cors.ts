import cors from "cors";

const corsOptions: cors.CorsOptions = {
    origin: [
        "http://localhost:5175",
        "http://10.67.168.15:5175",
        "http://10.19.98.15:5175",
        "http://192.168.1.3:5175/"
    ],

    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization", "x-csrf-token", "x-xsrf-token"],
    credentials: true,
    preflightContinue: false,
};


export default corsOptions;
