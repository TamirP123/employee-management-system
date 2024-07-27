import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import App from './App.jsx';
import Homepage from './pages/Homepage.jsx';
import Login from './pages/Login.jsx'
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import LogsPage from './pages/LogsPage.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Homepage />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/employees',
        element: <EmployeeDashboard />
      }, {
        path: '/logs',
        element: <LogsPage />
      },
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
