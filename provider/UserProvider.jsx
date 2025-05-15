import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

//  const axiosPublic = useAxiosPublic();

//   const login = async (emailOrNumber, pin) => {
//     const response = await axiosPublic.post('/login', { emailOrNumber, pin });
//     localStorage.setItem('token', response.data.token);
//     localStorage.setItem('type', response.data.type);
//     localStorage.setItem('credential', emailOrNumber);
//     // setUser({ credential: emailOrNumber });

//     console.log(response.data);
    

//     return response.data;
    
//   };

  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };