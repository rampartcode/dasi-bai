import type { User } from "@/stores/app.user.ts";

export default defineNuxtRouteMiddleware(async (from, to) => {
  const token = authCookie.getToken();

  if (!token) {
    return;
  } else {
    try {
      const { data, status } = await useMyFetch<User>("auth/user-logged", {
        method: "GET",
      });

      if (status.value !== "success") {
        authCookie.deleteToken();
        return;
      }

      useAppUser().storeUser(data.value);
      if (data.value.isConfigure) {
        return navigateTo("/app/config", { replace: true });
      }

      return navigateTo("/app", { replace: true });
    } catch (error) {
      authCookie.deleteToken();
      return navigateTo("/auth/login", { replace: true });
    }
  }
});
