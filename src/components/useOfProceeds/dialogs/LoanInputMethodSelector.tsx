
import React from 'react';

interface LoanInputMethodSelectorProps {
  loanInputMethod: 'select' | 'manual';
  onMethodChange: (method: 'select' | 'manual') => void;
  projectLoansCount: number;
}

const LoanInputMethodSelector: React.FC<LoanInputMethodSelectorProps> = ({
  loanInputMethod,
  onMethodChange,
  projectLoansCount
}) => {
  return (
    <div>
      <label className="text-sm font-medium mb-3 block">How would you like to add loan details?</label>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <input 
            type="radio" 
            id="selectLoan" 
            name="loanMethod"
            checked={loanInputMethod === 'select'}
            onChange={() => onMethodChange('select')}
            className="rounded border-gray-300"
            disabled={projectLoansCount === 0}
          />
          <label htmlFor="selectLoan" className="text-sm">
            Select from project loans {projectLoansCount === 0 ? '(No loans available)' : `(${projectLoansCount} available)`}
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input 
            type="radio" 
            id="manualLoan" 
            name="loanMethod"
            checked={loanInputMethod === 'manual'}
            onChange={() => onMethodChange('manual')}
            className="rounded border-gray-300"
          />
          <label htmlFor="manualLoan" className="text-sm">Enter loan details manually</label>
        </div>
      </div>
    </div>
  );
};

export default LoanInputMethodSelector;
