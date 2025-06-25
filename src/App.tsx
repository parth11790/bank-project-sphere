
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import IntegrationDetails from './pages/IntegrationDetails';

// Lazy load pages to implement code-splitting (microservices approach)
const Index = lazy(() => import("./pages/Index"));
const Projects = lazy(() => import("./pages/Projects"));
const Project = lazy(() => import("./pages/Project"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CreateProject = lazy(() => import("./pages/CreateProject"));
const UseOfProceeds = lazy(() => import("./pages/UseOfProceeds"));
const CashFlowAnalysis = lazy(() => import("./pages/CashFlowAnalysis"));
const FormView = lazy(() => import("./pages/FormView"));
const PersonalInformation = lazy(() => import("./pages/PersonalInformation"));
// Add new page imports here
const ProjectAnalysis = lazy(() => import("./pages/ProjectAnalysis"));
const ProjectDocumentation = lazy(() => import("./pages/ProjectDocumentation"));
const AdminSettings = lazy(() => import("./pages/AdminSettings"));
const DropdownDetails = lazy(() => import("./pages/DropdownDetails"));
const LenderSettings = lazy(() => import("./pages/LenderSettings"));
const TemplateDetails = lazy(() => import("./pages/TemplateDetails"));
const BusinessInformation = lazy(() => import("./pages/BusinessInformation"));
const LoanDetails = lazy(() => import("./pages/LoanDetails"));
// New pages for "To Be Created" status
const OwnerBusiness = lazy(() => import("./pages/OwnerBusiness"));
const AffiliatedBusiness = lazy(() => import("./pages/AffiliatedBusiness"));
const AcquisitionBusiness = lazy(() => import("./pages/AcquisitionBusiness"));
const SellerIndividual = lazy(() => import("./pages/SellerIndividual"));
const SellerBusiness = lazy(() => import("./pages/SellerBusiness"));

// Loading fallback component
const PageLoader = () => (
  <div className="container py-20 px-4">
    <div className="space-y-8 max-w-6xl mx-auto">
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-72 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  </div>
);

// Create a new QueryClient with specific settings for better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Navigate to="/projects" replace />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/project/:projectId" element={<Project />} />
                <Route path="/create-project" element={<CreateProject />} />
                <Route path="/project/participants/:projectId/personal-info/:participantId" element={<PersonalInformation />} />
                <Route path="/project/use-of-proceeds/:projectId" element={<UseOfProceeds />} />
                <Route path="/project/cash-flow/:projectId" element={<CashFlowAnalysis />} />
                <Route path="/form/:formId" element={<FormView />} />
                {/* Add new routes for our sections */}
                <Route path="/project/analysis/:projectId" element={<ProjectAnalysis />} />
                <Route path="/project/documentation/:projectId" element={<ProjectDocumentation />} />
                <Route path="/business/:projectId" element={<BusinessInformation />} />
                <Route path="/project/:projectId/loan/:loanId" element={<LoanDetails />} />
                {/* New routes for "To Be Created" pages */}
                <Route path="/owner-business/:projectId" element={<OwnerBusiness />} />
                <Route path="/affiliated-business/:projectId" element={<AffiliatedBusiness />} />
                <Route path="/acquisition-business/:projectId" element={<AcquisitionBusiness />} />
                <Route path="/seller-individual/:projectId" element={<SellerIndividual />} />
                <Route path="/seller-business/:projectId" element={<SellerBusiness />} />
                {/* Redirect project dashboard to project detail */}
                <Route path="/project/dashboard/:projectId" element={<Navigate to="/project/:projectId" replace />} />
                <Route path="/admin-settings" element={<AdminSettings />} />
                <Route path="/admin-settings/dropdown/:dropdownId" element={<DropdownDetails />} />
                <Route path="/lender-settings" element={<LenderSettings />} />
                <Route path="/lender-settings/template/:templateId" element={<TemplateDetails />} />
                <Route path="/lender-settings/integration/:integrationId" element={<IntegrationDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
