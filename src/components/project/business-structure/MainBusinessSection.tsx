import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, ExternalLink, MapPin, Calendar, Users, Globe } from 'lucide-react';
import { Project } from '@/types/project';
interface MainBusinessSectionProps {
  project: Project;
}
const MainBusinessSection: React.FC<MainBusinessSectionProps> = ({
  project
}) => {
  const navigate = useNavigate();
  const formatAddress = (address: any) => {
    if (!address) return 'N/A';
    const parts = [];
    if (address.street) parts.push(address.street);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.zip_code) parts.push(address.zip_code);
    return parts.length > 0 ? parts.join(', ') : 'N/A';
  };
  const handleAddressClick = (address: any) => {
    if (!address) return;
    const addressString = formatAddress(address);
    if (addressString !== 'N/A') {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressString)}`;
      window.open(googleMapsUrl, '_blank');
    }
  };
  const handleViewDetails = () => {
    navigate(`/business/${project.project_id}`);
  };
  return;
};
export default MainBusinessSection;