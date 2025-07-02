import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, DollarSign, FileText, Users } from 'lucide-react';

const BorrowerLanding: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Complete Application",
      description: "Fill out our simple 4-step application process"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Create Account",
      description: "Set up your secure borrower portal"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Submit Documents",
      description: "Upload required forms and documents"
    },
    {
      icon: <DollarSign className="h-8 w-8 text-primary" />,
      title: "Get Approved",
      description: "Receive your loan decision"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">LendFlow</div>
          <Button variant="outline" onClick={() => navigate('/borrower/login')}>
            Already have an account?
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Get Your Business
            <span className="text-primary block">Funding Today</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Simple, fast, and secure loan application process. 
            Get the funding your business needs to grow.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={() => navigate('/borrower/intake')}
          >
            Start Your Application
          </Button>
        </motion.div>
      </section>

      {/* Steps Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {step.icon}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of businesses that have secured funding through our platform.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/borrower/intake')}
            >
              Begin Application Process
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BorrowerLanding;