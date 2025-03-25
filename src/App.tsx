
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Users from "./pages/Users";
import UseOfProceeds from "./pages/UseOfProceeds";
import NotFound from "./pages/NotFound";
import CreateProject from "./pages/CreateProject";
import ProjectParticipants from "./pages/ProjectParticipants";
import ProjectDashboard from "./pages/ProjectDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/users" element={<Users />} />
            <Route path="/use-of-proceeds" element={<UseOfProceeds />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/project/participants/:projectId" element={<ProjectParticipants />} />
            <Route path="/project/dashboard/:projectId" element={<ProjectDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
