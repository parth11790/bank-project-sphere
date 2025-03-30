
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface ActivityItem {
  id: string;
  text: string;
  time: string;
}

interface RecentActivityCardProps {
  activities: ActivityItem[];
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ activities }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates on this project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="flex flex-col space-y-1 pb-3 border-b last:border-b-0">
              <p className="text-sm">{activity.text}</p>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
