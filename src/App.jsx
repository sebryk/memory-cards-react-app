import React, {useState} from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import './App.css'
import Editor from './pages/Editor'
import Folder from './pages/Folder';
import AllFolders from './pages/AllFolders';


function App() {
  const storedFolders = localStorage.getItem('allFolders');
  const initialFolders = storedFolders ? JSON.parse(storedFolders) : [];
  // Shared state with data from local storage between pages
  const [allFolders, setAllFolders] = useState(initialFolders);

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<AllFolders allFolders={allFolders} setAllFolders={setAllFolders}/>}/>
        <Route path=':id' element={<Folder allFolders={allFolders} setAllFolders={setAllFolders}/>}/>
        <Route path=':id/editor/' element={<Editor allFolders={allFolders} setAllFolders={setAllFolders}/>}/>
        <Route path=':id/editor/:index' element={<Editor allFolders={allFolders} setAllFolders={setAllFolders}/>}/>
        <Route path='*' element={<h1>Not found</h1>} />
      </Routes>
    </HashRouter>

  )
}

export default App
