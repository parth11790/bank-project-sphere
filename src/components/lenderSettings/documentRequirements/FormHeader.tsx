
import React from 'react';

const FormHeader = () => {
  return (
    <div>
      <h3 className="text-lg font-medium">Add Required Document</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Specify which forms are required for different participants based on loan type and amount.
      </p>
    </div>
  );
};

export default FormHeader;
