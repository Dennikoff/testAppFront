import { RouterProvider } from 'react-router-dom'
import router from './router'
import { PrimeReactProvider } from 'primereact/api';
import '@/static/styles/index.scss';
import "primereact/resources/themes/lara-light-blue/theme.css";
import { useEffect } from 'react';
import { getAuth } from './api';

function App() {
  useEffect(() => {
    getAuth();
  }, [])
  return (
    <PrimeReactProvider>
      <RouterProvider router={router}/>
    </PrimeReactProvider>
  )
}

export default App
