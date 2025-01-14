import {
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YouTubeIcon,
} from "@/components/Icons";

export const orderStatus = {
  waiting_payment: "waiting_payment",
  paid: "paid",
  canceled: "canceled",
  shipping: "shipping",
  delivered: "delivered",
};

export const headerLinks = [
  { name: "Ínicio", href: "/" },
  { name: "Todos os produtos", href: "/products" },
  { name: "Contato", href: "/contact" },
  { name: "Rastreio", href: "/rastreio" },
];

export const departments = [
  { name: "FAQ - Perguntas", href: "/" },
  { name: "Política de privacidade", href: "/" },
  { name: "Prazos de envio e entregas", href: "/" },
  { name: "Política de reembolso", href: "/" },
  { name: "Termos e condições", href: "/" },
];

export const socialLinks = [
  { icon: InstagramIcon, href: "/" },
  { icon: TwitterIcon, href: "/" },
  { icon: YouTubeIcon, href: "/" },
  { icon: LinkedinIcon, href: "/" },
];

export const sizeList = [
  { name: "P", value: "p" },
  { name: "M", value: "m" },
  { name: "G", value: "g" },
  { name: "GG", value: "gg" },
  { name: "GGG", value: "ggg" },
];

export const categorieList = [
  { name: "De jogador para jogador", value: "player_to_player" },
  { name: "Clubes brasileiros", value: "brazilian_club" },
  { name: "Clubes europeus", value: "europeans_club" },
  { name: "Mantos da seleção", value: "selection_robes" },
  { name: "Seção infantil", value: "children" },
  { name: "Seção feminina", value: "feminine" },
  { name: "Coleção de jogador", value: "player_collection" },
  { name: "Coleção Torcedor", value: "supporter_collection" },
];

export const createProductInputs = [
  {
    name: "tech",
    label: "Tecnologia",
    placeholder: "Digite a tecnologia da roupa",
  },
  {
    name: "gender",
    label: "Gênero",
    placeholder: "Selecione",
  },
  {
    name: "cor",
    label: "Cor predominante",
    placeholder: "Digite a cor",
  },
  {
    name: "club",
    label: "Clube/seleção",
    placeholder: "Digite o clube",
  },
  {
    name: "indicate_for",
    label: "Indicada para?",
    placeholder: "Indicada para",
  },
  {
    name: "sleeve",
    label: "Manga",
    placeholder: "Selecione",
  },
  {
    name: "collar",
    label: "Gola",
    placeholder: "Digite como é a gola",
  },
  {
    name: "composition",
    label: "Composição",
    placeholder: "Composição do produto",
  },
];
