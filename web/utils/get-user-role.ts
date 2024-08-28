export function getUserRole(role: string): string {
  if (role === "admin") {
    return "Admin";
  } else if (role === "super_analist") {
    return "Supervisor";
  } else if (role === "analista") {
    return "Analista";
  } else {
    return "Executivo";
  }
}
