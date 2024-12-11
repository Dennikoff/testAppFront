import { RouterProvider } from 'react-router-dom'
import styles from './App.module.scss';
import router from './router'

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
