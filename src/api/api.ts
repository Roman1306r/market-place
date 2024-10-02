import { NewClient } from '../types/clients'
import { NewComment } from '../types/comments'
import { IPostAdd } from '../types/posts'
import axios from 'axios';
import { IProduct } from '../types/products'

const BASE_URL: string = 'https://dummyjson.com/'
const SEANS: number = 30
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

const instance = axios.create({
  baseURL: BASE_URL,
  headers: headers
});




export const restApi = {


    //products (done)
    async getCategoryList() {
      try {
        const responce = await instance.get('products/category-list')
        return responce.data
      } catch (err: any) {
        alert(err.message);
      }
    },
    async getAllProducts(skip: number, limit: number) {
        try {
          const responce = await instance.get(`products?limit=${limit}&skip=${skip}`)
          return responce.data
        } catch (err: any) {
          alert(err.message);
        }
    },
   async getSingleProduct(id: number) {
    try {
      const responce = await instance.get(`products/${id}`)
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },
  
  async getProductsByCategory(category: string) {
    try {
      const responce = await instance.get(`products/category/${category}?limit=100`)
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },
  async getCartByClient(id: number) {
    try {
      const responce = await instance.get(`carts/user/${id}`)
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },
  async searchProducts(query: string, limit: number, skip: number) {
    try {
      const responce = await instance.get(`products/search?q=${query}&limit=${limit}&skip=${skip}`)
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },
  async sortProducts(param: string, limit: number, skip: number) {
    try {
      const responce = await instance.get(`products?sortBy=${param}&order=asc&limit=${limit}&skip=${skip}`)
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },


  async updateProduct(id: number, body: any) {
    try {
      const responce = await instance.patch(`products/${id}`, JSON.stringify(body))
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },
  async deleteProduct(id: number) {
    try {
      const responce = await instance.delete(`products/${id}`)
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },
  async addProduct(body: IProduct) {
    try {
      const responce = await instance.post(`products/add`, JSON.stringify(body))
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },






  //posts (done)
  async getPostsAll(limit: number, skip: number) {
    try {
      const responce = await instance.get(`posts?limit=${limit}&skip=${skip}`)
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },
  async getPost(id: number) {
    try {
      const responce = await instance.get(`posts/${id}`)
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },
  async getUserPosts(id: number) {
    try {
      const responce = await instance.get(`users/${id}/posts`)
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },
  async getTagsAll() {
    try {
      const responce = await instance.get(`posts/tags`)
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },
  async getStringsTagsAll() {
    try {
      const responce = await instance.get(`posts/tag-list`)
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },
  async getPostsByTag(tag: string) {
    try {
      const responce = await instance.get(`posts/tag/${tag}?limit=100`)
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },
  async searchPosts(string: string) {
    try {
      const responce = await instance.get(`posts/search?q=${string}&limit=100`)
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },
  async addNewPost(body: IPostAdd) {
    try {
      const responce = await instance.post(`posts/add`, JSON.stringify(body))
      return responce.data
    } catch (err) {
      return 404
    }
  },





  //comments (done)
  async getPostsComments(id: number) {
    try {
      const responce = await instance.get(`posts/${id}/comments`)
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },
  async addNewComment(body: NewComment) {
    try {
      const responce = await instance.post(`comments/add`, JSON.stringify(body))
      if(responce.statusText === 'OK' || responce.statusText === 'Created') return responce.data
      else return 404
    } catch (err) {
      return 404
    }
  },



  //users (done)
  async getUsersAll(limit: number = 10, skip: number = 0) {
    try {
      const responce = await instance.get(`users?limit=${limit}&skip=${skip}`)
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },
  async getSingleUser(id: number) {
    try {
      const responce = await instance.get(`users/` + id)
      return responce.data
    } catch (err: any) {
      alert(err.message);
    }
  },
  async deleteUser(id: number) {
    try {
      const responce = await instance.delete(`users/` + id)
      if(responce.statusText === 'OK') {
        return {
          status: responce.status,
          isDeleted: responce.data.isDeleted,
        }
      } else return {status: 404}
    } catch (err) {
      return {status: 404}
    }
  },
  async addNewUser(info: NewClient) {
    try {
      const responce = await instance.post(`users/add`, JSON.stringify(info))
      if(responce.statusText === 'OK' || responce.statusText === 'Created') {
        return responce.data
      } else {
        return 404
      }
    } catch (err) {
      return 404
    }
  },
  async editUser(info: NewClient, id: number) {
    try {
      const responce = await instance.put(`users/` + id, JSON.stringify(info))
      if(responce.statusText === 'OK') return responce.data
      else return 404
    } catch (err) {
      return 404
    }
  },
  async searchUsers(name: string) {
    try {
      const responce = await instance.get(`users/search?q=` + name)
      return responce.data
    } catch (err) {
      return 404
    }
  },
  async filterUsers(key: string, value: string, isNested: boolean | string = false) {
    try {
      let responce
      if(isNested) responce = await instance.get(`users/filter?key=${isNested}.${key}&value=${value}&limit=208`)
      else responce = await instance.get(`users/filter?key=${key}&value=${value}&limit=208`)
      return responce.data
    } catch (err) {
      return 404
    }
  },







  //login (done)
  async login(username: string, password: string) {
    try {
      const responce = await instance.post(`auth/login`, JSON.stringify({username, password, expiresInMins: SEANS}))
      return responce.data
    } catch (err) {
      alert(err);
    }
  },
  async getAdmin(token: string) {
    try {
      const responce = await axios.get(`${BASE_URL}auth/me`, {
          headers: {...headers, 'Authorization': 'Bearer ' + token}
      })
      return {data: responce.data, SEANS}
    } catch (err) {
      alert(err);
    }
  },
  async refreshAuth(refreshToken: string) {
    try {
      const responce = await instance.post(`auth/refresh`, JSON.stringify({refreshToken, expiresInMins: SEANS}))
      return {data: responce.data, SEANS}
    } catch (err) {
      alert(err);
    }
  },



  //ip (done)
  async getMyIp() {
    try {
      const responce = await axios.get('https://api.ipify.org/')
      return responce.data
    } catch (err) {
      throw new Error("err");
    }
  }
}
