export function useSidebarList() {
  const sidebarItems = [
    {
      isTitle: false,
      name: "Dashboard",
      icon: "bx:home-circle",
      link: "/",
      subItems: [],
    },
    {
      isTitle: true,
      name: "Ferramentas",
      icon: "",
      link: "#",
      subItems: [],
    },
    {
      isTitle: false,
      name: "AD Audit",
      link: "/app/tools/ad-audit",
      icon: "bx:radio-circle",
      subItems: [],
    },
    {
      isTitle: false,
      name: "CheckPoint",
      link: "/app/tools/checkpoint",
      icon: "bx:radio-circle",
      subItems: [],
    },
    {
      isTitle: false,
      name: "DarkTrace",
      link: "/app/tools/darktrace",
      icon: "bx:radio-circle",
      subItems: [],
    },
    {
      isTitle: false,
      name: "Imperva",
      link: "/app/tools/imperva",
      icon: "bx:radio-circle",
      subItems: [],
    },
    {
      isTitle: false,
      name: "Palo Alto",
      link: "/app/tools/paloalto",
      icon: "bx:radio-circle",
      subItems: [],
    },
    // {
    //   isTitle: false,
    //   name: "Portnox",
    //   link: "#",
    //   icon: "bx:radio-circle",
    //   subItems: [],
    // },
    {
      isTitle: true,
      name: "Configurações",
      icon: "",
      link: "",
      subItems: [],
    },
  ];

  return sidebarItems;
}
