export const canActive = (roles: string[]) => {
  const user = useAppUser().user;

  return roles.includes(user.roles);
};
