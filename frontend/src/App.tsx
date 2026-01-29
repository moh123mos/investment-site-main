import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import './i18n/config';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import Angebote from './pages/Angebote';
import Login from './pages/admin/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import DashboardHome from './pages/admin/DashboardHome';
import CityList from './pages/admin/CityList';
import CityEditor from './pages/admin/CityEditor';
import VideoManager from './pages/admin/VideoManager';
import AccountSettings from './pages/admin/AccountSettings';
import CityTemplate from './pages/CityTemplate';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="angebote" element={<Angebote />} />

            {/* Dynamic City Route */}
            <Route path="city/:slug" element={<CityTemplate />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} /> {/* Dashboard Overview */}
            <Route path="cities" element={<CityList />} />
            <Route path="cities/new" element={<CityEditor />} />
            <Route path="cities/edit/:id" element={<CityEditor />} />
            <Route path="videos" element={<VideoManager />} />
            <Route path="account" element={<AccountSettings />} />
          </Route>
        </Routes>
        <Toaster position="bottom-right" richColors closeButton />
      </BrowserRouter>
    </AuthProvider>
  );
}
