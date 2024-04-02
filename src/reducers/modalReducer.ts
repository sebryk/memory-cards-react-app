interface IModalState {
  isModalOpen: boolean;
  modalInput: string;
  idEditedFolder: number | null;
}

type ModalAction =
  | { type: 'showModal' }
  | { type: 'closeModal' }
  | { type: 'handleChange'; payload: string }
  | { type: 'setIdEditedFolder'; payload: number | null };

const modalReducer = (state: IModalState, action: ModalAction) => {
  switch (action.type) {
    case 'showModal':
      return { ...state, isModalOpen: true };
    case 'closeModal':
      return { ...state, isModalOpen: false, modalInput: '', idEditedFolder: null };
    case 'handleChange':
      return { ...state, modalInput: action.payload };
    case 'setIdEditedFolder':
      return { ...state, idEditedFolder: action.payload };

    default:
      return state;
  }
};

export default modalReducer;
