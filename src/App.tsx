
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import RequireAuth from '@/components/RequireAuth';
import Projects from '@/pages/Projects';
import Project from '@/pages/Project';
import Business from '@/pages/Business';
import ParticipantDetails from '@/pages/ParticipantDetails';

const queryClient = new QueryClient();

function App() {
  console.log('App component rendered - Routes configured');
  
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <Toaster />
            <Routes>
              <Route path="/" element={<Projects />} />
              <Route path="/projects" element={<RequireAuth><Projects /></RequireAuth>} />
              <Route 
                path="/project/:projectId" 
                element={
                  <RequireAuth>
                    <Project />
                  </RequireAuth>
                } 
              />
              <Route path="/business/:projectId" element={<RequireAuth><Business /></RequireAuth>} />
              
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
