
import { toast } from 'sonner';

export const useUseOfProceedsLoanTypes = () => {
  const determineLoanTypes = (updatedData: any) => {
    const hasConstruction = updatedData.some((item: any) => 
      item.overall_category === 'Construction' && item.value > 0
    );
    
    const hasRefinance = updatedData.some((item: any) => 
      item.row_name === 'REFINANCE' && item.value > 0
    );
    
    const hasWorkingCapital = updatedData.some((item: any) => 
      item.overall_category === 'Working Capital' && item.value > 0
    );
    
    const determinedLoanTypes = [];
    
    if (hasConstruction) determinedLoanTypes.push('504');
    if (hasRefinance) determinedLoanTypes.push('7(a) GP');
    if (hasWorkingCapital) determinedLoanTypes.push('Express');
    if (determinedLoanTypes.length === 0) determinedLoanTypes.push('Conventional');
    
    return determinedLoanTypes;
  };

  const handleSave = (updatedData: any) => {
    const loanTypes = determineLoanTypes(updatedData);
    toast(`Data Saved - Loan types: ${loanTypes.join(', ')} (Demo only)`);
  };

  return { handleSave };
};
