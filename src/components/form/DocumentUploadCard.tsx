
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentUploadCardProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const DocumentUploadCard: React.FC<DocumentUploadCardProps> = ({ file, setFile }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast(`File "${e.target.files[0].name}" uploaded successfully`);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Upload</CardTitle>
        <CardDescription>Upload related documents for this form</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Upload Document</h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop files here or click to browse
          </p>
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              Select File
            </label>
          </Button>
          {file && (
            <div className="mt-4 text-sm text-muted-foreground">
              Selected file: {file.name}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUploadCard;
