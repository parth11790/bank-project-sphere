
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import Index from '@/pages/Index';
import Projects from '@/pages/Projects';
import Project from '@/pages/Project';
import CreateProject from '@/pages/CreateProject';
import Users from '@/pages/Users';
import AdminSettings from '@/pages/AdminSettings';
import ProjectAnalysis from '@/pages/ProjectAnalysis';
import ProjectDocumentation from '@/pages/ProjectDocumentation';
import UseOfProceeds from '@/pages/UseOfProceeds';
import SellerIndividual from '@/pages/SellerIndividual';
import AcquisitionBusiness from '@/pages/AcquisitionBusiness';
import SellerBusiness from '@/pages/SellerBusiness';
import OwnerBusiness from '@/pages/OwnerBusiness';
import AffiliatedBusiness from '@/pages/AffiliatedBusiness';
import LenderSettings from '@/pages/LenderSettings';
import ConsolidatedCashFlow from '@/pages/ConsolidatedCashFlow';
import BusinessInformation from '@/pages/BusinessInformation';
import LoanDetails from '@/pages/LoanDetails';
import CashFlowAnalysis from '@/pages/CashFlowAnalysis';
import FormView from '@/pages/FormView';
import TemplateDetails from '@/pages/TemplateDetails';
import IntegrationDetails from '@/pages/IntegrationDetails';
import DropdownDetails from '@/pages/DropdownDetails';
import PersonalInformation from '@/pages/PersonalInformation';
import NetWorth from '@/pages/NetWorth';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:projectId" element={<Project />} />
              <Route path="/project/consolidated-cash-flow/:projectId" element={<ConsolidatedCashFlow />} />
              <Route path="/create-project" element={<CreateProject />} />
              <Route path="/users" element={<Users />} />
              <Route path="/admin-settings" element={<AdminSettings />} />
              <Route path="/project/analysis/:projectId" element={<ProjectAnalysis />} />
              <Route path="/project/documentation/:projectId" element={<ProjectDocumentation />} />
              <Route path="/project/use-of-proceeds/:projectId" element={<UseOfProceeds />} />
              <Route path="/seller-individual/:projectId" element={<SellerIndividual />} />
              <Route path="/acquisition-business/:projectId" element={<AcquisitionBusiness />} />
              <Route path="/seller-business/:projectId" element={<SellerBusiness />} />
              <Route path="/owner-business/:projectId" element={<OwnerBusiness />} />
              <Route path="/affiliated-business/:projectId" element={<AffiliatedBusiness />} />
              <Route path="/lender-settings" element={<LenderSettings />} />
              
              {/* Missing Pages - Now Added */}
              <Route path="/business/:projectId" element={<BusinessInformation />} />
              <Route path="/project/:projectId/business" element={<BusinessInformation />} />
              <Route path="/project/:projectId/loan/:loanId" element={<LoanDetails />} />
              <Route path="/project/:projectId/loan/new" element={<LoanDetails />} />
              <Route path="/project/participants/:projectId/personal-info/:participantId" element={<PersonalInformation />} />
              <Route path="/project/participants/:projectId/net-worth/:participantId" element={<NetWorth />} />
              <Route path="/project/:projectId/cash-flow-analysis" element={<CashFlowAnalysis />} />
              <Route path="/project/cash-flow-analysis/:projectId" element={<CashFlowAnalysis />} />
              <Route path="/form/:formId" element={<FormView />} />
              <Route path="/template/:templateId" element={<TemplateDetails />} />
              <Route path="/integration/:integrationId" element={<IntegrationDetails />} />
              <Route path="/admin-settings/dropdown/:dropdownId" element={<DropdownDetails />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
