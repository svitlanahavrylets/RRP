import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { TfiLinkedin } from "react-icons/tfi";
import { IoLogoWhatsapp } from "react-icons/io5";

const iconLinkedin = <TfiLinkedin />;
const iconInstagram = <FaInstagram />;
const iconFacebook = <FaFacebookF />;
const iconYoutube = <FaYoutube />;
const iconWhatsApp = <IoLogoWhatsapp />;

export const socialIcons = [
  {
    icon: iconLinkedin,
    id: "linkedin",
  },
  {
    icon: iconInstagram,
    id: "instagram",
  },

  {
    icon: iconYoutube,
    id: "youtube",
  },
  {
    icon: iconWhatsApp,
    id: "whatsapp",
  },
  {
    icon: iconFacebook,
    id: "facebook",
  },
];
