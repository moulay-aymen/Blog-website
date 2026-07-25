import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ArticleCard from './components/ArticleCard';
import SearchAndFilter from './components/SearchAndFilter';
import CommentSection from './components/CommentSection';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';


const calculateReadTime = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};


function Home({ articles }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const categories = ['Tous', ...new Set(articles.map(a => a.category))];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Hero />
      <div className="container pb-5">
        <SearchAndFilter 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {filteredArticles.length === 0 ? (
          <div className="text-center py-5">
            <h4 style={{ color: 'var(--text-muted)' }} className="brand-font">Aucun article ne correspond à votre recherche.</h4>
          </div>
        ) : (
          <div className="row">
            {filteredArticles.map(article => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                readTime={calculateReadTime(article.content)} 
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}


function ArticleDetail({ articles }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

  const currentIndex = articles.findIndex(a => a.slug === slug);
  const article = articles[currentIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="container text-center py-5" style={{ marginTop: '100px' }}>
        <h2 className="brand-font text-white">Article introuvable</h2>
        <Link to="/" className="btn btn-accent mt-3">Retour à l'accueil</Link>
      </div>
    );
  }

  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const readTime = calculateReadTime(article.content);

  return (
    <>
      <div className="reading-progress" style={{ width: `${scrollProgress}%` }}></div>
      
      <div className="container py-5" style={{ marginTop: '80px', maxWidth: '800px' }}>
        <button onClick={() => navigate(-1)} className="btn btn-sm btn-link text-decoration-none d-flex align-items-center gap-2 mb-4 p-0" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={16} /> Retour
        </button>

        <span className="badge px-3 py-2 rounded-pill fw-semibold mb-3" style={{ background: 'var(--accent)', color: '#090d16' }}>
          {article.category}
        </span>

        <h1 className="display-5 fw-bold brand-font mb-4" style={{ color: 'var(--text-primary)' }}>
          {article.title}
        </h1>

        <div className="d-flex align-items-center justify-content-between py-3 mb-4 border-top border-bottom" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
          <div className="d-flex align-items-center gap-3 small">
            <span className="fw-semibold" style={{ color: 'var(--text-primary)' }}>Par {article.author}</span>
            <span>•</span>
            <span className="d-flex align-items-center gap-1"><Calendar size={14} /> {article.date}</span>
            <span>•</span>
            <span className="d-flex align-items-center gap-1"><Clock size={14} /> {readTime} min</span>
          </div>
        </div>

        <div className="rounded-4 overflow-hidden mb-5 shadow-sm" style={{ maxHeight: '420px' }}>
          <img src={article.image} alt={article.title} className="w-100 object-fit-cover" style={{ height: '400px' }} />
        </div>

        <div className="article-content fs-5 lh-lg mb-5" style={{ color: 'var(--text-muted)', whiteSpace: 'pre-line' }}>
          {article.content}
        </div>

  
        <div className="d-flex justify-content-between align-items-center py-4 border-top border-bottom my-5" style={{ borderColor: 'var(--border-color)' }}>
          {prevArticle ? (
            <Link to={`/article/${prevArticle.slug}`} className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2 text-decoration-none border-0" style={{ color: 'var(--text-primary)' }}>
              <ArrowLeft size={16} /> <span className="text-truncate" style={{ maxWidth: '200px' }}>{prevArticle.title}</span>
            </Link>
          ) : <div />}

          {nextArticle && (
            <Link to={`/article/${nextArticle.slug}`} className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2 text-decoration-none ms-auto border-0" style={{ color: 'var(--text-primary)' }}>
              <span className="text-truncate" style={{ maxWidth: '200px' }}>{nextArticle.title}</span> <ArrowRight size={16} />
            </Link>
          )}
        </div>

        <CommentSection articleSlug={article.slug} />
      </div>
    </>
  );
}


export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/articles.json')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => console.error("Erreur de chargement des articles:", err));
  }, []);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ background: '#090d16' }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-vh-100 d-flex flex-column">
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home articles={articles} />} />
            <Route path="/article/:slug" element={<ArticleDetail articles={articles} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
