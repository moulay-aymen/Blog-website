import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top glass-nav px-3 py-3">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold text-decoration-none" style={{ color: 'var(--text-primary)' }}>
          <div className="p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ background: 'var(--accent)', color: '#090d16' }}>

          </div>
          <span className="brand-font fs-4 tracking-tight">DevPulse<span style={{ color: 'var(--accent)' }}>.</span></span>
        </Link>
        
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="btn btn-sm btn-link text-decoration-none fw-semibold" style={{ color: 'var(--text-primary)' }}>
            Articles
          </Link>
        </div>
      </div>
    </nav>
  );
}