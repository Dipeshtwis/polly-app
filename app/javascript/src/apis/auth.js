import axios from "axios";

const login = payload => axios.post("/api/v1/sessions", payload);

const logout = () => axios.delete(`/api/v1/sessions`);

const signup = payload => axios.post("/api/v1/users", payload);

const authApi = {
  login,
  logout,
  signup,
};

export default authApi;
