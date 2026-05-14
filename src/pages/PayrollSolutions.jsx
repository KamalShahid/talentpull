import ServicePageTemplate from '../components/templates/ServicePageTemplate.jsx';
import { getServiceBySlug } from '../data/services.js';

export default function PayrollSolutions() {
  return <ServicePageTemplate service={getServiceBySlug('payroll-solutions')} />;
}
