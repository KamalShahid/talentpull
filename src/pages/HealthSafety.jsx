import ServicePageTemplate from '../components/templates/ServicePageTemplate.jsx';
import { getServiceBySlug } from '../data/services.js';

export default function HealthSafety() {
  return <ServicePageTemplate service={getServiceBySlug('health-safety')} />;
}
