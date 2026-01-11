import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../stores/useAuthStore"
import { useEffect, useState } from "react";

function ProtectedRoute() {
  const { accessToken, user, loading, refresh, fetchMe } = useAuthStore();
  const [starting, setStarting] = useState(true);

  const init = async () => {
    if (!accessToken) {
      await refresh();
    }

    if (accessToken && !user) {
      await fetchMe();
    }

    setStarting(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (starting || loading) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          loading..
        </div>
      </>
    )
  }

  if (!accessToken) {
    console.warn("ProtecedRoute: Đăng nhập mới vào được!");

    return (
      <Navigate
        to={'/signin'}
        replace // không cho phép nhấn nút quay lại trang trước
      />
    )
  }

  return (
    <Outlet></Outlet> // bọc thẻ con bên trong: nếu đăng nhập thành công thì vào thẻ route con trong nó,
  )
}

export default ProtectedRoute