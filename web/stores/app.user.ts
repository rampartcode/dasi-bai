import { defineStore } from "pinia";

export type UserSession = {
  id: string;
  username: string;
  role: string;
  token: string;
  loggedAt: string;
};

export const useAppUser = defineStore("user", () => {
  const user = ref<UserSession | null>(null);

  const storeUser = (data: UserSession) => {
    user.value = data;
  };

  const logout = () => {
    user.value = null;
    authCookie.deleteToken();
  };

  return {
    user,
    storeUser,
    logout,
  };
});
