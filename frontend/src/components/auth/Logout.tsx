import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router';
import ConfirmLogoutModal from '../modals/ConfirmLogoutModal';
import { useState } from 'react';
function Logout() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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
      <div className="flex justify-center items-center pr-4">
        <button
          onClick={() => setShowConfirmModal(true)}
          className="group hover:bg-red-500 cursor-pointer p-2 rounded-xl transition-all duration-500"
        >
          <i className="fa-solid fa-arrow-right-from-bracket group-hover:text-white text-brandcolor"></i>
        </button>
      </div>

      <ConfirmLogoutModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
      />
    </>
  )
}

export default Logout