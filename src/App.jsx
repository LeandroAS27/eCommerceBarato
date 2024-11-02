import './App.css'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'

//components
import { SearchProvider, SearchContext } from './context/SearchContext'
import Header from './components/Header'

//pages
import Home from './pages/Home'
import Offer from './pages/Offer'
import Checkout from './pages/Checkout'

function App() {
  

  return (
    <SearchProvider> {/* Garantindo que SearchProvider envolve toda a aplicação */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer/>} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  )
}

export default App

//Desafio da empresa Barato Coletivo 2019