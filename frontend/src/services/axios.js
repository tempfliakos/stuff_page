import axios from "axios";
import Cookies from "universal-cookie/lib";

const defaultHeader = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8'}

export async function makeGetRequest(url, param) {
	return await axios.get(url, {
		params: param
	}).then(res => {
			return res;
		}
	).catch(err => console.log(err))
}

export async function makePostRequest(endpoint, data, needCookie = false) {
	const url = process.env.REACT_APP_SERVER_LINK;
	let headers = defaultHeader;
	if(needCookie) {
		const cookies = new Cookies();
		headers["Authorization"] = "Bearer ".concat(cookies.get("stuffPages"));
	}
	const config = {
		url: url + endpoint,
		headers: headers,
		body: data
	}
	return await axios.post(config.url, config.body, config).then(res => {
			return res;
		}
	).catch(err => {
		throw new Error(err);
	})
}

export async function getDashboardData(endpoint) {
	const url = process.env.REACT_APP_SERVER_LINK;
	const cookies = new Cookies();
	const config = {
		url: `${url}dashboard/${endpoint}`,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json; charset=utf-8',
			'Authorization': `Bearer ${cookies.get('stuffPages')}`
		},
	};

	return await axios.get(config.url, config).then(res => {
			return res.data;
		}
	).catch(err => {
		throw new Error(err);
	})
}

export async function getDataFromEndpoint(endpoint, data) {
	if (data) {
		const url = process.env.REACT_APP_SERVER_LINK + "endpoint/" + endpoint + "/query=" + data;
		console.log(url)
		return await axios.get(url).then(res => {
				return res;
			}
		).catch(err => {
			throw new Error(err);
		})
	}
	return [];
}