const axios = require("axios");
const ErrorMessage = require("./ErrorMessage");

class GTAUtil {
    async requestGTAGame(title, console) {
        const url = `${process.env.GTA_SERVER_LINK}games?console=${console}&q=${title}`;
        const config = {
            url: url,
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": process.env.GTA_AUTH
            },
        };
        return await axios.get(url, config).then(response => {
            return response.data;
        }).catch(e => {
            return new ErrorMessage(400, "Hiba!", e.message);
        });
    }

    async requestGTAAchievement(id) {
        const url = `${process.env.GTA_SERVER_LINK}achievements?id=${id}`;
        const config = {
            url: url,
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": process.env.GTA_AUTH
            },
        };
        return await axios.get(url, config).then(response => {
            return response.data;
        }).catch(e => {
            return new ErrorMessage(400, "Hiba!", e.message);
        });
    }
}

module.exports = GTAUtil;
