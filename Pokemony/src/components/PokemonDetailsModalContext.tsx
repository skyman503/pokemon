import { createContext } from 'react';

const ShowModalContext = createContext({
  modalVisible: false,
  setModalVisible: () => {},
});

export default ShowModalContext;
