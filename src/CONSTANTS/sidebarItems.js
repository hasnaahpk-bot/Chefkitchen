// ✅ VITE + SVGR CORRECT IMPORTS
import HomeIcon from "../assets/home_icon.svg?react";
import OfferIcon from "../assets/offer.svg?react";
import LikeIcon from "../assets/like.svg?react";
import MaleIcon from "../assets/male.svg?react";
import NotifyIcon from "../assets/notify.svg?react";


 export const SIDEBAR_ITEMS = [
    { Icon: HomeIcon, alt: "Home", path:"/home" },
    { Icon: OfferIcon, alt: "Offers", path:"/offer" },
    { Icon: LikeIcon, alt: "Likes", path:"/like" },
    { Icon: MaleIcon, alt: "Profile", path:"/mail" },
    { Icon: NotifyIcon, alt: "Notifications", path:"/notify" },
  ];