import { Dispatch, SetStateAction } from 'react';


export interface IFolders {
  id: number;
  name: string;
  cards: ICards[]; 
}

export interface ICards {
  id?: number;
  inputValue?: string;
  outputValue?: string;
  isLearned?: boolean;
  languages: ILanguages;
}

export interface ILanguages {
    input: string,
    output: string,
}

export interface IAllFoldersContext {
  allFolders: IFolders[];
  setAllFolders: Dispatch<SetStateAction<IFolders[]>>;
}