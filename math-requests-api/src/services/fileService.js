const fs = require("fs");

function read_data(file_path) {
    try {
        const data = fs.readFileSync(file_path, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Ошибка чтения файла:", error);
        return [];
    }
}

function write_data(file_path, data) {
    try {
        fs.writeFileSync(file_path, JSON.stringify(data, null, 2), "utf8");
    } catch (error) {
        console.error("Ошибка записи файла:", error);
    }
}

module.exports = {
    read_data,
    write_data
};