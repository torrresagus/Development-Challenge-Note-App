import React from 'react';
import Modal from 'react-modal';
import NavigationBar from './components/Navbar';
import NoteList from './components/NoteList';

Modal.setAppElement('#root');

const App = () => {
  return (
    <div>
      <NavigationBar/>
      <NoteList/>
    </div>
  );
};

export default App;
