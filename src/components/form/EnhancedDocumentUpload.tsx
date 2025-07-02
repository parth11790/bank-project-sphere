import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { ocrService, type OCRResult } from '@/services/ocrService';

interface EnhancedDocumentUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
  formType: string;
  year?: string;
  onDataParsed?: (data: Record<string, string>) => void;
  title?: string;
  description?: string;
}

const EnhancedDocumentUpload: React.FC<EnhancedDocumentUploadProps> = ({ 
  file, 
  setFile, 
  formType,
  year,
  onDataParsed,
  title = "Document Upload",
  description = "Upload documents to auto-fill form fields using OCR"
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setOcrResult(null);
      
      // Auto-start OCR processing
      await processOCR(selectedFile);
    }
  };

  const processOCR = async (fileToProcess: File) => {
    setIsProcessing(true);
    
    try {
      const result = await ocrService.parseDocument(fileToProcess, formType, year);
      setOcrResult(result);
      
      if (result.success && result.data && onDataParsed) {
        onDataParsed(result.data);
      }
    } catch (error) {
      console.error('OCR processing failed:', error);
      setOcrResult({
        success: false,
        error: 'OCR processing failed'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetryOCR = () => {
    if (file) {
      processOCR(file);
    }
  };

  const getStatusIcon = () => {
    if (isProcessing) {
      return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
    }
    if (ocrResult?.success) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    if (ocrResult && !ocrResult.success) {
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
    return <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />;
  };

  const getStatusText = () => {
    if (isProcessing) {
      return "Processing document with OCR...";
    }
    if (ocrResult?.success) {
      return "Document processed successfully! Form fields have been auto-filled.";
    }
    if (ocrResult && !ocrResult.success) {
      return "OCR processing failed. You can enter values manually or retry.";
    }
    return "Drag and drop files here or click to browse";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title}
          {(file && !isProcessing) && getStatusIcon()}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          {!file ? (
            <>
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Upload Document</h3>
              <p className="text-muted-foreground mb-4">
                {getStatusText()}
              </p>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                {getStatusIcon()}
                {!isProcessing && (
                  <div>
                    <h3 className="text-lg font-medium">{file.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {getStatusText()}
                    </p>
                  </div>
                )}
              </div>
              
              {isProcessing && (
                <p className="text-sm text-muted-foreground">
                  Please wait while we extract data from your document...
                </p>
              )}

              {ocrResult && !ocrResult.success && (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetryOCR}
                    disabled={isProcessing}
                  >
                    Retry OCR Processing
                  </Button>
                </div>
              )}

              {ocrResult?.success && onDataParsed && (
                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                  ✓ Form fields have been auto-filled. Review and modify values as needed.
                </div>
              )}
            </div>
          )}
          
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.tiff"
            onChange={handleFileChange}
            disabled={isProcessing}
          />
          
          {!file && (
            <Button asChild disabled={isProcessing}>
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Select File
              </label>
            </Button>
          )}
          
          {file && (
            <div className="flex gap-2 justify-center mt-4">
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Change File
                </label>
              </Button>
            </div>
          )}
        </div>
        
        {file && (
          <div className="mt-4 text-xs text-muted-foreground text-center">
            Supported formats: PDF, JPG, PNG, TIFF
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedDocumentUpload;