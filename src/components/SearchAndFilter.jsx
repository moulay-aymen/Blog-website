import React from 'react';
import { Search } from 'lucide-react';

export default function SearchAndFilter({ searchTerm, setSearchTerm, categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="row mb-5 align-items-center g-3">
      <div className="col-lg-5">
        <div className="position-relative">
          <Search className="position-absolute top-50 translate-middle-y ms-3" size={18} style={{ color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-control search-input" 
            placeholder="Rechercher un article par titre ou mot-clé..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="col-lg-7">
        <div className="d-flex flex-wrap gap-2 justify-lg-content-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-badge ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}