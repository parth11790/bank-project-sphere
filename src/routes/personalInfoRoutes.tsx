
import React from 'react';
import { Route } from 'react-router-dom';
import PersonalInformation from '@/pages/PersonalInformation';

export const personalInfoRoutes = (
  <Route path="/project/participants/:projectId/personal-info/:participantId" element={<PersonalInformation />} />
);
