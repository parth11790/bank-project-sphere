
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PortfolioSummaryProps {
  projectsCount: number;
  formattedTotalValue: string;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ projectsCount, formattedTotalValue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="h-full border-border/50">
        <CardHeader className="pb-3">
          <CardTitle>Portfolio Summary</CardTitle>
          <CardDescription>Current loan portfolio analysis</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col h-[calc(100%-80px)] justify-between">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full h-64 relative flex items-center justify-center bg-muted/30 rounded-lg">
              <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Chart visualization</p>
                  <p className="text-xs text-muted-foreground/70">(Demo only)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-sm text-muted-foreground mb-1">Projects</div>
              <div className="text-2xl font-bold">{projectsCount}</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-3">
              <div className="text-sm text-primary/80 mb-1">Total Value</div>
              <div className="text-xl font-bold text-primary">{formattedTotalValue}</div>
            </div>
          </div>
          
          <Button variant="outline" className="w-full mt-6" asChild>
            <Link to="/use-of-proceeds" className="flex items-center justify-center gap-1">
              Financial Details <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PortfolioSummary;
