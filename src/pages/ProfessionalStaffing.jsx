import ServicePageTemplate from '../components/templates/ServicePageTemplate.jsx';
import { getServiceBySlug } from '../data/services.js';

export default function ProfessionalStaffing() {
  return <ServicePageTemplate service={getServiceBySlug('professional-staffing')} />;
}
