import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  User, 
  Building, 
  LogOut,
  DollarSign,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

interface AssignedForm {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  entity_type: 'individual' | 'business';
  due_date?: string;
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
        due_date: '2024-01-15'
      },
      {
        id: 'form-2',
        name: 'Business Tax Returns (3 years)',
        description: 'Upload your business tax returns for the past 3 years',
        status: 'pending',
        entity_type: 'business',
        due_date: '2024-01-20'
      },
      {
        id: 'form-3',
        name: 'Personal Debt Summary',
        description: 'List all personal debts and obligations',
        status: 'pending',
        entity_type: 'individual'
      },
      {
        id: 'form-4',
        name: 'Business Balance Sheet',
        description: 'Provide current business balance sheet',
        status: 'in_progress',
        entity_type: 'business'
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      case 'in_progress':
        return <Badge variant="default" className="bg-yellow-500">In Progress</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const completedForms = assignedForms.filter(f => f.status === 'completed').length;
  const totalForms = assignedForms.length;
  const progressPercentage = (completedForms / totalForms) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">LendFlow</div>
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

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Welcome Section */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">
              Borrower Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your loan application progress and complete required forms.
            </p>
          </div>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Application Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Forms Completed</span>
                  <span>{completedForms} of {totalForms}</span>
                </div>
                <Progress value={progressPercentage} />
                <p className="text-sm text-muted-foreground">
                  Complete all required forms to proceed with your loan application.
                </p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="forms" className="space-y-4">
            <TabsList>
              <TabsTrigger value="forms">Required Forms</TabsTrigger>
              <TabsTrigger value="application">Application Details</TabsTrigger>
            </TabsList>

            <TabsContent value="forms" className="space-y-4">
              <div className="grid gap-4">
                {assignedForms.map((form) => (
                  <Card 
                    key={form.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleFormClick(form)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          {getStatusIcon(form.status)}
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{form.name}</h3>
                              {form.entity_type === 'business' ? (
                                <Building className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <User className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {form.description}
                            </p>
                            {form.due_date && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                Due: {new Date(form.due_date).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(form.status)}
                          <Button variant="outline" size="sm">
                            {form.status === 'completed' ? 'View' : 'Complete'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="application" className="space-y-4">
              {applicationData && (
                <Card>
                  <CardHeader>
                    <CardTitle>Application Summary</CardTitle>
                    <CardDescription>
                      Review your submitted application details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Business Name</h4>
                        <p>{applicationData.business_legal_name}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Contact Person</h4>
                        <p>{applicationData.primary_contact_name}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Loan Amount</h4>
                        <p className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {applicationData.requested_loan_amount?.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Purpose</h4>
                        <p>{applicationData.loan_purpose}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default BorrowerDashboard;