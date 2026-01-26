import { useAuthStore } from "../../stores/useAuthStore";

interface ConfirmLogoutModalProps {
  isOpen: boolean,
  onClose: () => void
}

function ConfirmLogoutModal({ isOpen, onClose }: ConfirmLogoutModalProps) {
  const { signOut } = useAuthStore();
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="flex gap-10">
        <button
          onClick={() => handleLogout()}
          className="bg-white p-10">yes</button>
        <button 
        onClick={onClose}
        className="bg-red-500 p-10">no</button>
      </div>
    </div>
  )
}

export default ConfirmLogoutModal