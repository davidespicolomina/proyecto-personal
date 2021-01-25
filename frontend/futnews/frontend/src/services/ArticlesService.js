import "regenerator-runtime/runtime.js";
import BaseService from "./BaseService";
import axios from "axios";

class ArticlesService extends BaseService {
    listUrl() {
        return "http://localhost/api/v1/articles/";
    }

    async getAllFiltered(filter) {
        const url = this.listUrl();
        let params = {
            filter: filter
        }
        if (!filter) {
            params = {}
        }
        const response =  await axios.get(url, { params: params});
        return response.data;
    }
}

export default ArticlesService;
