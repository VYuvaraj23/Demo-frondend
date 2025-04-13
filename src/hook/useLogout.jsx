import { useNavigate } from "react-router";

function useLogout() {
  console.log("log")
  const navigate = useNavigate()
  return () => {
    sessionStorage.clear()
    navigate('/')
  }
}

export default useLogout