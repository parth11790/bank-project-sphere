
import React from 'react';
import { Project } from '@/types/project';
import MainBusinessSection from './business-structure/MainBusinessSection';
import LoansSection from './business-structure/LoansSection';
import EditableBusinessAcquisitionSection from '@/components/business/EditableBusinessAcquisitionSection';

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
      <LoansSection project={project} />
      <EditableBusinessAcquisitionSection projectId={project.project_id} />
    </div>
  );
};

export default ProjectBusinessStructure;
