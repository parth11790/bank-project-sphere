
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, Users, BarChart3, FileText } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdminUser = user?.role === 'admin' || user?.role === 'bank_officer' || user?.role === 'loan_specialist';
  const isBuyerOrSeller = user?.role === 'buyer' || user?.role === 'seller';

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container py-8 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Welcome to LoanFlow</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Streamline your commercial loan process with our secure platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAdminUser && (
                <Button size="lg" onClick={() => navigate('/projects')}>
                  View All Projects
                </Button>
              )}
              
              {isBuyerOrSeller && (
                <Button size="lg" onClick={() => navigate('/my-projects')}>
                  View My Projects
                </Button>
              )}
              
              {!user && (
                <Button size="lg" onClick={() => navigate('/projects')}>
                  Browse Projects
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  SBA Loan Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Streamlined SBA loan processing with automated documentation, 
                  analysis, and approval workflows.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Collaborative Workspace
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Work together with buyers, sellers, and bank personnel in one
                  secure platform for efficient communication.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Financial Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced financial analysis tools to evaluate business performance
                  and loan viability.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Document Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Secure document storage, version control, and automated document
                  generation for loan applications.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Index;
