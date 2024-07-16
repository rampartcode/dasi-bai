import type { UserSession } from "@/stores/app.user.ts";

export default defineNuxtRouteMiddleware(async (from, to) => {
  // const user = useAppUser().user;
  // const token = authCookie.getToken();

  // if (!token) {
  //   authCookie.deleteToken();
  //   return navigateTo("/auth/login", { replace: true });
  // } else {
  //   if (!user) {
  //     try {
  //       const { data, status } = await useMyFetch("auth/user-logged", {
  //         method: "GET",
  //       });

  //       if (status.value !== "success") {
  //         authCookie.deleteToken();
  //         return navigateTo("/auth/login", { replace: true });
  //       }

  //       useAppUser().storeUser(data.value);
  //     } catch (error) {
  //       authCookie.deleteToken();
  //       return navigateTo("/auth/login", { replace: true });
  //     }
  //   }
  // }

  return;
});
