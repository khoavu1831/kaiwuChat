import { create } from "zustand";
import { UIStore } from '../types/store'

export const useUIStore = create<UIStore>((set, get) => ({
  activeId: null, // goi api dung string
  setActive: (id) => set({ activeId: id }),

  tab: "private",
  setTab: (tab) => set({ tab }),
}));