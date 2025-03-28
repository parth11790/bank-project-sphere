
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowRight, Building2, ChartPieIcon, BarChart, ShieldCheck, LogIn } from 'lucide-react';
import { toast } from 'sonner';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login - in a real app, this would call an authentication API
    if (email && password) {
      toast("Login successful");
      navigate('/dashboard');
    } else {
      toast("Please enter both email and password");
    }
  };

  const features = [
    {
      icon: Building2,
      title: 'Project Management',
      description: 'Organize and track all loan projects in one centralized location.',
    },
    {
      icon: ChartPieIcon,
      title: 'Financial Tracking',
      description: 'Monitor loan proceeds and fund allocation with precision.',
    },
    {
      icon: BarChart,
      title: 'Data Visualization',
      description: 'Visualize project data through intuitive charts and graphs.',
    },
    {
      icon: ShieldCheck,
      title: 'User Authentication',
      description: 'Secure role-based access control with optional two-factor authentication.',
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white">
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative">
          <motion.div 
            className="text-center flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative mb-6">
              <motion.div 
                className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 0.9, 0.7] 
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              <div className="relative bg-white p-1 rounded-full">
                <span className="inline-block px-4 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                  Banking Innovation
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-3xl gradient-text">
              Intelligent Banking Project Management
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl">
              Streamline loan project workflows and financial tracking with an intuitive, powerful platform designed for modern banking institutions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Enter your credentials to access the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="you@example.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                          id="password" 
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account? <Link to="/sign-up" className="text-primary font-medium">Sign up</Link>
                    </p>
                  </CardFooter>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-4">Get Started Now</h2>
                  <p className="text-muted-foreground mb-6">
                    Join thousands of banking professionals who are already optimizing their project management workflows.
                  </p>
                  <div className="flex flex-col gap-4">
                    <Button asChild variant="outline" className="justify-between">
                      <Link to="/projects">
                        View Projects
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild className="justify-between">
                      <Link to="/dashboard">
                        Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers all the tools you need to manage complex banking projects efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-border/50 hover-lift">
                  <CardHeader>
                    <div className="p-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="text-primary/80 hover:text-primary">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 py-8 px-4 mt-auto">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold gradient-text mb-4 md:mb-0">Sphere</div>
            <div className="flex space-x-6">
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link to="/users" className="text-muted-foreground hover:text-foreground transition-colors">
                Users
              </Link>
              <Link to="/use-of-proceeds" className="text-muted-foreground hover:text-foreground transition-colors">
                Use of Proceeds
              </Link>
            </div>
          </div>
          <div className="border-t border-border/50 mt-6 pt-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Sphere Banking. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
