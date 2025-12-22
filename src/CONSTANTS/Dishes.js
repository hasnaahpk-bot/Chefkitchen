import menu from "../assets/menu_img.svg";
import menu2 from "../assets/menu_img2.svg";
import menu3 from "../assets/menu_img3.svg";
import menu5 from "../assets/menu_img5.svg";
import menu6 from "../assets/menu_img6.svg";



/* ---------------- dishes ---------------- */
export const DISHES = [
  {
    id: "dish-1",
    title: "Healthy noodle with spinach leaf",
    oldPrice: 28,
    prices: {
              S: 25,
              M: 30,
              L: 35,
            },
sizes: ["S", "M", "L"],
bowls: {
  S: 10,
  M: 6,
  L: 3,
},
    img: menu,
    category: "our", // today | south | our
    type: "takeaway",
  },
  {
    id: "dish-2",
    title: "Spicy instant noodle with omelette",
    prices: {
  S: 25,
  M: 30,
  L: 35,
},
bowls: {
  S: 10,
  M: 6,
  L: 3,
},
sizes: ["S", "M", "L"],
    img: menu2,
    category: "today", // today | south | our
    type: "dine-in",
  },
  {
    id: "dish-3",
    title: "Healthy noodle with spinach leaf",
    oldPrice: 30,
    prices: {
  S: 25,
  M: 30,
  L: 35,
},
bowls: {
  S: 10,
  M: 6,
  L: 3,
},
sizes: ["S", "M", "L"],
    img: menu3,
    category: "today", // today | south | our
    type: "dine-in",
  },
  {
    id: "dish-4",
    title: "Hot spicy fried rice",
    prices: {
  S: 25,
  M: 30,
  L: 35,
},
bowls: {
  S: 10,
  M: 6,
  L: 3,
},
sizes: ["S", "M", "L"],
    img: menu5,
    category: "today", // today | south | our
    type: "takeaway",
  },
  {
    id: "dish-5",
    title: "Healthy noodle with spinach leaf",
    prices: {
  S: 25,
  M: 30,
  L: 35,
},
bowls: {
  S: 10,
  M: 6,
  L: 3,
},
sizes: ["S", "M", "L"],
    img: menu,
    category: "south", // today | south | our
    type: "dine-in",
  },
  {
    id: "dish-6",
    title: "Spicy instant noodle",
    oldPrice: 27,
    prices: {
  S: 25,
  M: 30,
  L: 35,
},
bowls: {
  S: 10,
  M: 6,
  L: 3,
},
sizes: ["S", "M", "L"],
    img: menu6,
    category: "our", // today | south | our
    type: "takeaway",
  },
  {
    id: "dish-7",
    title: "Spicy instant noodle with omelette",
    prices: {
  S: 25,
  M: 30,
  L: 35,
},
bowls: {
  S: 10,
  M: 6,
  L: 3,
},
sizes: ["S", "M", "L"],
    img: menu2,
    category: "south", // today | south | our
    type: "dine-in",
  },
  {
    id: "dish-8",
    title: "Healthy noodle with spinach leaf",
    prices: {
  S: 25,
  M: 30,
  L: 35,
},
bowls: {
  S: 10,
  M: 6,
  L: 3,
},
sizes: ["S", "M", "L"],
    img: menu3,
    category: "our", // today | south | our
    type: "takeaway",
  },
];