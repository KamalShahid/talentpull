import { useParams } from 'react-router-dom';
import PagePlaceholder from '../components/PagePlaceholder.jsx';
export default function CandidateTipArticle() {
  const { slug } = useParams();
  return <PagePlaceholder title={`Candidate Tip: ${slug}`} route={`/candidate-tips/${slug}`} />;
}
