
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const GenericForm: React.FC = () => {
  return (
    <>
      <div>
        <Label htmlFor="full-name">Full Name</Label>
        <Input id="full-name" placeholder="Enter your full name" />
      </div>
      
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" placeholder="Enter your phone number" />
      </div>
      
      <div>
        <Label htmlFor="address">Address</Label>
        <Textarea id="address" placeholder="Enter your address" />
      </div>
    </>
  );
};

export default GenericForm;
