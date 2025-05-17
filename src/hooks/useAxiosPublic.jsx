import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://192.168.0.108:8080'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;