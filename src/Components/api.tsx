import axios from 'axios';

const api = {
  getProducts: () => {
    return axios.get('https://fakestoreapi.com/products?limit=6');
  }
};

export default api;