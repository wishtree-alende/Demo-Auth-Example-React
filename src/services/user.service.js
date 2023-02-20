import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:9090/api/test/";
const USER_API_URL = "http://localhost:9090/api/users/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  // get all the registered user data here
  getAllUserData() {
    return axios.get(USER_API_URL + "getUserData", { headers: authHeader() });
  }

  // delete by id
  deleteUserData(id) {
    return axios.delete(USER_API_URL + `deleteUserData/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new UserService();
