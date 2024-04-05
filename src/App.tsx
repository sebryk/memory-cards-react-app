import {FC, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Editor from './pages/Editor'
import Folder from './pages/Folder';
import AllFolders from './pages/AllFolders';
import { AllFoldersContext } from './context/allFoldersContext';
import { IFolders } from './types/types';
import NotFound from './pages/NotFound';


const App: FC = () => {
  
  const storedFolders = localStorage.getItem('allFolders');
  const initialFolders: IFolders[] = storedFolders ? JSON.parse(storedFolders) : [];
  // Shared state with data from local storage between pages
  const [allFolders, setAllFolders] = useState<IFolders[]>(initialFolders);

  

  return (
    <AllFoldersContext.Provider value={{ allFolders, setAllFolders }}>
      <Routes>
        <Route path='/' element={<AllFolders />} />
        <Route path=':id' element={<Folder />} />
        <Route path=':id/editor' element={<Editor />}>
          <Route path=':index' element={<Editor />} />
        </Route>
        <Route path='*' element={<NotFound/>} />
        <Route path='not-found' element={<NotFound/>}/>
      </Routes>
   </AllFoldersContext.Provider>
  )
}

export default App
