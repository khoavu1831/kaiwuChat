import { create } from 'zustand'
import { authService } from '../services/authService.js';
import { AuthState } from '../types/store.js';

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

  clearState: () => {
    set({ accessToken: null, user: null, loading: false })
  },

  signUp: async (username, password, email, firstName, lastName) => {
    try {
      set({ loading: true });
      // call api
      await authService.signUp(username, password, email, firstName, lastName);

      console.log("Đăng kí thành công");
    } catch (error) {
      console.error("Đăng kí thất bại", error);
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (username, password) => {
    try {
      set({ loading: true });

      const { accessToken } = await authService.signIn(username, password);

      get().setAccessToken(accessToken);

      // gọi fetchMe sau khi đăng nhập
      await get().fetchMe();

      console.log("Đăng nhập thành công");

    } catch (error) {
      console.error("Đăng nhập thất bại", error);
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      get().clearState();
      await authService.signOut();
      console.log("Đăng xuất thành công");

    } catch (error) {
      console.error("Đăng xuất thất bại", error);
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true });

      const user = await authService.fetchMe();

      set({ user });

      console.log("Tải dữ liệu người dùng: thành công");
    } catch (error) {
      set({ accessToken: null, user: null });
      console.error("Tải dữ liệu người dùng: thất bại", error);
    } finally {
      set({ loading: false });
    }
  },

  refresh: async () => {
    try {
      set({ loading: true });
      const { user, fetchMe, setAccessToken } = get();
      const accessToken = await authService.refresh();

      setAccessToken(accessToken);

      if (!user) {
        await fetchMe();
      }
      console.log("Refresh thành công");
    } catch (error) {
      console.error("Refresh thất bại / Phiên đăng nhập hết hạn - vui lòng đăng nhập lại", error);
      get().clearState();
    } finally {
      set({ loading: false });
    }
  }
}));