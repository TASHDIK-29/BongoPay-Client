import { useState, useEffect, useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../../provider/UserProvider";


const useMoneyMap = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const {user} = useContext(AuthContext);



    const fetchData = async () => {
        setIsLoading(true);
        try {
            const axiosPublic = useAxiosPublic();
            // console.log("Email from hook = ", email);
            // const response = await axiosPublic.post('https://expense-recommendation.onrender.com/recommend', {"user_id" : 1});

            const response = await axiosPublic.post(
                'https://expense-recommendation.onrender.com/recommend',
                { user_id: user?.ID },
                { headers: { 'Content-Type': 'application/json' } }
            );
            // console.log("Data from hook = ", response.data);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log("Error from hook = ", error);
            setError(error);
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

export default useMoneyMap;