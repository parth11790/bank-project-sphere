import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import RequireAuth from '@/components/RequireAuth';
import Index from '@/pages/Index';
import Projects from '@/pages/Projects';
import Project from '@/pages/Project';
import CreateProject from '@/pages/CreateProject';
import Users from '@/pages/Users';
import AdminSettings from '@/pages/AdminSettings';
import Profile from '@/pages/Profile';
import ProjectAnalysis from '@/pages/ProjectAnalysis';
import ProjectDocumentation from '@/pages/ProjectDocumentation';
import Business from '@/pages/Business';
import Loan from '@/pages/Loan';
import UseOfProceeds from '@/pages/UseOfProceeds';
import BusinessCashFlow from '@/pages/BusinessCashFlow';
import SellerIndividual from '@/pages/SellerIndividual';
import OwnerIndividual from '@/pages/OwnerIndividual';
import AcquisitionBusiness from '@/pages/AcquisitionBusiness';
import SellerBusiness from '@/pages/SellerBusiness';
import OwnerBusiness from '@/pages/OwnerBusiness';
import AffiliatedBusiness from '@/pages/AffiliatedBusiness';
import LenderSettings from '@/pages/LenderSettings';
import ConsolidatedCashFlow from '@/pages/ConsolidatedCashFlow';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<RequireAuth><Projects /></RequireAuth>} />
              <Route path="/project/:projectId" element={<RequireAuth><Project /></RequireAuth>} />
              <Route path="/project/consolidated-cash-flow/:projectId" element={<RequireAuth><ConsolidatedCashFlow /></RequireAuth>} />
              <Route path="/create-project" element={<RequireAuth><CreateProject /></RequireAuth>} />
              <Route path="/users" element={<RequireAuth><Users /></RequireAuth>} />
              <Route path="/admin-settings" element={<RequireAuth><AdminSettings /></RequireAuth>} />
              <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="/project/analysis/:projectId" element={<RequireAuth><ProjectAnalysis /></RequireAuth>} />
              <Route path="/project/documentation/:projectId" element={<RequireAuth><ProjectDocumentation /></RequireAuth>} />
              <Route path="/business/:projectId" element={<RequireAuth><Business /></RequireAuth>} />
              <Route path="/project/:projectId/loan/:loanId" element={<RequireAuth><Loan /></RequireAuth>} />
              <Route path="/project/use-of-proceeds/:projectId" element={<RequireAuth><UseOfProceeds /></RequireAuth>} />
              <Route path="/project/cash-flow/:projectId" element={<RequireAuth><BusinessCashFlow /></RequireAuth>} />
              <Route path="/seller-individual/:projectId" element={<RequireAuth><SellerIndividual /></RequireAuth>} />
              <Route path="/owner-individual/:projectId" element={<RequireAuth><OwnerIndividual /></RequireAuth>} />
              <Route path="/acquisition-business/:projectId" element={<RequireAuth><AcquisitionBusiness /></RequireAuth>} />
              <Route path="/seller-business/:projectId" element={<RequireAuth><SellerBusiness /></RequireAuth>} />
              <Route path="/owner-business/:projectId" element={<RequireAuth><OwnerBusiness /></RequireAuth>} />
              <Route path="/affiliated-business/:projectId" element={<RequireAuth><AffiliatedBusiness /></RequireAuth>} />
              <Route path="/lender-settings" element={<RequireAuth><LenderSettings /></RequireAuth>} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
