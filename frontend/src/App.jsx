import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/Admin';
import UserDashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
function App() {

  return (
    <>
      <Routes>
        <Route element={<PublicLayout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Route>

        <Route element={<PrivateLayout/>}>
          <Route path="/admin" element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard/>
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute role="USER">
              <UserDashboard/>
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </>
  )
}

export default App
