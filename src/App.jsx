import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Translator from './pages/Translator'
import Card from './pages/Card';
import AllCards from './pages/AllCards';


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<AllCards/>}/>
      <Route path='cards' element={<Card/>}/>
      <Route path='/cards/translator' element={<Translator/>}/>
    </Routes>
    </BrowserRouter>

  )
}

export default App
