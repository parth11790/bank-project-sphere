
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, Trash, ShieldCheck, ShieldAlert } from 'lucide-react';
import { getBankById } from '@/lib/mockData';

interface UserCardProps {
  user: {
    user_id: string;
    email: string;
    name: string;
    role: string;
    bank_id: string;
    otp_enabled: boolean;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  // Get the bank the user belongs to
  const bank = getBankById(user.bank_id);
  
  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Format role for display
  const formatRole = (role: string) => {
    return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  // Determine badge variant based on role
  const getBadgeVariant = (role: string) => {
    switch (role) {
      case 'bank_employee':
        return 'default';
      case 'buyer':
        return 'secondary';
      case 'seller':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="hover-lift"
    >
      <Card className="h-full overflow-hidden border-border/50">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar className="h-12 w-12 border border-border/50">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg leading-none">{user.name}</h3>
              {user.otp_enabled && (
                <ShieldCheck size={16} className="text-green-500" title="OTP Enabled" />
              )}
              {!user.otp_enabled && (
                <ShieldAlert size={16} className="text-amber-500" title="OTP Disabled" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant={getBadgeVariant(user.role)}>
              {formatRole(user.role)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {bank?.bank_name || 'Unknown Bank'}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end pt-2 gap-2 border-t border-border/50">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={onEdit}>
            <Edit size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={onDelete}>
            <Trash size={16} />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default UserCard;
