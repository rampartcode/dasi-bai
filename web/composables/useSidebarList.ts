import { House, ChevronRight, ChevronRight } from "lucide-vue-next";

export function useSidebarList() {
  const sidebarItems = [
    {
      isTitle: false,
      name: "Dashboard",
      icon: House,
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
      icon: ChevronRight,
      subItems: [],
    },
    {
      isTitle: false,
      name: "CheckPoint",
      link: "/app/tools/checkpoint",
      icon: ChevronRight,
      subItems: [],
    },
    {
      isTitle: false,
      name: "DarkTrace",
      link: "/app/tools/darktrace",
      icon: ChevronRight,
      subItems: [],
    },
    {
      isTitle: false,
      name: "Imperva",
      link: "/app/tools/imperva",
      icon: ChevronRight,
      subItems: [],
    },
    {
      isTitle: false,
      name: "Palo Alto",
      link: "/app/tools/paloalto",
      icon: ChevronRight,
      subItems: [],
    },
    // {
    //   isTitle: false,
    //   name: "Portnox",
    //   link: "#",
    //   icon: ChevronRight,
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
