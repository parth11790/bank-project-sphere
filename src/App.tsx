import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, RequireAuth } from '@/components/auth/AuthProvider';
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import Project from '@/pages/Project';
import Business from '@/pages/Business';
import Form from '@/pages/Form';
import Analysis from '@/pages/Analysis';
import Documentation from '@/pages/Documentation';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import ParticipantDetails from '@/pages/ParticipantDetails';

function App() {
  return (
    <Router>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <Toaster />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<RequireAuth><Projects /></RequireAuth>} />
              <Route path="/project/:projectId" element={<RequireAuth><Project /></RequireAuth>} />
              <Route path="/business/:projectId" element={<RequireAuth><Business /></RequireAuth>} />
              <Route path="/form/:formId" element={<RequireAuth><Form /></RequireAuth>} />
              <Route path="/project/analysis/:projectId" element={<RequireAuth><Analysis /></RequireAuth>} />
              <Route path="/project/documentation/:projectId" element={<RequireAuth><Documentation /></RequireAuth>} />
              <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              
              {/* Add new participant details route */}
              <Route 
                path="/project/participants/:projectId/:participantId" 
                element={
                  <RequireAuth>
                    <ParticipantDetails />
                  </RequireAuth>
                } 
              />
            </Routes>
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
