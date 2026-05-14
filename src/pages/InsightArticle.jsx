import { useParams } from 'react-router-dom';
import ArticlePageTemplate from '../components/templates/ArticlePageTemplate.jsx';
import { getInsightBySlug } from '../data/insights.js';

export default function InsightArticle() {
  const { slug } = useParams();
  const article = getInsightBySlug(slug);
  return <ArticlePageTemplate article={article} backLabel="All Insights" backTo="/insights" />;
}
