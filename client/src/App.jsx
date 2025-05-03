import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/landing-page/HomePage'
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'
import NotFound from './pages/auth/NotFound'
import Unauthorized from './pages/auth/Unauthorized'
import ProtectedRoutes from './components/ProtectedRoute'
import DashBoardHome from './pages/customer/DashBoardHome'
import AdminHome from './pages/admin/AdminHome'
import AdminLayout from './layouts/AdminLayout'
import CustomerLayout from './layouts/CustomerLayout'



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/unauthorized' element={<Unauthorized/>}/>
        <Route/>

        {/* Admin Route */}
        <Route path='/admin' element={<ProtectedRoutes allowedRoles={['admin']}>
        <AdminLayout/>
        </ProtectedRoutes>}>
        
          <Route index element={<AdminHome/>}/>
        </Route>

        {/* Customer Dashboard */}
        <Route path='/dashboard' element={<ProtectedRoutes allowedRoles={['customer']}>

          <CustomerLayout/>
        </ProtectedRoutes>}>
          <Route index element={<DashBoardHome/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App