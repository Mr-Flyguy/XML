const express = require("express");
const path = require("path");
const requests_router = require("./routes/requests");
const requests_service = require("./services/requestsService");

const app = express();
const PORT = 3000;

const data_file_path = path.join(__dirname, "data/requests.json");
requests_service.init(data_file_path);

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("API для заявок на вычисления работает");
});

app.use("/requests", requests_router);

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});