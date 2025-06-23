
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { AlertProvider } from '@/components/alerts/AlertContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RequireAuth from '@/components/RequireAuth';
import Layout from '@/components/Layout';
import LenderSettings from '@/pages/LenderSettings';
import TemplateDetails from '@/pages/TemplateDetails';
import IntegrationDetails from '@/pages/IntegrationDetails';
import Index from '@/pages/Index';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Layout><Index /></Layout>} />
                <Route path="/lender-settings" element={<RequireAuth><LenderSettings /></RequireAuth>} />
                <Route path="/lender-settings/integrations/:integrationId" element={<RequireAuth><IntegrationDetails /></RequireAuth>} />
                <Route path="/lender-settings/template/:templateId" element={<RequireAuth><TemplateDetails /></RequireAuth>} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </QueryClientProvider>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
