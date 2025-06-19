
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';

interface ProfessionalResumeFormProps {
  formValues: Record<string, string>;
  onInputChange: (field: string, value: string) => void;
}

const ProfessionalResumeForm: React.FC<ProfessionalResumeFormProps> = ({ 
  formValues, 
  onInputChange 
}) => {
  // Parse education and employment from formValues
  const getEducationEntries = () => {
    const entries = [];
    let i = 0;
    while (formValues[`education_${i}_school_name`] !== undefined || i === 0) {
      entries.push({
        school_name: formValues[`education_${i}_school_name`] || '',
        degree_certification: formValues[`education_${i}_degree_certification`] || '',
        area_of_study: formValues[`education_${i}_area_of_study`] || '',
        start_date: formValues[`education_${i}_start_date`] || '',
        end_date: formValues[`education_${i}_end_date`] || '',
      });
      i++;
    }
    return entries.length > 0 ? entries : [{ school_name: '', degree_certification: '', area_of_study: '', start_date: '', end_date: '' }];
  };

  const getEmploymentEntries = () => {
    const entries = [];
    let i = 0;
    while (formValues[`employment_${i}_employer_name`] !== undefined || i === 0) {
      entries.push({
        employer_name: formValues[`employment_${i}_employer_name`] || '',
        position_title: formValues[`employment_${i}_position_title`] || '',
        start_date: formValues[`employment_${i}_start_date`] || '',
        end_date: formValues[`employment_${i}_end_date`] || '',
        responsibilities: formValues[`employment_${i}_responsibilities`] || '',
        reason_for_leaving: formValues[`employment_${i}_reason_for_leaving`] || '',
      });
      i++;
    }
    return entries.length > 0 ? entries : [{ employer_name: '', position_title: '', start_date: '', end_date: '', responsibilities: '', reason_for_leaving: '' }];
  };

  const educationEntries = getEducationEntries();
  const employmentEntries = getEmploymentEntries();

  const addEducation = () => {
    const newIndex = educationEntries.length;
    onInputChange(`education_${newIndex}_school_name`, '');
    onInputChange(`education_${newIndex}_degree_certification`, '');
    onInputChange(`education_${newIndex}_area_of_study`, '');
    onInputChange(`education_${newIndex}_start_date`, '');
    onInputChange(`education_${newIndex}_end_date`, '');
  };

  const removeEducation = (index: number) => {
    // Remove the specific education entry
    onInputChange(`education_${index}_school_name`, '');
    onInputChange(`education_${index}_degree_certification`, '');
    onInputChange(`education_${index}_area_of_study`, '');
    onInputChange(`education_${index}_start_date`, '');
    onInputChange(`education_${index}_end_date`, '');
  };

  const addEmployment = () => {
    const newIndex = employmentEntries.length;
    onInputChange(`employment_${newIndex}_employer_name`, '');
    onInputChange(`employment_${newIndex}_position_title`, '');
    onInputChange(`employment_${newIndex}_start_date`, '');
    onInputChange(`employment_${newIndex}_end_date`, '');
    onInputChange(`employment_${newIndex}_responsibilities`, '');
    onInputChange(`employment_${newIndex}_reason_for_leaving`, '');
  };

  const removeEmployment = (index: number) => {
    // Remove the specific employment entry
    onInputChange(`employment_${index}_employer_name`, '');
    onInputChange(`employment_${index}_position_title`, '');
    onInputChange(`employment_${index}_start_date`, '');
    onInputChange(`employment_${index}_end_date`, '');
    onInputChange(`employment_${index}_responsibilities`, '');
    onInputChange(`employment_${index}_reason_for_leaving`, '');
  };

  return (
    <div className="space-y-8">
      {/* Education Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Education History</h3>
          <Button type="button" onClick={addEducation} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>

        {educationEntries.map((education, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Education #{index + 1}</CardTitle>
                {educationEntries.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`education_${index}_school_name`}>School Name</Label>
                <Input 
                  id={`education_${index}_school_name`}
                  value={education.school_name}
                  onChange={(e) => onInputChange(`education_${index}_school_name`, e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor={`education_${index}_degree_certification`}>Degree / Certification</Label>
                <Input 
                  id={`education_${index}_degree_certification`}
                  value={education.degree_certification}
                  onChange={(e) => onInputChange(`education_${index}_degree_certification`, e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor={`education_${index}_area_of_study`}>Area of Study</Label>
                <Input 
                  id={`education_${index}_area_of_study`}
                  value={education.area_of_study}
                  onChange={(e) => onInputChange(`education_${index}_area_of_study`, e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Dates Attended</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Start Date</Label>
                    <Input 
                      type="date"
                      value={education.start_date}
                      onChange={(e) => onInputChange(`education_${index}_start_date`, e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">End Date</Label>
                    <Input 
                      type="date"
                      value={education.end_date}
                      onChange={(e) => onInputChange(`education_${index}_end_date`, e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Employment Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Employment History</h3>
            <p className="text-sm text-muted-foreground">Current and Past 5 years</p>
          </div>
          <Button type="button" onClick={addEmployment} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Employment
          </Button>
        </div>

        {employmentEntries.map((employment, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Employment #{index + 1}</CardTitle>
                {employmentEntries.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeEmployment(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`employment_${index}_employer_name`}>Employer Name</Label>
                  <Input 
                    id={`employment_${index}_employer_name`}
                    value={employment.employer_name}
                    onChange={(e) => onInputChange(`employment_${index}_employer_name`, e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor={`employment_${index}_position_title`}>Position / Title</Label>
                  <Input 
                    id={`employment_${index}_position_title`}
                    value={employment.position_title}
                    onChange={(e) => onInputChange(`employment_${index}_position_title`, e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Dates of Employment</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label className="text-xs">Start Date</Label>
                    <Input 
                      type="date"
                      value={employment.start_date}
                      onChange={(e) => onInputChange(`employment_${index}_start_date`, e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">End Date (if applicable)</Label>
                    <Input 
                      type="date"
                      value={employment.end_date}
                      onChange={(e) => onInputChange(`employment_${index}_end_date`, e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor={`employment_${index}_responsibilities`}>Responsibilities</Label>
                <Textarea 
                  id={`employment_${index}_responsibilities`}
                  value={employment.responsibilities}
                  onChange={(e) => onInputChange(`employment_${index}_responsibilities`, e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor={`employment_${index}_reason_for_leaving`}>Reason for Leaving</Label>
                <Textarea 
                  id={`employment_${index}_reason_for_leaving`}
                  value={employment.reason_for_leaving}
                  onChange={(e) => onInputChange(`employment_${index}_reason_for_leaving`, e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalResumeForm;
