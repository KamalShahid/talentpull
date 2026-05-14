import ServicePageTemplate from '../components/templates/ServicePageTemplate.jsx';
import { getServiceBySlug } from '../data/services.js';

export default function FinancialSupport() {
  return <ServicePageTemplate service={getServiceBySlug('financial-support')} />;
}
