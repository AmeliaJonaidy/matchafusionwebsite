import { useState } from 'react';
import './IngredientsPanel.css';

interface Ingredient {
  id: string;
  name: string;
  category: string;
  compatibilityScore: number;
}

interface IngredientsPanelProps {
  onIngredientSelect: (ingredient: Ingredient) => void;
}

export function IngredientsPanel({ onIngredientSelect }: IngredientsPanelProps) {
  const [activeCategory, setActiveCategory] = useState('dairy');

  const categories = [
    { id: 'dairy', name: 'Dairy & Alternatives', icon: '🥛' },
    { id: 'sweeteners', name: 'Sweeteners', icon: '🍯' },
    { id: 'flavors', name: 'Flavors & Extracts', icon: '🌿' },
    { id: 'toppings', name: 'Toppings', icon: '🫐' },
    { id: 'boosters', name: 'Superfoods & Boosters', icon: '✨' }
  ];

  const ingredientsList: Record<string, Ingredient[]> = {
    dairy: [
      { id: 'oat-milk', name: 'Oat Milk', category: 'dairy', compatibilityScore: 95 },
      { id: 'almond-milk', name: 'Almond Milk', category: 'dairy', compatibilityScore: 90 },
      { id: 'coconut-milk', name: 'Coconut Milk', category: 'dairy', compatibilityScore: 85 },
      { id: 'soy-milk', name: 'Soy Milk', category: 'dairy', compatibilityScore: 80 }
    ],
    sweeteners: [
      { id: 'honey', name: 'Honey', category: 'sweeteners', compatibilityScore: 85 },
      { id: 'maple-syrup', name: 'Maple Syrup', category: 'sweeteners', compatibilityScore: 80 },
      { id: 'agave', name: 'Agave Nectar', category: 'sweeteners', compatibilityScore: 75 },
      { id: 'stevia', name: 'Stevia', category: 'sweeteners', compatibilityScore: 70 }
    ],
    flavors: [
      { id: 'vanilla', name: 'Vanilla Extract', category: 'flavors', compatibilityScore: 90 },
      { id: 'cinnamon', name: 'Cinnamon', category: 'flavors', compatibilityScore: 85 },
      { id: 'mint', name: 'Fresh Mint', category: 'flavors', compatibilityScore: 80 },
      { id: 'cocoa', name: 'Cocoa Powder', category: 'flavors', compatibilityScore: 95 }
    ],
    toppings: [
      { id: 'coconut-flakes', name: 'Coconut Flakes', category: 'toppings', compatibilityScore: 85 },
      { id: 'chia-seeds', name: 'Chia Seeds', category: 'toppings', compatibilityScore: 80 },
      { id: 'berries', name: 'Mixed Berries', category: 'toppings', compatibilityScore: 75 },
      { id: 'nuts', name: 'Crushed Nuts', category: 'toppings', compatibilityScore: 70 }
    ],
    boosters: [
      { id: 'collagen', name: 'Collagen Peptides', category: 'boosters', compatibilityScore: 90 },
      { id: 'maca', name: 'Maca Powder', category: 'boosters', compatibilityScore: 85 },
      { id: 'spirulina', name: 'Spirulina', category: 'boosters', compatibilityScore: 75 },
      { id: 'protein', name: 'Vanilla Protein', category: 'boosters', compatibilityScore: 80 }
    ]
  };

  const getCompatibilityClass = (score: number) => {
    if (score >= 90) return 'compatibility-excellent';
    if (score >= 80) return 'compatibility-good';
    if (score >= 70) return 'compatibility-moderate';
    return 'compatibility-low';
  };

  return (
    <div className="ingredients-container">
      {/* Category Selection */}
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
          >
            <span className="category-icon">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Ingredients List */}
      <div className="ingredients-grid">
        {ingredientsList[activeCategory].map((ingredient) => (
          <button
            key={ingredient.id}
            onClick={() => onIngredientSelect(ingredient)}
            className="ingredient-item"
          >
            <span className="ingredient-name">{ingredient.name}</span>
            <div className="compatibility-info">
              <div 
                className={`compatibility-dot ${getCompatibilityClass(ingredient.compatibilityScore)}`}
              />
              <span className="compatibility-score">{ingredient.compatibilityScore}%</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
