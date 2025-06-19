import React from 'react';
import { Project } from '@/types/project';
import BorrowingEntityCard from './borrower-ownership/BorrowingEntityCard';
import OwnershipStructureCard from './borrower-ownership/OwnershipStructureCard';
import AffiliatedBusinessesCard from './borrower-ownership/AffiliatedBusinessesCard';
interface BorrowerOwnershipSectionProps {
  project: Project;
}
const BorrowerOwnershipSection: React.FC<BorrowerOwnershipSectionProps> = ({
  project
}) => {
  return <div className="space-y-6">
      <div>
        
        
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BorrowingEntityCard project={project} />
        <OwnershipStructureCard project={project} />
        <AffiliatedBusinessesCard project={project} />
      </div>
    </div>;
};
export default BorrowerOwnershipSection;