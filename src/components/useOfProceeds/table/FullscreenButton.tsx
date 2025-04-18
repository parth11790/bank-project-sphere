
import React from 'react';
import { Button } from '@/components/ui/button';
import { Maximize2 } from 'lucide-react';

interface FullscreenButtonProps {
  onClick: () => void;
}

const FullscreenButton: React.FC<FullscreenButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="absolute right-0 -top-10 z-20"
      onClick={onClick}
    >
      <Maximize2 className="h-4 w-4" />
      <span className="ml-2">Full Screen</span>
    </Button>
  );
};

export default FullscreenButton;
