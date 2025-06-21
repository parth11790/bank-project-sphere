
import React from 'react';
import Layout from '@/components/Layout';
import PersonalInformationForm from '@/components/participants/forms/PersonalInformationForm';

const PersonalInformation: React.FC = () => {
  return (
    <Layout>
      <PersonalInformationForm />
    </Layout>
  );
};

export default PersonalInformation;
