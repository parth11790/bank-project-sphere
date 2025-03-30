
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus } from 'lucide-react';

interface Document {
  document_id: string;
  name: string;
}

interface DocumentsListProps {
  title: string;
  documents: Document[];
  onAssign: () => void;
}

const DocumentsList: React.FC<DocumentsListProps> = ({
  title,
  documents,
  onAssign,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{title}</h3>
        <Button variant="outline" size="sm" onClick={onAssign}>
          <Plus className="h-3 w-3 mr-1" />
          Assign
        </Button>
      </div>
      {documents.length === 0 ? (
        <p className="text-sm text-muted-foreground">No documents assigned</p>
      ) : (
        <div className="grid gap-2">
          {documents.map(doc => (
            <div key={doc.document_id} className="flex items-center justify-between p-2 bg-muted rounded-md">
              <div className="flex items-center">
                <FileText className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                <span className="text-sm">{doc.name}</span>
              </div>
              <Badge variant="outline" className="text-xs">Required</Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentsList;
