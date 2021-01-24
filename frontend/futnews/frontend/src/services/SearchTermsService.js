import "regenerator-runtime/runtime.js";
import BaseService from "./BaseService";

class SearchTermsService extends BaseService {
    listUrl() {
        return "http://localhost/api/v1/search-terms/";
    }
}

export default SearchTermsService;
