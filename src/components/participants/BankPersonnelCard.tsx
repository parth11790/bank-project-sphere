
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface BankPersonnel {
  participant_id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
}

interface BankPersonnelCardProps {
  user: BankPersonnel;
}

const BankPersonnelCard: React.FC<BankPersonnelCardProps> = ({ user }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{user.name}</CardTitle>
              <CardDescription>{user.role.replace('_', ' ')}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Badge variant="outline" className="capitalize">
          {user.role.replace('_', ' ')}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default BankPersonnelCard;
