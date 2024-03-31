import './App.css';
import React, {useContext} from 'react';
import Drawer from './app/ui/Drawer';
import LoginForm from './app/ui/LoginForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider,AppContext } from './context/AppContext';
import AppRoutes from './context/AppRoutes';


function App() {

  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;


