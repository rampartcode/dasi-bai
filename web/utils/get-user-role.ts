export function getUserRole(role: string): string {
  const roles: { [key: string]: string } = {
    admin: "Admin",
    super_analist: "Supervisor",
    analist: "Analista",
    executive: "Executivo",
  };

  return roles[role] || "Unknown Role";
}
