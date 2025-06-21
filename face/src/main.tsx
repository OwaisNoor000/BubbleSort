import './style.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import AppDataProvider, { AppContext } from './contexts/MessagesProvider';
import AppRoutes from './routes/Route';
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {

  return(
        <div >
          <AppRoutes/>
        </div>
  )
}


ReactDOM.createRoot(document.getElementById('app')!).render(
      <React.StrictMode>
        <QueryClientProvider client = {queryClient}>
            <AppDataProvider>
                <App />
            </AppDataProvider>
          </QueryClientProvider>
      </React.StrictMode>
);
