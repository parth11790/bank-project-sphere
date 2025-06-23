import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { AlertProvider } from '@/components/alerts/AlertContext';
import { QueryClient } from '@tanstack/react-query';
import RequireAuth from '@/components/RequireAuth';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Public from '@/pages/Public';
import Profile from '@/pages/Profile';
import Admin from '@/pages/Admin';
import Unauthorized from '@/pages/Unauthorized';
import Missing from '@/pages/Missing';
import Editor from '@/pages/Editor';
import LinkPage from '@/pages/LinkPage';
import Lounge from '@/pages/Lounge';
import Layout from '@/components/Layout';
import LenderSettings from '@/pages/LenderSettings';
import TemplateDetails from '@/pages/TemplateDetails';
import IntegrationDetails from '@/pages/IntegrationDetails';

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <QueryClient>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Layout />} >
                  {/* public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="linkpage" element={<LinkPage />} />
                  <Route path="unauthorized" element={<Unauthorized />} />

                  {/* we want to protect these routes */}
                  <Route element={<RequireAuth allowedRoles={['User', 'Editor', 'Admin']} />}>
                    <Route path="dashboard" element={<Dashboard />} />
                  </Route>

                  <Route element={<RequireAuth allowedRoles={['Admin']} />}>
                    <Route path="admin" element={<Admin />} />
                  </Route>

                  <Route element={<RequireAuth allowedRoles={['Editor']} />}>
                    <Route path="editor" element={<Editor />} />
                  </Route>

                  <Route element={<RequireAuth allowedRoles={['Lender']} />}>
                    <Route path="lender" element={<Lounge />} />
                  </Route>

                  <Route element={<RequireAuth allowedRoles={['Editor', 'Admin']} />}>
                    <Route path="lounge" element={<Lounge />} />
                  </Route>

                  {/* Catch all */}
                  <Route path="*" element={<Missing />} />
                </Route>
                <Route path="/public" element={<Public />} />
                <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
                <Route path="/lender-settings" element={<RequireAuth><LenderSettings /></RequireAuth>} />
                <Route path="/lender-settings/integrations/:integrationId" element={<RequireAuth><IntegrationDetails /></RequireAuth>} />
                <Route path="/lender-settings/template/:templateId" element={<RequireAuth><TemplateDetails /></RequireAuth>} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </QueryClient>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
