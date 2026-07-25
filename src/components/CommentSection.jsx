import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';

export default function CommentSection({ articleSlug }) {
  const storageKey = `devpulse_comments_${articleSlug}`;
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [
      { id: 1, author: "Julie Dev", text: "Super article, très clair et instructif !", date: "Il y a 2 jours" }
    ];
  });
  
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(comments));
  }, [comments, storageKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: authorName.trim(),
      text: commentText.trim(),
      date: "À l'instant"
    };

    setComments([newComment, ...comments]);
    setAuthorName('');
    setCommentText('');
  };

  return (
    <div className="mt-5 pt-5 border-top" style={{ borderColor: 'var(--border-color)' }}>
      <h4 className="fw-bold brand-font mb-4 d-flex align-items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <MessageSquare size={20} /> Commentaires ({comments.length})
      </h4>

      {/* Formulaire d'ajout */}
      <form onSubmit={handleSubmit} className="glass-card p-4 mb-4 border-0">
        <div className="mb-3">
          <label className="form-label small fw-semibold" style={{ color: 'var(--text-primary)' }}>Votre nom</label>
          <input 
            type="text" 
            className="form-control" 
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label small fw-semibold" style={{ color: 'var(--text-primary)' }}>Votre commentaire</label>
          <textarea 
            className="form-control" 
            rows="3"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-accent d-flex align-items-center gap-2">
          <Send size={16} /> Publier le commentaire
        </button>
      </form>

      {/* Liste des commentaires */}
      <div className="d-flex flex-column gap-3">
        {comments.map((c) => (
          <div key={c.id} className="p-3 rounded-3 glass-card border-0" style={{ background: 'var(--bg-secondary)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="fw-bold small d-flex align-items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <span className="p-1 rounded-circle bg-secondary text-white d-inline-flex"><User size={12} /></span>
                {c.author}
              </span>
              <span className="small text-muted">{c.date}</span>
            </div>
            <p className="small mb-0" style={{ color: 'var(--text-muted)' }}>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}