import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import App from './App.jsx';
import Homepage from './pages/Homepage.jsx';
import Login from './pages/Login.jsx'
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import LogsPage from './pages/LogsPage.jsx';
import CreateEmployee from './pages/CreateEmployee.jsx';
import RequestTimeOff from './pages/RequestTimeOff.jsx';
import TimeOffRequests from './pages/TimeOffRequests.jsx';
import ViewRequests from './pages/ViewRequests.jsx';
import ViewProfile from './pages/ViewProfile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';



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
        element: <ProtectedRoute element={<LogsPage/>} isAdminRoute={true} />

      }, {
        path: '/create-employee',
        element: <ProtectedRoute element={<CreateEmployee />} isAdminRoute={true} />
      }, {
        path: '/request-time-off',
        element: <RequestTimeOff />
      }, {
        path: '/time-off-requests',
        element: <ProtectedRoute element={<TimeOffRequests />} isAdminRoute={true} />
      }, {
        path: '/view-requests',
        element: <ViewRequests />
      }, {
        path: '/view-profile',
        element: <ViewProfile />
      },
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
