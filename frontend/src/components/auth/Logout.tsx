import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router'; 
function Logout() {

  const { signOut } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <button className="h-10 w-30 border bg-black text-white" onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Logout