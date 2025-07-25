import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './context/AppContext.jsx';
import {MotionConfig} from "motion/react";
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <MotionConfig viewport={{once: true}}>
        <App />
      </MotionConfig>
    </AppContextProvider>
  </BrowserRouter>
)
