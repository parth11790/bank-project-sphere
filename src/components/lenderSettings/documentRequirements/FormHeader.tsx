
import React from 'react';

const FormHeader = () => {
  return (
    <div className="mb-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
        <h3 className="text-base sm:text-lg font-medium">Add Required Document</h3>
        <p className="text-xs text-muted-foreground">
          Specify which forms are required for different participants based on loan type and amount.
        </p>
      </div>
    </div>
  );
};

export default FormHeader;
