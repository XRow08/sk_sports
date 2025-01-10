import { IUser } from "@/interfaces";
import { create } from "zustand";

export interface useAuthStore {
  user: IUser | undefined;
  setUser: (e: IUser | undefined) => void;
  showAuth: boolean;
  setShowAuth: (e: boolean) => void;
  isAnimate: boolean;
  setIsAnimate: (e: boolean) => void;
  stepAuth: number;
  setStepAuth: (e: number) => void;
  email: string;
  setEmail: (e: string) => void;
}

export const useAuthStore = create<useAuthStore>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
  showAuth: false,
  setShowAuth: (showAuth) => set({ showAuth }),
  isAnimate: false,
  setIsAnimate: (showAuth) => set({ showAuth }),
  stepAuth: 0,
  setStepAuth: (stepAuth) => set({ stepAuth }),
  email: "",
  setEmail: (email) => set({ email }),
}));
