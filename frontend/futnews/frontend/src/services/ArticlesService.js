import "regenerator-runtime/runtime.js";
import BaseService from "./BaseService";

class ArticlesService extends BaseService {
    listUrl() {
        return "http://localhost/api/v1/articles/";
    }
}

export default ArticlesService;
