import { useState, useEffect } from "react";
import useAxiosPublic from "./useAxiosPublic";


const useFetchInbox = ({ email }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);



    const fetchData = async () => {
        setIsLoading(true);
        try {
            const axiosPublic = useAxiosPublic();
            // console.log("Email from hook = ", email);
            const response = await axiosPublic.get(`/inbox?userEmail=${email}`);
            // console.log("Data from hook = ", response.data);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log("Error from hook = ", error);
            setError(error);
            alert("There is an error")
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };

}

export default useFetchInbox;