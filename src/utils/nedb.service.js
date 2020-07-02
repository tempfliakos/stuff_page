import Nedb from "nedb/browser-version/out/nedb.min";
import { promisify } from "./promisify";

export class NedbService {
    constructor(datafile) {
        this.db = new Nedb({ filename: datafile, autoload: true });

        const methods = ["find", "findOne", "insert", "update", "remove"];
        methods.forEach(
            (method) => (this.db[method] = promisify(this.db[method].bind(this.db)))
        );
    }

    async find(filter = {}) {
        return await this.db.find(filter);
    }

    async findOne(filter = {}) {
        return await this.db.findOne(filter);
    }

    async insert(data) {
        return await this.db.insert(data);
    }

    async update(id, data) {
        return await this.db.update({ _id: id }, data, {
            returnUpdatedDocs: true,
        });
    }

    async remove(id) {
        return await this.db.remove({ id: id });
    }
}
