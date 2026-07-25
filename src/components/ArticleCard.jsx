import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

export default function ArticleCard({ article, readTime }) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card glass-card h-100 border-0 overflow-hidden">
        <div className="position-relative overflow-hidden" style={{ height: '210px' }}>
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-100 h-100 object-fit-cover transition-transform duration-500"
            style={{ transition: 'transform 0.5s ease' }}
            loading="lazy"
          />
          <span className="position-absolute top-0 start-0 m-3 badge px-3 py-2 rounded-pill fw-semibold shadow-sm" style={{ background: 'var(--accent)', color: '#fff' }}>
            {article.category}
          </span>
        </div>
        
        <div className="card-body d-flex flex-column p-4">
          <div className="d-flex align-items-center gap-3 small mb-2" style={{ color: 'var(--text-muted)' }}>
            <span className="d-flex align-items-center gap-1"><Calendar size={13} /> {article.date}</span>
            <span>•</span>
            <span className="d-flex align-items-center gap-1"><Clock size={13} /> {readTime} min de lecture</span>
          </div>
          
          <h3 className="h5 fw-bold brand-font mb-2" style={{ color: 'var(--text-primary)' }}>
            <Link to={`/article/${article.slug}`} className="text-decoration-none stretched-link" style={{ color: 'inherit' }}>
              {article.title}
            </Link>
          </h3>
          
          <p className="small mb-4 flex-grow-1" style={{ color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {article.excerpt}
          </p>
          
          <div className="d-flex align-items-center justify-content-between pt-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
            <span className="small fw-semibold" style={{ color: 'var(--text-primary)' }}>Par {article.author}</span>
            <span className="d-flex align-items-center gap-1 small fw-bold" style={{ color: 'var(--accent)' }}>
              Lire <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}