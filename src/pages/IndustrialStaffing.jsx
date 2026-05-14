import ServicePageTemplate from '../components/templates/ServicePageTemplate.jsx';
import { getServiceBySlug } from '../data/services.js';

export default function IndustrialStaffing() {
  return <ServicePageTemplate service={getServiceBySlug('industrial-staffing')} />;
}
