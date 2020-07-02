import axios from "axios";

const defaultHeader = {'Access-Control-Allow-Origin': '*'}

export async function makeGetRequest(url, param) {
    return await axios.get(url, {
        params: param
    }).then(res => {
            return res;
        }
    ).catch(err => console.log(err))
}

export async function makePostRequest(endpoint, data) {
    const url = 'https://cors-anywhere.herokuapp.com/https://stuff-pages-server.herokuapp.com:4669/' + endpoint;
    const config = {
        url: url,
        headers: defaultHeader,
        body: data
    }
    return await axios.post(config.url, config.data, config).then(res => {
            return res;
        }
    ).catch(err => {
        throw new Error(err);
    })
}