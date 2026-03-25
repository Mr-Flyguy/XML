const requests_service = require("../services/requestsService");

function get_all_requests(req, res) {
    const { title, status, type } = req.query;
    const requests = requests_service.find_all({ title, status, type });
    res.json(requests);
}

function get_request_by_id(req, res) {
    const id = parseInt(req.params.id);
    const request = requests_service.find_one(id);

    if (!request) {
        return res.status(404).json({ error: "Заявка не найдена" });
    }

    res.json(request);
}

function create_request(req, res) {
    const { title, description, type, status } = req.body;

    if (!title || !description || !type || !status) {
        return res.status(400).json({ error: "Не все обязательные поля заполнены" });
    }

    const new_request = requests_service.create(req.body);
    res.status(201).json(new_request);
}

function update_request(req, res) {
    const id = parseInt(req.params.id);
    const updated_request = requests_service.update(id, req.body);

    if (!updated_request) {
        return res.status(404).json({ error: "Заявка не найдена" });
    }

    res.json(updated_request);
}

function delete_request(req, res) {
    const id = parseInt(req.params.id);
    const success = requests_service.remove(id);

    if (!success) {
        return res.status(404).json({ error: "Заявка не найдена" });
    }

    res.status(204).send();
}

module.exports = {
    get_all_requests,
    get_request_by_id,
    create_request,
    update_request,
    delete_request
};