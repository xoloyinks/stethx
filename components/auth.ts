import Cookies from "js-cookie";

const auth = () => {
    const active = Cookies.get('token');
    if(!active){
      window.location.href = '/login'
      return;
    }
}

export default auth;