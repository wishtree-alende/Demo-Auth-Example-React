import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:9090/api/resto/";
const user = JSON.parse(localStorage.getItem("user"));

// var headers = {
//   "Content-Type": "application/json",
//   Authorization: "Bearer " + user && user.accessToken ? user.accessToken : "",
// };

class RestoService {
  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  getAllRestoData() {
    return axios.get(API_URL + "show", { headers: authHeader() });
  }

  addResto(data) {
    return axios.post(API_URL + "add", data, {
      headers: authHeader(),
      "Content-Type": "application/json",
    });
  }

  showById(id) {
    return axios.get(API_URL + `show/${id}`, {
      headers: authHeader(),
    });
  }

  updateRestoById(id, data) {
    return axios.put(API_URL + `change/${id}`, data, {
      headers: authHeader(),
      "Content-Type": "application/json",
    });
  }
  // delete by id
  deleteUserData(id) {
    return axios.delete(API_URL + `delete/${id}`, {
      headers: authHeader(),
    });
  }

  //search api
  search(text) {
    return axios.get(API_URL + `search?resto=${text}`, {
      headers: authHeader(),
    });
  }

  // change status
  changeRestoStatus(id) {
    return axios.get(API_URL + `changestatus/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new RestoService();
