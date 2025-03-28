
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import BankPersonnelCard from './BankPersonnelCard';

// Define the type for bank personnel to match the data we have
export interface BankPersonnel {
  participant_id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
}

interface BankPersonnelListProps {
  bankUsers: BankPersonnel[];
}

const BankPersonnelList: React.FC<BankPersonnelListProps> = ({ bankUsers }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Bank Personnel</h2>
      </div>
      
      {bankUsers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground mb-4">No bank personnel assigned to this project</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bankUsers.map(user => (
            <BankPersonnelCard key={user.participant_id} user={user} />
          ))}
        </div>
      )}
    </>
  );
};

export default BankPersonnelList;
