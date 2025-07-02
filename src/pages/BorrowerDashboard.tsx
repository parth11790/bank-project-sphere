import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  LogOut,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';
import BorrowerFormsSidebar from '@/components/borrower/BorrowerFormsSidebar';

interface AssignedForm {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  entity_type: 'individual' | 'business';
  due_date?: string;
  category: string;
}

const BorrowerDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState<any>(null);
  const [assignedForms, setAssignedForms] = useState<AssignedForm[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/borrower/login');
      return;
    }

    // Load application data from localStorage
    const storedData = localStorage.getItem('borrower_application');
    if (storedData) {
      setApplicationData(JSON.parse(storedData));
    }

    // Mock assigned forms - in real app, fetch from API
    setAssignedForms([
      {
        id: 'form-1',
        name: 'Personal Financial Statement',
        description: 'Complete your personal financial information',
        status: 'pending',
        entity_type: 'individual',
        due_date: '2024-01-15',
        category: 'personal'
      },
      {
        id: 'form-2',
        name: 'Business Tax Returns (3 years)',
        description: 'Upload your business tax returns for the past 3 years',
        status: 'pending',
        entity_type: 'business',
        due_date: '2024-01-20',
        category: 'business'
      },
      {
        id: 'form-3',
        name: 'Personal Debt Summary',
        description: 'List all personal debts and obligations',
        status: 'pending',
        entity_type: 'individual',
        category: 'financial'
      },
      {
        id: 'form-4',
        name: 'Business Balance Sheet',
        description: 'Provide current business balance sheet',
        status: 'in_progress',
        entity_type: 'business',
        category: 'financial'
      },
      {
        id: 'form-5',
        name: 'Business Information',
        description: 'Basic business details and registration',
        status: 'completed',
        entity_type: 'business',
        category: 'business'
      },
      {
        id: 'form-6',
        name: 'Profit & Loss Statement',
        description: 'Financial performance statements',
        status: 'pending',
        entity_type: 'business',
        category: 'financial'
      },
      {
        id: 'form-7',
        name: 'Tax Returns',
        description: 'Personal tax returns for the past 3 years',
        status: 'pending',
        entity_type: 'individual',
        category: 'financial'
      }
    ]);
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/borrower');
  };

  const handleFormClick = (form: AssignedForm) => {
    const params = new URLSearchParams({
      name: form.name,
      participant: user?.user_metadata?.contact_name || 'Borrower',
      entityType: form.entity_type,
      fromDashboard: 'true'
    });
    
    navigate(`/borrower/form/${form.id}?${params.toString()}`);
  };


  const completedForms = assignedForms.filter(f => f.status === 'completed').length;
  const totalForms = assignedForms.length;
  const progressPercentage = (completedForms / totalForms) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-primary">LendFlow</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.user_metadata?.contact_name || user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Compact Header */}
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">
                  Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Complete your loan application forms
                </p>
              </div>

              {/* Compact Progress Overview */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium text-sm">Progress</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {completedForms} of {totalForms} complete
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </Card>

              {/* Application Summary */}
              {applicationData && (
                <Card className="p-4">
                  <h3 className="font-medium text-sm mb-3">Application Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Business</p>
                      <p className="text-sm font-medium">{applicationData.business_legal_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Loan Amount</p>
                      <p className="text-sm font-medium flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {applicationData.requested_loan_amount?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>
          </div>
        </div>

        {/* Forms Sidebar */}
        <BorrowerFormsSidebar
          forms={assignedForms}
          onFormClick={handleFormClick}
        />
      </div>
    </div>
  );
};

export default BorrowerDashboard;