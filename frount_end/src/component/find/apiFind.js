import axios from 'axios';

const base_url = 'http://localhost:8080/Certificate';

const apiService = {
  searchCandidate: async (params) => {
    try {
      const response = await axios.get(`${base_url}/search`, { params });
      return response;
    } catch (error) {
      console.error('Error fetching candidate:', error);
      throw error;
    }
  },
  async getAllCandidates() {
    try {
      const response = await axios.get(base_url);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async deleteByCandidate(id){

    try{
       await axios.delete(`${base_url}/${id}`)
      return null;
    }catch(error){
      console.log("error deleting candidate !!",error)
      throw error;
    }
  },
  
  async updatecandidate (id ,update){
    try{
      const response = await axios.put(`${base_url}/${id}`,update);
      return response;
    }catch(error){
      throw error;

    }
  }
}

export default apiService;
