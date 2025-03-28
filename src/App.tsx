
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";
import CreateProject from "./pages/CreateProject";
import ProjectParticipants from "./pages/ProjectParticipants";
import ProjectDashboard from "./pages/ProjectDashboard";
import UseOfProceeds from "./pages/UseOfProceeds";
import CashFlowAnalysis from "./pages/CashFlowAnalysis";
import FormView from "./pages/FormView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:projectId" element={<Project />} />
              <Route path="/create-project" element={<CreateProject />} />
              <Route path="/project/participants/:projectId" element={<ProjectParticipants />} />
              <Route path="/project/dashboard/:projectId" element={<ProjectDashboard />} />
              <Route path="/project/use-of-proceeds/:projectId" element={<UseOfProceeds />} />
              <Route path="/project/cash-flow/:projectId" element={<CashFlowAnalysis />} />
              <Route path="/form/:formId" element={<FormView />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
