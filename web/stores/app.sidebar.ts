export const useAppSidebarStore = defineStore("sidebar", () => {
  const isScrolledDown = ref<boolean>(false);

  const onScroll = (value) => {
    isScrolledDown.value = value;
  };

  return {
    isScrolledDown,
    onScroll,
  };
});

const sidebarlist = [
  {
    isTitle: false,
    name: "Dashboard",
    url: "/",
    icon: "",
    submenu: [
      {
        isTitle: false,
        name: "Visão Geral",
        url: "/",
        icon: "",
        submenu: [],
      },
      {
        isTitle: false,
        name: "Analitíco",
        url: "/",
        icon: "",
        submenu: [],
      },
    ],
  },
  {
    isTitle: false,
    name: "Ferramentas",
    url: "/",
    icon: "",
    submenu: [
      {
        isTitle: false,
        name: "Adicionar Indicador",
        url: "/",
        icon: "",
        submenu: [],
      },
      {
        isTitle: false,
        name: "Harmony Email & Colaboration",
        url: "/",
        icon: "",
        submenu: [],
      },
      {
        isTitle: false,
        name: "DarkTrace",
        url: "/",
        icon: "",
        submenu: [],
      },
      {
        isTitle: false,
        name: "PortNox",
        url: "/",
        icon: "",
        submenu: [],
      },
      {
        isTitle: false,
        name: "Imperva WAF",
        url: "/",
        icon: "",
        submenu: [],
      },
      {
        isTitle: false,
        name: "CloudApp Security",
        url: "/",
        icon: "",
        submenu: [],
      },
      {
        isTitle: false,
        name: "CheckPoint Firewall",
        url: "/",
        icon: "",
        submenu: [],
      },
      {
        isTitle: false,
        name: "Palo Alto",
        url: "/",
        icon: "",
        submenu: [],
      },
      {
        isTitle: false,
        name: "Insights",
        url: "/",
        icon: "",
        submenu: [],
      },
      {
        isTitle: false,
        name: "Data Lost Email",
        url: "/",
        icon: "",
        submenu: [],
      },
      {
        isTitle: false,
        name: "Line Chart",
        url: "/",
        icon: "",
        submenu: [],
      },
      {
        isTitle: false,
        name: "CrowdsTrike (Mitigação)",
        url: "/",
        icon: "",
        submenu: [],
      },
      {
        isTitle: false,
        name: "Office Security",
        url: "/",
        icon: "",
        submenu: [],
      },
    ],
  },
  {
    isTitle: true,
    name: "Categorias",
    url: "",
    icon: "",
    submenu: [
      {
        isTitle: false,
        name: "Segurança de Rede",
        url: "/",
        icon: "",
        submenu: [],
      },
      {
        isTitle: false,
        name: "Proteção de Dados",
        url: "/",
        icon: "",
        submenu: [],
      },
      {
        isTitle: false,
        name: "Segurança de Rede",
        url: "/",
        icon: "",
        submenu: [],
      },
    ],
  },
  {
    isTitle: false,
    name: "Adicionar Indicador",
    url: "/",
    icon: "",
    submenu: [],
  },
  {
    isTitle: false,
    name: "Harmony Email & Colaboration",
    url: "/",
    icon: "",
    submenu: [],
  },
  {
    isTitle: false,
    name: "DarkTrace",
    url: "/",
    icon: "",
    submenu: [],
  },
  {
    isTitle: false,
    name: "PortNox",
    url: "/",
    icon: "",
    submenu: [],
  },
  {
    isTitle: false,
    name: "Imperva WAF",
    url: "/",
    icon: "",
    submenu: [],
  },
  {
    isTitle: false,
    name: "CloudApp Security",
    url: "/",
    icon: "",
    submenu: [],
  },
  {
    isTitle: false,
    name: "CheckPoint Firewall",
    url: "/",
    icon: "",
    submenu: [],
  },
  {
    isTitle: false,
    name: "Palo Alto",
    url: "/",
    icon: "",
    submenu: [],
  },
  {
    isTitle: false,
    name: "Insights",
    url: "/",
    icon: "",
    submenu: [],
  },
  {
    isTitle: false,
    name: "Data Lost Email",
    url: "/",
    icon: "",
    submenu: [],
  },
  {
    isTitle: false,
    name: "Line Chart",
    url: "/",
    icon: "",
    submenu: [],
  },
  {
    isTitle: false,
    name: "CrowdsTrike (Mitigação)",
    url: "/",
    icon: "",
    submenu: [],
  },
  {
    isTitle: false,
    name: "Office Security",
    url: "/",
    icon: "",
    submenu: [],
  },
];

// INTSIGHTS
// Data Lost Email
// Line Chart
// CrowdsTrike (Mitigação)
// Office Security
// CATEGORIAS
// Segurança de Rede
// Proteção de Dados
// Segurança na Cloud
// Mobile Security
// Media Security
// ORIGEM
// Interna
// Externa
// CONFIURAÇÕES
// Integrações
// Documentação
// Suporte
