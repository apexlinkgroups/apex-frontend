import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Layout
import Navbar  from './components/Navbar'
import Footer  from './components/Footer'
import Loader  from './components/Loader'

// Public pages
import Home           from './pages/Home'
import Services       from './pages/Services'
import PhotoEditing   from './pages/PhotoEditing'
import VideoEditing   from './pages/VideoEditing'
import Portfolio      from './pages/Portfolio'
import Pricing        from './pages/Pricing'
import About          from './pages/About'
import Contact        from './pages/Contact'
import StartProject   from './pages/StartProject'

// Auth pages
import Login          from './pages/Login'
import Register       from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword  from './pages/ResetPassword'

// Protected pages
import ClientDashboard   from './pages/ClientDashboard'
import ProjectTracking   from './pages/ProjectTracking'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <Loader />
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  const { loading } = useAuth()
  if (loading) return <Loader />

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/services"      element={<Services />} />
        <Route path="/services/photo-editing"  element={<PhotoEditing />} />
        <Route path="/services/video-editing"  element={<VideoEditing />} />
        <Route path="/portfolio"     element={<Portfolio />} />
        <Route path="/pricing"       element={<Pricing />} />
        <Route path="/about"         element={<About />} />
        <Route path="/contact"       element={<Contact />} />
        <Route path="/start-project" element={<StartProject />} />

        <Route path="/login"                    element={<Login />} />
        <Route path="/register"                 element={<Register />} />
        <Route path="/forgot-password"          element={<ForgotPassword />} />
        <Route path="/reset-password/:token"    element={<ResetPassword />} />

        <Route path="/dashboard" element={
          <PrivateRoute><ClientDashboard /></PrivateRoute>
        } />
        <Route path="/project/:id" element={
          <PrivateRoute><ProjectTracking /></PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}
