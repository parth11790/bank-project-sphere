
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";
import CreateProject from "./pages/CreateProject";
import ProjectParticipants from "./pages/ProjectParticipants";
import ProjectDashboard from "./pages/ProjectDashboard";
import UseOfProceeds from "./pages/UseOfProceeds";
import CashFlowAnalysis from "./pages/CashFlowAnalysis";
import FormView from "./pages/FormView";
import RequireAuth from "./components/RequireAuth";

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
              <Route 
                path="/projects" 
                element={
                  <RequireAuth>
                    <Projects />
                  </RequireAuth>
                } 
              />
              <Route 
                path="/project/:projectId" 
                element={
                  <RequireAuth>
                    <Project />
                  </RequireAuth>
                } 
              />
              <Route 
                path="/create-project" 
                element={
                  <RequireAuth>
                    <CreateProject />
                  </RequireAuth>
                } 
              />
              <Route 
                path="/project/participants/:projectId" 
                element={
                  <RequireAuth>
                    <ProjectParticipants />
                  </RequireAuth>
                } 
              />
              <Route 
                path="/project/dashboard/:projectId" 
                element={
                  <RequireAuth>
                    <ProjectDashboard />
                  </RequireAuth>
                } 
              />
              <Route 
                path="/project/use-of-proceeds/:projectId" 
                element={
                  <RequireAuth>
                    <UseOfProceeds />
                  </RequireAuth>
                } 
              />
              <Route 
                path="/project/cash-flow/:projectId" 
                element={
                  <RequireAuth>
                    <CashFlowAnalysis />
                  </RequireAuth>
                } 
              />
              <Route 
                path="/form/:formId" 
                element={
                  <RequireAuth>
                    <FormView />
                  </RequireAuth>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
