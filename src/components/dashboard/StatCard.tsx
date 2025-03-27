
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  change: string;
  positive: boolean;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, change, positive, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-border/50 hover-lift">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="p-2 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className={`flex items-center text-xs font-medium ${positive ? 'text-green-500' : 'text-red-500'}`}>
              {positive ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
              {change}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-1">{value}</div>
          <p className="text-sm text-muted-foreground">{title}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
