import { jwtDecode } from "jwt-decode";

const FetchUserByToken = (token) => {

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false
  }

}

export default FetchUserByToken;
