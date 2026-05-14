import { useParams } from 'react-router-dom';
import ArticlePageTemplate from '../components/templates/ArticlePageTemplate.jsx';
import { getCandidateTipBySlug } from '../data/candidateTips.js';

export default function CandidateTipArticle() {
  const { slug } = useParams();
  const article = getCandidateTipBySlug(slug);
  return <ArticlePageTemplate article={article} backLabel="All Candidate Tips" backTo="/candidate-tips" />;
}
