const file_service = require("./fileService");

let data_file_path;

function init(file_path) {
    data_file_path = file_path;
}

function find_all(filters) {
    let requests = file_service.read_data(data_file_path);

    if (filters.title) {
        requests = requests.filter((request) =>
            request.title.toLowerCase().includes(filters.title.toLowerCase())
        );
    }

    if (filters.status) {
        requests = requests.filter(
            (request) => request.status.toLowerCase() === filters.status.toLowerCase()
        );
    }

    if (filters.type) {
        requests = requests.filter(
            (request) => request.type.toLowerCase() === filters.type.toLowerCase()
        );
    }

    return requests;
}

function find_one(id) {
    const requests = file_service.read_data(data_file_path);
    return requests.find((request) => request.id === id);
}

function create(request_data) {
    const requests = file_service.read_data(data_file_path);

    const new_id =
        requests.length > 0
            ? Math.max(...requests.map((request) => request.id)) + 1
            : 1;

    const new_request = {
        id: new_id,
        ...request_data
    };

    requests.push(new_request);
    file_service.write_data(data_file_path, requests);

    return new_request;
}

function update(id, request_data) {
    const requests = file_service.read_data(data_file_path);
    const index = requests.findIndex((request) => request.id === id);

    if (index === -1) {
        return null;
    }

    requests[index] = {
        ...requests[index],
        ...request_data
    };

    file_service.write_data(data_file_path, requests);
    return requests[index];
}

function remove(id) {
    const requests = file_service.read_data(data_file_path);
    const filtered_requests = requests.filter((request) => request.id !== id);

    if (filtered_requests.length === requests.length) {
        return false;
    }

    file_service.write_data(data_file_path, filtered_requests);
    return true;
}

module.exports = {
    init,
    find_all,
    find_one,
    create,
    update,
    remove
};