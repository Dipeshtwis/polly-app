import axios from "axios";

const list = () => axios.get("/api/v1/polls");
const create = payload => axios.post("/api/v1/polls/", payload);
const show = id => axios.get(`/api/v1/polls/${id}`);
const update = ({ id, payload }) => axios.put(`/api/v1/polls/${id}`, payload);
const destroy = id => axios.delete(`/api/v1/polls/${id}`);

const pollsApi = {
  list,
  create,
  show,
  update,
  destroy,
};

export default pollsApi;
