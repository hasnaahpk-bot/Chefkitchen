import React from "react";
import Landingpg from "./components/Landingpg";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Offer from "./components/Offer";
import Wishlist from "./components/Wishlist";
import Mail from "./components/Mail";
import Notify from "./components/Notify";

// TODO : Create a sperate folder under the src named "CONSTANTS" and move all the constants to that folder
// TODO : Remove unused imports and variable that will causes the performance issue
// TODO : Split this component into smaller components and move them , To make the code more clean
// TODO : Need to sepreate the logic
// TODO : Make the Empty dish text ["No dishes match your selection"] to the ceneter of the screen
// TODO : Use context here for the state management

// TODO : Create a seperate folder for pages and move the pages from the components
// TODO : Make this entire application responsive [ The list layout won't break in each screen ]

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landingpg />} />
        <Route path="/home" element={<Home />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/like" element={<Wishlist />} />
        <Route path="/mail" element={<Mail />} />
        <Route path="/notify" element={<Notify />} />
      </Routes>
    </div>
  );
};

export default App;
