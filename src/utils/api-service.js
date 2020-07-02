const REST_HOST = "http://localhost:3001";

export class ApiService {
    constructor(apiPath) {
        this.apiPath = apiPath;
    }

    async request(endpoint, method, body = undefined) {
        const url = REST_HOST + this.apiPath + endpoint;
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            method,
            body,
        });

        return response.json();
    }

    async find(filter = {}) {
        const query = Object.keys(filter)
            .map((key) => `${key}=${filter[key]}`)
            .join("&");
        const payload = await this.request("/" + query, "GET");
        return payload;
    }

    async findOne(filter = {}) {
        const list = await this.find(filter);
        return list[0];
    }

    async insert(record) {
        const payload = await this.request("/", "POST", JSON.stringify(record));
        return payload;
    }

    async update(id, record) {
        const payload = await this.request("/" + id, "PUT", JSON.stringify(record));
        return payload;
    }

    async remove(id) {
        const payload = await this.request("/" + id, "DELETE");
        return payload;
    }
}