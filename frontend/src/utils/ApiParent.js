import Cookies from "universal-cookie/lib";

const REST_HOST = process.env.REACT_APP_SERVER_LINK;

export class ApiParent {
	constructor(apiPath) {
		this.apiPath = apiPath;
	}

	async request(endpoint, method, body = undefined) {
		const url = REST_HOST + this.apiPath + endpoint;
		const cookies = new Cookies();
		const headers = {
			"Content-Type": "application/json;charset=utf-8",
			"Authorization": "Bearer ".concat(cookies.get("stuffPages")),
		}
		const response = await fetch(url, {
			headers,
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