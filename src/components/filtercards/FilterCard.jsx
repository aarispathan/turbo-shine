import React from "react";
import "./filtercard.css";
import { FaBoxOpen, FaMusic, FaTags, FaMobileAlt, FaStar, FaDollarSign, FaTv } from "react-icons/fa";
import { GrGamepad } from "react-icons/gr";
import { ImMobile2 } from "react-icons/im";

function FilterCard({
    categories = [],
    selectedCategory,
    setSelectedCategory,
    minPrice,
    maxPrice,
    setPriceRange,
}) {
    const categoryIcons = {
        "All": <FaBoxOpen />,
        "audio": <FaMusic />,
        "gaming": <GrGamepad />,
        "mobile": <ImMobile2 />,
        "tv": <FaTv />,
    };

    return (
        <div className="filter-card">
            <div className="filter-group">
                <span className="filter-label">Category:</span>
                <div className="category-buttons">
                    <button
                        className={`cursor-hover ${!selectedCategory ? "active" : ""}`}
                        onClick={() => setSelectedCategory("")}
                    >
                        All
                        <span className="button-icon"><FaBoxOpen /></span>
                    </button>

                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className={`cursor-hover ${selectedCategory === category ? "active" : ""}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                            <span className="button-icon">
                                {categoryIcons[category.toLowerCase()] || <FaTags />}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="filter-min-max" >
                <div className="filter-group">
                    <span htmlFor="minPrice">
                        <FaDollarSign style={{ marginRight: "4px" }} />
                        Min Price:
                    </span>
                    <input
                        type="number"
                        id="minPrice"
                        className="cursor-hover"
                        value={minPrice}
                        onChange={(e) =>
                            setPriceRange((prev) => ({ ...prev, min: e.target.value }))
                        }
                        placeholder="0"
                    />
                </div>
                <div className="filter-group">
                    <span htmlFor="maxPrice">
                        <FaDollarSign style={{ marginRight: "4px" }} />
                        Max Price:
                    </span>
                    <input
                        type="number"
                        id="maxPrice"
                        className="cursor-hover"
                        value={maxPrice}
                        onChange={(e) =>
                            setPriceRange((prev) => ({ ...prev, max: e.target.value }))
                        }
                        placeholder="9999"
                    />
                </div>
            </div>
        </div>
    );
}

export default FilterCard;
