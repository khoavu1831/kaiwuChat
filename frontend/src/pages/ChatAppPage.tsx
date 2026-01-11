import Logout from "../components/auth/Logout"
import api from "../libs/axios";
import { useAuthStore } from "../stores/useAuthStore"

function ChatAppPage() {
  const user = useAuthStore((s) => s.user);

  const handleClick = async () => {
    try {
      await api.get('/user/test', { withCredentials: true });
      console.log("THOI GIAN CON: OKE");
    } catch (error) {
      console.log("THOI GIAN HET!!!!");
    }
  }
  return (
    <>
      {user?.username}
      <h1>chatapppage</h1>
      <Logout />

      <button onClick={handleClick} className="bg-black text-white">
        TEST TIME
      </button>
    </>
  )
}

export default ChatAppPage