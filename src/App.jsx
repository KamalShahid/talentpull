import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';

const Home                  = lazy(() => import('./pages/Home.jsx'));
const WorkforceSolutions    = lazy(() => import('./pages/WorkforceSolutions.jsx'));
const ProfessionalStaffing  = lazy(() => import('./pages/ProfessionalStaffing.jsx'));
const IndustrialStaffing    = lazy(() => import('./pages/IndustrialStaffing.jsx'));
const PayrollSolutions      = lazy(() => import('./pages/PayrollSolutions.jsx'));
const FinancialSupport      = lazy(() => import('./pages/FinancialSupport.jsx'));
const HealthSafety          = lazy(() => import('./pages/HealthSafety.jsx'));
const Industries            = lazy(() => import('./pages/Industries.jsx'));
const JobSeekers            = lazy(() => import('./pages/JobSeekers.jsx'));
const Insights              = lazy(() => import('./pages/Insights.jsx'));
const InsightArticle        = lazy(() => import('./pages/InsightArticle.jsx'));
const CandidateTips         = lazy(() => import('./pages/CandidateTips.jsx'));
const CandidateTipArticle   = lazy(() => import('./pages/CandidateTipArticle.jsx'));
const FAQ                   = lazy(() => import('./pages/FAQ.jsx'));
const Contact               = lazy(() => import('./pages/Contact.jsx'));
const NotFound              = lazy(() => import('./pages/NotFound.jsx'));

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-tp-dark/60">
      <div className="h-10 w-10 rounded-full border-2 border-tp-red/30 border-t-tp-red animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/workforce-solutions" element={<WorkforceSolutions />} />
          <Route path="/workforce-solutions/professional-staffing" element={<ProfessionalStaffing />} />
          <Route path="/workforce-solutions/industrial-staffing"   element={<IndustrialStaffing />} />
          <Route path="/workforce-solutions/payroll-solutions"     element={<PayrollSolutions />} />
          <Route path="/workforce-solutions/financial-support"     element={<FinancialSupport />} />
          <Route path="/workforce-solutions/health-safety"         element={<HealthSafety />} />
          <Route path="/industries"               element={<Industries />} />
          <Route path="/job-seekers"              element={<JobSeekers />} />
          <Route path="/insights"                 element={<Insights />} />
          <Route path="/insights/:slug"           element={<InsightArticle />} />
          <Route path="/candidate-tips"           element={<CandidateTips />} />
          <Route path="/candidate-tips/:slug"     element={<CandidateTipArticle />} />
          <Route path="/faq"                      element={<FAQ />} />
          <Route path="/contact"                  element={<Contact />} />
          <Route path="*"                         element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
