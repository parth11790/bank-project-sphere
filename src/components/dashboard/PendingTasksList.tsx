
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Clock, Calendar } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: string;
}

interface PendingTasksListProps {
  tasks: Task[];
  onViewAll: () => void;
}

export const PendingTasksList: React.FC<PendingTasksListProps> = ({ tasks, onViewAll }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Pending Tasks</CardTitle>
        <CardDescription>Tasks requiring your attention</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start gap-4 rounded-lg border p-3">
            <div className={`mt-0.5 rounded-full p-1 ${
              task.priority === 'High' ? 'bg-destructive/20 text-destructive' :
              task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
              'bg-green-500/20 text-green-500'
            }`}>
              {task.priority === 'High' ? (
                <AlertCircle className="h-4 w-4" />
              ) : task.priority === 'Medium' ? (
                <Clock className="h-4 w-4" />
              ) : (
                <Calendar className="h-4 w-4" />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{task.title}</p>
              <div className="flex items-center pt-2">
                <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onViewAll}>
          View All Tasks
        </Button>
      </CardFooter>
    </Card>
  );
};
