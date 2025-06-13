
import React from 'react';
import { Project } from '@/types/project';
import MainBusinessSection from './business-structure/MainBusinessSection';
import OwnersSection from './business-structure/OwnersSection';
import LoansSection from './business-structure/LoansSection';
import SellersSection from './business-structure/SellersSection';

interface ProjectBusinessStructureProps {
  project: Project;
  onAddOwner: () => void;
  onAddSeller: () => void;
  onAddAffiliatedBusiness: (ownerId: string) => void;
}

const ProjectBusinessStructure: React.FC<ProjectBusinessStructureProps> = ({
  project,
  onAddOwner,
  onAddSeller,
  onAddAffiliatedBusiness
}) => {
  return (
    <div className="space-y-6">
      <MainBusinessSection project={project} />
      <OwnersSection 
        onAddOwner={onAddOwner}
        onAddAffiliatedBusiness={onAddAffiliatedBusiness}
      />
      <LoansSection project={project} />
      <SellersSection 
        project={project} 
        onAddSeller={onAddSeller} 
      />
    </div>
  );
};

export default ProjectBusinessStructure;
