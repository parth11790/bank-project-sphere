import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const BorrowerAuth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isRegister = location.pathname === '/borrower/register';

  useEffect(() => {
    if (user) {
      navigate('/borrower/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Pre-fill form data from application if coming from intake
    const applicationData = localStorage.getItem('borrower_application');
    if (applicationData && isRegister) {
      const data = JSON.parse(applicationData);
      setBusinessName(data.business_legal_name || '');
      setContactName(data.primary_contact_name || '');
      setEmail(data.primary_contact_email || '');
    }
  }, [isRegister]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      if (!error) {
        navigate('/borrower/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await signUp(email, password, {
        business_name: businessName,
        contact_name: contactName,
        user_type: 'borrower'
      });
      
      if (!error) {
        toast.success('Account created successfully! Please check your email for verification.');
        // Don't navigate immediately - wait for email verification
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">LendFlow</div>
          <Button variant="outline" onClick={() => navigate('/borrower')}>
            Back to Home
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mt-20"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isRegister ? 'Create Your Account' : 'Welcome Back'}
            </CardTitle>
            <CardDescription>
              {isRegister 
                ? 'Complete your registration to access your borrower portal'
                : 'Sign in to your borrower portal'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={isRegister ? 'register' : 'login'} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger 
                  value="login" 
                  onClick={() => navigate('/borrower/login')}
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="register"
                  onClick={() => navigate('/borrower/register')}
                >
                  Register
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input
                      id="business-name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Contact Name</Label>
                    <Input
                      id="contact-name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <Separator className="my-6" />
            
            <div className="text-center text-sm text-muted-foreground">
              {isRegister ? (
                <>
                  Already have an account?{' '}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-normal"
                    onClick={() => navigate('/borrower/login')}
                  >
                    Sign in here
                  </Button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-normal"
                    onClick={() => navigate('/borrower/register')}
                  >
                    Register here
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default BorrowerAuth;