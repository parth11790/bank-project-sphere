
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UserCard from './UserCard';
import { useToast } from '@/hooks/use-toast';

interface User {
  user_id: string;
  email: string;
  name: string;
  role: string;
  bank_id: string;
  otp_enabled: boolean;
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = React.useState('');

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (userId: string) => {
    toast({
      title: "Edit User",
      description: `Editing user ${userId} (Demo only)`,
    });
  };

  const handleDelete = (userId: string) => {
    toast({
      title: "Delete User",
      description: `Deleting user ${userId} (Demo only)`,
      variant: "destructive",
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-auto max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search users..."
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto justify-between sm:justify-end">
          <Button variant="outline" className="flex items-center gap-1">
            <SlidersHorizontal size={16} />
            <span>Filter</span>
          </Button>
          
          <Button className="flex items-center gap-1">
            <Plus size={16} />
            <span>New User</span>
          </Button>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No users found matching your search criteria.</p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredUsers.map(user => (
            <motion.div
              key={user.user_id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <UserCard
                user={user}
                onEdit={() => handleEdit(user.user_id)}
                onDelete={() => handleDelete(user.user_id)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default UserList;
