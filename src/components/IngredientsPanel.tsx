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
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId === activeCategory ? null : categoryId);
  };

  const categories = [
    { id: 'dairy', name: 'Dairy & Alternatives', icon: '🥛' },
    { id: 'sweeteners', name: 'Sweeteners', icon: '🍯' },
    { id: 'flavors', name: 'Flavors & Extracts', icon: '🌿' },
    { id: 'toppings', name: 'Toppings', icon: '🫐' },
    { id: 'boosters', name: 'Superfoods & Boosters', icon: '✨' },
    { id: 'teas', name: 'Tea Blends', icon: '🫖' },
    { id: 'spices', name: 'Spices & Seasonings', icon: '🌶️' },
    { id: 'fruits', name: 'Fruits & Preserves', icon: '🍓' }
  ];

  const ingredientsList: Record<string, Ingredient[]> = {
    dairy: [
      { id: 'oat-milk', name: 'Oat Milk', category: 'dairy', compatibilityScore: 95 },
      { id: 'almond-milk', name: 'Almond Milk', category: 'dairy', compatibilityScore: 90 },
      { id: 'coconut-milk', name: 'Coconut Milk', category: 'dairy', compatibilityScore: 85 },
      { id: 'soy-milk', name: 'Soy Milk', category: 'dairy', compatibilityScore: 80 },
      { id: 'cashew-milk', name: 'Cashew Milk', category: 'dairy', compatibilityScore: 88 },
      { id: 'rice-milk', name: 'Rice Milk', category: 'dairy', compatibilityScore: 82 },
      { id: 'macadamia-milk', name: 'Macadamia Milk', category: 'dairy', compatibilityScore: 87 },
      { id: 'oat-cream', name: 'Oat Cream', category: 'dairy', compatibilityScore: 92 }
    ],
    sweeteners: [
      { id: 'honey', name: 'Honey', category: 'sweeteners', compatibilityScore: 85 },
      { id: 'maple-syrup', name: 'Maple Syrup', category: 'sweeteners', compatibilityScore: 80 },
      { id: 'agave', name: 'Agave Nectar', category: 'sweeteners', compatibilityScore: 75 },
      { id: 'stevia', name: 'Stevia', category: 'sweeteners', compatibilityScore: 70 },
      { id: 'monk-fruit', name: 'Monk Fruit', category: 'sweeteners', compatibilityScore: 82 },
      { id: 'date-syrup', name: 'Date Syrup', category: 'sweeteners', compatibilityScore: 78 },
      { id: 'coconut-sugar', name: 'Coconut Sugar', category: 'sweeteners', compatibilityScore: 83 }
    ],
    flavors: [
      { id: 'vanilla', name: 'Vanilla Extract', category: 'flavors', compatibilityScore: 90 },
      { id: 'cinnamon', name: 'Cinnamon', category: 'flavors', compatibilityScore: 85 },
      { id: 'mint', name: 'Fresh Mint', category: 'flavors', compatibilityScore: 80 },
      { id: 'cocoa', name: 'Cocoa Powder', category: 'flavors', compatibilityScore: 95 },
      { id: 'lavender', name: 'Lavender', category: 'flavors', compatibilityScore: 75 },
      { id: 'rose', name: 'Rose Water', category: 'flavors', compatibilityScore: 78 },
      { id: 'almond-extract', name: 'Almond Extract', category: 'flavors', compatibilityScore: 82 }
    ],
    toppings: [
      { id: 'coconut-flakes', name: 'Coconut Flakes', category: 'toppings', compatibilityScore: 85 },
      { id: 'chia-seeds', name: 'Chia Seeds', category: 'toppings', compatibilityScore: 80 },
      { id: 'berries', name: 'Mixed Berries', category: 'toppings', compatibilityScore: 75 },
      { id: 'nuts', name: 'Crushed Nuts', category: 'toppings', compatibilityScore: 70 },
      { id: 'granola', name: 'Matcha Granola', category: 'toppings', compatibilityScore: 88 },
      { id: 'cacao-nibs', name: 'Cacao Nibs', category: 'toppings', compatibilityScore: 85 },
      { id: 'sesame-seeds', name: 'Black Sesame', category: 'toppings', compatibilityScore: 82 }
    ],
    boosters: [
      { id: 'collagen', name: 'Collagen Peptides', category: 'boosters', compatibilityScore: 90 },
      { id: 'maca', name: 'Maca Powder', category: 'boosters', compatibilityScore: 85 },
      { id: 'spirulina', name: 'Spirulina', category: 'boosters', compatibilityScore: 75 },
      { id: 'protein', name: 'Vanilla Protein', category: 'boosters', compatibilityScore: 80 },
      { id: 'hemp-seeds', name: 'Hemp Seeds', category: 'boosters', compatibilityScore: 88 },
      { id: 'cordyceps', name: 'Cordyceps', category: 'boosters', compatibilityScore: 82 },
      { id: 'lion-mane', name: "Lion's Mane", category: 'boosters', compatibilityScore: 85 }
    ],
    teas: [
      { id: 'hojicha', name: 'Hojicha', category: 'teas', compatibilityScore: 95 },
      { id: 'genmaicha', name: 'Genmaicha', category: 'teas', compatibilityScore: 90 },
      { id: 'jasmine', name: 'Jasmine Tea', category: 'teas', compatibilityScore: 85 },
      { id: 'earl-grey', name: 'Earl Grey', category: 'teas', compatibilityScore: 80 },
      { id: 'chamomile', name: 'Chamomile', category: 'teas', compatibilityScore: 75 }
    ],
    spices: [
      { id: 'cardamom', name: 'Cardamom', category: 'spices', compatibilityScore: 88 },
      { id: 'ginger', name: 'Ground Ginger', category: 'spices', compatibilityScore: 85 },
      { id: 'nutmeg', name: 'Nutmeg', category: 'spices', compatibilityScore: 82 },
      { id: 'turmeric', name: 'Turmeric', category: 'spices', compatibilityScore: 78 },
      { id: 'star-anise', name: 'Star Anise', category: 'spices', compatibilityScore: 75 }
    ],
    fruits: [
      { id: 'yuzu', name: 'Yuzu Preserves', category: 'fruits', compatibilityScore: 92 },
      { id: 'cherry', name: 'Cherry Compote', category: 'fruits', compatibilityScore: 85 },
      { id: 'mango', name: 'Mango Puree', category: 'fruits', compatibilityScore: 80 },
      { id: 'lychee', name: 'Lychee Syrup', category: 'fruits', compatibilityScore: 88 },
      { id: 'passion-fruit', name: 'Passion Fruit', category: 'fruits', compatibilityScore: 82 }
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
      {/* Categories Panel */}
      <div className="categories-panel">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-label">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Ingredients Panel */}
      {activeCategory && (
        <div className="ingredients-panel">
          <h3 className="category-title">
            {categories.find(c => c.id === activeCategory)?.name}
          </h3>
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
      )}
    </div>
  );
}
