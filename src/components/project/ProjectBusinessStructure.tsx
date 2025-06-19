
import React from 'react';
import { Project } from '@/types/project';
import LoansSection from './business-structure/LoansSection';
import AcquisitionSection from './business-structure/AcquisitionSection';

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
      <LoansSection project={project} />
      <AcquisitionSection project={project} />
    </div>
  );
};

export default ProjectBusinessStructure;
