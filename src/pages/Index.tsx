
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building2, 
  Users, 
  FileText, 
  TrendingUp, 
  Shield, 
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import Layout from '@/components/Layout';
import LeadCaptureSection from '@/components/LeadCaptureSection';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Building2,
      title: "Project Management",
      description: "Streamline your loan processing workflow from application to funding"
    },
    {
      icon: Users,
      title: "Participant Tracking",
      description: "Manage all stakeholders including borrowers, sellers, and guarantors"
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Centralized document collection and verification system"
    },
    {
      icon: TrendingUp,
      title: "Financial Analysis",
      description: "Advanced tools for credit analysis and risk assessment"
    },
    {
      icon: Shield,
      title: "Compliance Ready",
      description: "Built-in SBA compliance checks and regulatory requirements"
    },
    {
      icon: Clock,
      title: "Faster Processing",
      description: "Reduce loan processing time by up to 40% with automation"
    }
  ];

  const benefits = [
    "Streamlined application process",
    "Real-time collaboration tools", 
    "Comprehensive audit trails",
    "SBA compliance automation",
    "Advanced financial analytics",
    "Secure document storage"
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Modern SBA Loan
                <span className="block text-blue-200">Management Platform</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Streamline your lending operations with our comprehensive platform designed 
                specifically for SBA loan origination and management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
                  onClick={() => navigate('/create-project')}
                >
                  Start New Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3"
                  onClick={() => navigate('/projects')}
                >
                  View Projects
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Lead Capture Section */}
        <LeadCaptureSection />

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything You Need for SBA Lending
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform provides all the tools necessary to efficiently manage 
                the complete SBA loan lifecycle from initial application to funding.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="p-3 bg-blue-100 rounded-full w-fit mb-4">
                        <feature.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Why Choose Our Platform?
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Built by lending professionals for lending professionals, our platform 
                    addresses the real challenges faced in SBA loan origination and management.
                  </p>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                        <span className="text-lg text-gray-700">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <div className="bg-blue-600 rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                    <p className="text-blue-100 mb-6">
                      Join hundreds of lenders who trust our platform for their SBA loan operations.
                    </p>
                    <Button 
                      size="lg" 
                      className="bg-white text-blue-600 hover:bg-blue-50 w-full"
                      onClick={() => navigate('/create-project')}
                    >
                      Create Your First Project
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
