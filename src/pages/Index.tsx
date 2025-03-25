
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, ChartPieIcon, BarChart, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

const Index: React.FC = () => {
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
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-medium px-8">
                <Link to="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-medium px-8">
                <Link to="/projects">
                  View Projects
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div 
            className="mt-16 relative mx-auto max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative bg-white rounded-xl overflow-hidden shadow-xl border border-border/50">
              <div className="aspect-video bg-gradient-to-br from-primary/5 to-blue-500/5 p-2 sm:p-8">
                <div className="w-full h-full bg-white rounded-lg border border-border/50 flex items-center justify-center">
                  <div className="text-center p-8">
                    <h3 className="text-xl font-semibold mb-2">Dashboard Preview</h3>
                    <p className="text-muted-foreground">Interactive visualization of banking project data</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[80%] h-12 bg-black/5 blur-xl rounded-full"></div>
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

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="rounded-xl overflow-hidden relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20"></div>
            <div className="relative p-8 md:p-16 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-md">
                  Join thousands of banking professionals who are already optimizing their project management workflows.
                </p>
                <Button asChild size="lg" className="font-medium px-8">
                  <Link to="/dashboard">
                    Explore Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="w-full md:w-1/3 aspect-square bg-white/90 rounded-xl shadow-lg p-4 md:p-6 backdrop-blur-md border border-white/30">
                <div className="w-full h-full rounded-lg border border-border/50 flex items-center justify-center">
                  <div className="text-center p-4">
                    <h3 className="text-xl font-semibold mb-2">Get a Demo</h3>
                    <p className="text-muted-foreground mb-4">See the platform in action</p>
                    <Button variant="outline">Request Demo</Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
