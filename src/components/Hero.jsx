import React from 'react';
import { Terminal, Code2, Cpu } from 'lucide-react';

export default function Hero() {
  return (
    <div className="hero-section text-center">
      <div className="container py-4">
        <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3" style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', color: 'var(--accent)' }}>
          <Terminal size={14} />
          <span className="small fw-semibold">Exploration Front-End & Architecture Web</span>
        </div>
        <h1 className="display-4 fw-bold brand-font mb-3" style={{ color: 'var(--text-primary)' }}>
          Le futur du code, <br />
          <span style={{ background: 'linear-gradient(135deg, var(--accent), #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            décrypté avec passion.
          </span>
        </h1>
        <p className="lead mx-auto mb-4" style={{ maxWidth: '650px', color: 'var(--text-muted)' }}>
          Plongez au cœur des tendances React, du design system moderne et des meilleures pratiques d'ingénierie front-end.
        </p>
        <div className="d-flex justify-content-center gap-4 text-muted small">
          <div className="d-flex align-items-center gap-1" style={{ color: 'var(--text-primary)' }}><Code2 size={16} className="text-primary" /> React & Vite</div>
          <div className="d-flex align-items-center gap-1" style={{ color: 'var(--text-primary)' }}><Cpu size={16} className="text-primary" /> Performance & UX</div>
        </div>
      </div>
    </div>
  );
}