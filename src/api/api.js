import { stringify } from "qs";
import axios from "axios";

axios.defaults.validateStatus = status => {
    return status < 500;
}


axios.defaults.baseURL = "http://10.149.0.173:7083";

