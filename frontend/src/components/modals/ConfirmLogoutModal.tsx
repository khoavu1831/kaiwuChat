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
    <div className="absolute -right-50 -top-20 overflow-hidden flex items-center justify-center z-50">
      <div className="flex flex-col divide-y-2 divide-basecolor/50 gap-2 rounded-2xl py-2 px-4 bg-brandcolor">
        {/* title */}
        <span className="py-2 px-4 text-white">Thực sự đăng xuất?</span>

        {/* buttons */}
        <div className="buttons-section flex gap-4 justify-center">
          <button
            onClick={() => handleLogout()}
            className="bg-brandcolor rounded-2xl px-4 py-2 text-black hover:text-red-500 cursor-pointer"
          >Yessir</button>

          <button
            onClick={() => onClose()}
            className="bg-red-500 rounded-2xl px-4 py-2 hover:scale-110 hover:text-brandcolor cursor-pointer"
          >Không</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmLogoutModal