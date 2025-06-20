import React from 'react';
import './searchbar.css';
import { FiSearch } from "react-icons/fi";

function SearchBar({ value, onChange }) {
    return (
        <div className="search-container">
            <label htmlFor="search-input" className="visually-hidden">Search Products</label>
            <input
                id="search-input"
                name="search"
                type="text"
                className="search-input cursor-hover"
                placeholder="Search..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <button className="search-button cursor-hover" aria-label="Search">
                <FiSearch className="search-icon" />
            </button>
        </div>
    );
}

export default SearchBar;
