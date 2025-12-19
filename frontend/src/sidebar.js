// frontend/src/Sidebar.js
import React from 'react';

function Sidebar({ currentFilter, setFilter, isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>Menu</h2>
      </div>
      <ul className="sidebar-menu">
        <li 
          className={currentFilter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          🏠 Semua Tugas
        </li>
        <li 
          className={currentFilter === 'active' ? 'active' : ''} 
          onClick={() => setFilter('active')}
        >
          ⏳ Belum Selesai
        </li>
        <li 
          className={currentFilter === 'completed' ? 'active' : ''} 
          onClick={() => setFilter('completed')}
        >
          ✅ Selesai
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;