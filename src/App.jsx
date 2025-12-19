import React from 'react'
import Landingpg from './components/Landingpg'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Offer from './components/Offer'
import Wishlist from './components/Wishlist'
import  Mail  from './components/Mail'
import Notify from './components/Notify'

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
  )
}

export default App
