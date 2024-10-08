import { defineStore } from "pinia";

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  roles: string;
  isConfigure: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export const useAppUser = defineStore("user", () => {
  const user = ref<User | null>(null);

  const storeUser = (data: User | null) => {
    user.value = data;
  };

  const logout = () => {
    authCookie.deleteToken();
    user.value = null;
  };

  return {
    user,
    storeUser,
    logout,
  };
});
