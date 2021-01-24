import axios from "axios";

class BaseService {
    listUrl() {
        return "";
    }

    detailUrl(id) {
        return this.listUrl() + id;
    }

    patchPutUrl(id) {
        return this.detailUrl(id) + "/";
    }

    deleteUrl(id) {
        return this.detailUrl(id) + "/";
    }

    // basic CRUD operations
    async get(id) {
        const url = this.detailUrl(id);
        const response = await axios.get(url);
        return response.data;
    }

    async getAll() {
        const url = this.listUrl();
        const response =  await axios.get(url);
        return response.data;
    }

    async patch(id, data) {
        const url = this.patchPutUrl(id);
        const response = await axios.patch(url, data);
        return response.data;
    }

    async post(data) {
        const url = this.listUrl();
        const response = await axios.post(url, data);
        return response.data;
    }

    async deleteRow(id) {
        const url = this.deleteUrl(id);
        return await axios.delete(url);
    }
}

export default BaseService;
