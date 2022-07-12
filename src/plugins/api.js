import axios from "./axios";

const api = {
  get(url, params = {}, cancel_token = null) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params,
          cancelToken: cancel_token ? cancel_token.token : null,
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          if (axios.isCancel(err)) {
            return reject("canceled");
          }
          reject(err);
        });
    });
  },

  post(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  put(url, data = {}) {},

  delete(url, data = {}) {},
};

export default {
  AUTH :{
    register(payload){
      return api.post('/app/sign-up', payload )
    },
    login(payload){
      return api.post('/app/sign-in', payload )
    },
    fetchUser(){
      return api.get('/app/user')
    }
  }
};
