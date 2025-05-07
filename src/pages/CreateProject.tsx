
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import IntakeMultiStepForm from '@/components/intake/IntakeMultiStepForm';

const CreateProject: React.FC = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <IntakeMultiStepForm />
      </motion.div>
    </Layout>
  );
};

export default CreateProject;
