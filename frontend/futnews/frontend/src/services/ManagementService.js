import "regenerator-runtime/runtime.js";
import BaseService from "./BaseService";

class ManagementService extends BaseService {
    // only POST will be available here
    listUrl() {
        return "http://localhost/api/v1/management/update/";
    }
}

export default ManagementService;
