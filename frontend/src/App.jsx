import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/authContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import Footer from './components/Footer'
import Cart from './pages/Cart'
import Shop from './pages/Shop'
import Categories from './pages/Categories'
import About from './pages/About'
import Checkout from './pages/Checkout'
import InformationPage from './pages/InformationPage'

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="p-8 text-center">Loading account...</div>
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />
  return <Outlet />
}

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/:page" element={<InformationPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/track-order" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="*" element={<InformationPage />} />
        <Route element={<ProtectedRoute adminOnly />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App