
import React from 'react';
import { Route } from 'react-router-dom';
import NetWorth from '@/pages/NetWorth';

export const netWorthRoutes = (
  <Route path="/project/participants/:projectId/net-worth/:participantId" element={<NetWorth />} />
);
