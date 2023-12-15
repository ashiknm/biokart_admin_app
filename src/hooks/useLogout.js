import useAuth from "./useAuth";

const useLogout = () =>{
    const {setAuth} = useAuth();
    const logout = async () =>{
        setAuth({});
        localStorage.removeItem('refreshToken');
       
    }

    return logout;
}

export default useLogout;