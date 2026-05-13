import { useParams } from 'react-router-dom';
import PagePlaceholder from '../components/PagePlaceholder.jsx';
export default function InsightArticle() {
  const { slug } = useParams();
  return <PagePlaceholder title={`Insight: ${slug}`} route={`/insights/${slug}`} />;
}
