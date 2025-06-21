
import React from 'react';
import Layout from '@/components/Layout';
import PersonalInformationForm from '@/components/participants/forms/PersonalInformationForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const PersonalInformation: React.FC = () => {
  const navigate = useNavigate();

  const handleSave = (values: any) => {
    console.log('Personal information saved:', values);
    toast.success('Personal information saved successfully!');
    // Navigate to business information or dashboard
    navigate('/projects');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <PersonalInformationForm 
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </Layout>
  );
};

export default PersonalInformation;
