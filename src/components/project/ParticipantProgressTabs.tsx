
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface ParticipantProgress {
  userId: string;
  role: string;
  documents: { assigned: number; completed: number };
  forms: { assigned: number; completed: number };
}

interface ParticipantProgressTabsProps {
  buyerParticipants: ParticipantProgress[];
  sellerParticipants: ParticipantProgress[];
  bankParticipants: ParticipantProgress[];
  getUserById: (userId: string) => any;  // Function to get user by ID
}

const ParticipantProgressTabs: React.FC<ParticipantProgressTabsProps> = ({
  buyerParticipants,
  sellerParticipants,
  bankParticipants,
  getUserById
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Participant Progress</CardTitle>
        <CardDescription>Document and form completion status by participant</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buyers">
          <TabsList className="mb-4">
            <TabsTrigger value="buyers">Buyers</TabsTrigger>
            <TabsTrigger value="sellers">Sellers</TabsTrigger>
            <TabsTrigger value="bank">Bank Personnel</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buyers">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Participant</TableHead>
                  <TableHead className="text-center">Documents</TableHead>
                  <TableHead className="text-center">Forms</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buyerParticipants.length > 0 ? (
                  buyerParticipants.map((participant) => {
                    const user = getUserById(participant.userId);
                    if (!user) return null;
                    
                    return (
                      <TableRow key={participant.userId}>
                        <TableCell className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center">
                            <span>{participant.documents.completed}/{participant.documents.assigned}</span>
                            <Progress 
                              value={(participant.documents.completed / (participant.documents.assigned || 1)) * 100} 
                              className="h-1.5 w-24 mt-1" 
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center">
                            <span>{participant.forms.completed}/{participant.forms.assigned}</span>
                            <Progress 
                              value={(participant.forms.completed / (participant.forms.assigned || 1)) * 100} 
                              className="h-1.5 w-24 mt-1" 
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                      No buyers for this project
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="sellers">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Participant</TableHead>
                  <TableHead className="text-center">Documents</TableHead>
                  <TableHead className="text-center">Forms</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sellerParticipants.length > 0 ? (
                  sellerParticipants.map((participant) => {
                    const user = getUserById(participant.userId);
                    if (!user) return null;
                    
                    return (
                      <TableRow key={participant.userId}>
                        <TableCell className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center">
                            <span>{participant.documents.completed}/{participant.documents.assigned}</span>
                            <Progress 
                              value={(participant.documents.completed / (participant.documents.assigned || 1)) * 100} 
                              className="h-1.5 w-24 mt-1" 
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center">
                            <span>{participant.forms.completed}/{participant.forms.assigned}</span>
                            <Progress 
                              value={(participant.forms.completed / (participant.forms.assigned || 1)) * 100} 
                              className="h-1.5 w-24 mt-1" 
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                      No sellers for this project
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="bank">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Personnel</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bankParticipants.length > 0 ? (
                  bankParticipants.map((participant) => {
                    const user = getUserById(participant.userId);
                    if (!user) return null;
                    
                    return (
                      <TableRow key={participant.userId}>
                        <TableCell className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {user.role.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-4 text-muted-foreground">
                      No bank personnel assigned to this project
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ParticipantProgressTabs;
