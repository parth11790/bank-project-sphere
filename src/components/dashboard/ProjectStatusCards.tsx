
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

  const cards = [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: Database,
      className: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Active Projects",
      value: activeProjects,
      icon: CheckCircle,
      className: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Pending Projects",
      value: pendingProjects,
      icon: Clock,
      className: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      title: "Total Loan Value",
      value: formattedTotalValue,
      icon: BarChart3,
      className: "bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="border shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
              <h2 className="text-2xl font-bold mt-1">{card.value}</h2>
            </div>
            <div className={`p-2 rounded-full ${card.className}`}>
              <card.icon className="h-5 w-5 text-foreground" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectStatusCards;
