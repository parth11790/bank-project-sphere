import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { LenderProvider } from '@/contexts/LenderContext';
import RequireAuth from '@/components/RequireAuth';
import LoadingScreen from '@/components/LoadingScreen';

const Index = lazy(() => import('@/pages/Index'));
const Projects = lazy(() => import('@/pages/Projects'));
const Project = lazy(() => import('@/pages/Project'));
const CreateProject = lazy(() => import('@/pages/CreateProject'));
const Users = lazy(() => import('@/pages/Users'));
const AdminSettings = lazy(() => import('@/pages/AdminSettings'));
const ProjectAnalysis = lazy(() => import('@/pages/ProjectAnalysis'));
const ProjectDocumentation = lazy(() => import('@/pages/ProjectDocumentation'));
const UseOfProceeds = lazy(() => import('@/pages/UseOfProceeds'));
const SellerIndividual = lazy(() => import('@/pages/SellerIndividual'));
const AcquisitionBusiness = lazy(() => import('@/pages/AcquisitionBusiness'));
const SellerBusiness = lazy(() => import('@/pages/SellerBusiness'));
const OwnerBusiness = lazy(() => import('@/pages/OwnerBusiness'));
const AffiliatedBusiness = lazy(() => import('@/pages/AffiliatedBusiness'));
const LenderSettings = lazy(() => import('@/pages/LenderSettings'));
const ConsolidatedCashFlow = lazy(() => import('@/pages/ConsolidatedCashFlow'));
const BusinessInformation = lazy(() => import('@/pages/BusinessInformation'));
const LoanDetails = lazy(() => import('@/pages/LoanDetails'));
const CashFlowAnalysis = lazy(() => import('@/pages/CashFlowAnalysis'));
const FormView = lazy(() => import('@/pages/FormView'));
const TemplateDetails = lazy(() => import('@/pages/TemplateDetails'));
const IntegrationDetails = lazy(() => import('@/pages/IntegrationDetails'));
const DropdownDetails = lazy(() => import('@/pages/DropdownDetails'));
const PersonalInformation = lazy(() => import('@/pages/PersonalInformation'));
const NetWorth = lazy(() => import('@/pages/NetWorth'));
const BorrowerLanding = lazy(() => import('@/pages/BorrowerLanding'));
const BorrowerIntake = lazy(() => import('@/pages/BorrowerIntake'));
const BorrowerAuth = lazy(() => import('@/pages/BorrowerAuth'));
const BorrowerDashboard = lazy(() => import('@/pages/BorrowerDashboard'));
const BorrowerFormView = lazy(() => import('@/pages/BorrowerFormView'));


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000,   // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LenderProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Suspense fallback={<LoadingScreen />}>
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
                  
                  {/* Borrower Routes */}
                  <Route path="/borrower" element={<BorrowerLanding />} />
                  <Route path="/borrower/intake" element={<BorrowerIntake />} />
                  <Route path="/borrower/login" element={<BorrowerAuth />} />
                  <Route path="/borrower/register" element={<BorrowerAuth />} />
                  <Route path="/borrower/dashboard" element={
                    <RequireAuth>
                      <BorrowerDashboard />
                    </RequireAuth>
                  } />
                  <Route path="/borrower/form/:formId" element={
                    <RequireAuth>
                      <BorrowerFormView />
                    </RequireAuth>
                  } />
                </Routes>
              </Suspense>
              <Toaster />
            </div>
          </Router>
        </LenderProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
