
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, CheckCircle, Clock, Database } from 'lucide-react';

interface ProjectStatusCardsProps {
  totalProjects: number;
  activeProjects: number;
  pendingProjects: number;
  totalValue: number;
}

const ProjectStatusCards: React.FC<ProjectStatusCardsProps> = ({
  totalProjects,
  activeProjects,
  pendingProjects,
  totalValue
}) => {
  // Format the total value as currency
  const formattedTotalValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(totalValue);

  const cards = [{
    title: "Total Projects",
    value: totalProjects,
    icon: Database,
    className: "bg-blue-50 dark:bg-blue-900/20"
  }, {
    title: "Active Projects",
    value: activeProjects,
    icon: CheckCircle,
    className: "bg-green-50 dark:bg-green-900/20"
  }, {
    title: "Pending Projects",
    value: pendingProjects,
    icon: Clock,
    className: "bg-amber-50 dark:bg-amber-900/20"
  }, {
    title: "Total Loan Value",
    value: formattedTotalValue,
    icon: BarChart3,
    className: "bg-purple-50 dark:bg-purple-900/20"
  }];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className={card.className}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectStatusCards;
