import "regenerator-runtime/runtime.js";
import BaseService from "./BaseService";
import axios from "axios";

class ArticlesService extends BaseService {
    listUrl() {
        return "http://localhost/api/v1/articles/";
    }

    async getAllFiltered(page, filter) {
        const url = this.listUrl();
        if (!page) {
            page = 0
        }
        let params = {
            page: page,
            size: 20,
        }
        if (filter) {
            params.filter = filter;
        }
        const response =  await axios.get(url, { params: params});
        return response.data;
    }
}

export default ArticlesService;
