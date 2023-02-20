import axios from "axios";

const API_URL = "http://localhost:9090/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(firstName, lastName, username, email, password) {
    console.log("Called!!", firstName, lastName, username, email, password);
    return axios.post(API_URL + "signup", {
      firstName,
      lastName,
      username,
      email,
      password,
      // role added
      // data,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
