import { createContext}  from 'react';
import { IFolders } from '../types/types';
import { IAllFoldersContext } from '../types/types';



export const AllFoldersContext = createContext<IAllFoldersContext | null>(null);
