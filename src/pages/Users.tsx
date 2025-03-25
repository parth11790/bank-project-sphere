
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import UserList from '@/components/UserList';
import { users } from '@/lib/mockData';

const Users: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-1">Users</h1>
            <p className="text-muted-foreground">Manage user accounts and permissions</p>
          </motion.div>

          <UserList users={users} />
        </div>
      </main>
    </div>
  );
};

export default Users;
