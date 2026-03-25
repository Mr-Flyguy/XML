import { initial_requests } from "../data/requests.js";

const storage_key = "math_requests";

export function get_requests() {
    const saved_requests = localStorage.getItem(storage_key);

    if (saved_requests) {
        return JSON.parse(saved_requests);
    }

    localStorage.setItem(storage_key, JSON.stringify(initial_requests));
    return [...initial_requests];
}

export function save_requests(requests) {
    localStorage.setItem(storage_key, JSON.stringify(requests));
}

export function add_request(request) {
    const requests = get_requests();
    requests.push(request);
    save_requests(requests);
}

export function delete_request(id) {
    const requests = get_requests().filter((request) => request.id !== id);
    save_requests(requests);
}

export function get_request_by_id(id) {
    return get_requests().find((request) => request.id === id);
}

export function get_next_id() {
    const requests = get_requests();

    if (requests.length === 0) {
        return 1;
    }

    let max_id = requests[0].id;

    for (let i = 1; i < requests.length; i++) {
        if (requests[i].id > max_id) {
            max_id = requests[i].id;
        }
    }

    return max_id + 1;
}