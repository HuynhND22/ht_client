import axiosClient from '../config/axiosClient'
 
  const getPosts = async () => {
    const res = await axiosClient.get("/posts/all");
    return res.data;
  }

export default {getPosts}