import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { IoRocketOutline } from "react-icons/io5";
import { PiChartLineUpBold } from "react-icons/pi";
import { MdSecurity } from "react-icons/md";
import { HiOutlineServer } from "react-icons/hi";
import { TbSettingsAutomation } from "react-icons/tb";
import { BsClipboardData, BsSearch } from "react-icons/bs";
import { LuDatabase } from "react-icons/lu";
import { FiFileText } from "react-icons/fi";

// export const servicesIcons = [
//   {
//     icon: AiOutlineFundProjectionScreen,
//     id: "IT řízení projektů",
//   },
//   {
//     icon: IoRocketOutline,
//     id: "Technická podpora",
//   },
//   {
//     icon: PiChartLineUp,
//     id: "IT poradenství",
//   },
//   {
//     icon: FaDatabase,
//     id: "Datové databáze",
//   },
//   {
//     icon: FaSearch,
//     id: "Analýza stávajících systémů",
//   },
//   {
//     icon: FaFileAlt,
//     id: "Podpora při sestavení technického zadání",
//   },
//   {
//     icon: BsClipboardData,
//     id: "Zpracování dat",
//   },
//   {
//     icon: TbSettingsAutomation,
//     id: "Automatizace procesů",
//   },
//   {
//     icon: SiGraphql,
//     id: "Integrace API",
//   },
//   {
//     icon: HiOutlineServer,
//     id: "Správa serverů",
//   },
//   {
//     icon: MdSecurity,
//     id: "Bezpečnost IT systémů",
//   },
// ];

export const servicesIcons = {
  "IT poradenství": PiChartLineUpBold,
  "Datové databáze": LuDatabase,
  "Analýza stávajících systémů": BsSearch,
  "Podpora při sestavení technického zadání": FiFileText,
  "IT řízení projektů": AiOutlineFundProjectionScreen,
  "Zpracování dat": BsClipboardData,
  "Automatizace procesů": TbSettingsAutomation,
  "Správa serverů": HiOutlineServer,
  "Technická podpora": IoRocketOutline,
  "Bezpečnost IT systémů": MdSecurity,
};

export const servicesData = [
  {
    id: 1,
    title: " IT řízení projektů",
    text: "Hladký průběh IT projektů od začátku do konce s důrazem na koordinaci, řízení rizik a dodržení termínů i rozpočtů.",
  },

  {
    id: 2,
    title: "Datové databáze",
    text: "Komplexní služby v oblasti datové analýzy a implementace (SQL či PowerBI.",
  },
  {
    id: 3,
    title: "IT poradenství",
    text: "Nezávislé a fundované poradenství pro definování IT strategie, výběr technologií a optimalizaci stávajících systémů",
  },
  {
    id: 4,
    title: "Analýza stávajících systémů",
    text: "Důkladná analýza IT systémů s návrhy na modernizaci a zlepšení.",
  },
  {
    id: 5,
    title: "Podpora při sestavení technického zadání",
    text: "Usnadnění přípravy komplexních technických zadání pro nové projekty a aplikace",
  },
  {
    id: 6,
    title: "Technická podpora",
    text: "Spolehlivá technická podpora pro vaše IT systémy a aplikace",
  },
];
