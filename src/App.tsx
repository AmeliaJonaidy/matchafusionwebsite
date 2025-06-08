import { useState } from 'react';
import { IngredientsPanel } from './components/IngredientsPanel';
import './App.css';

interface Ingredient {
  id: string;
  name: string;
  category: string;
  compatibilityScore: number;
}

interface Recipe {
  title: string;
  ingredients: Ingredient[];
  instructions: string[];
  tips: string[];
}

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const compatibilityScore = selectedIngredients.length > 0
    ? Math.round(selectedIngredients.reduce((acc, ing) => acc + ing.compatibilityScore, 0) / selectedIngredients.length)
    : 0;

  const handleIngredientSelect = (ingredient: Ingredient) => {
    if (!selectedIngredients.find(i => i.id === ingredient.id)) {
      setSelectedIngredients(prev => [...prev, ingredient]);
    }
  };

  const generateRecipe = () => {
    setIsGenerating(true);
    // Simulate AI recipe generation
    setTimeout(() => {
      const newRecipe: Recipe = {
        title: "Custom Matcha Fusion Creation",
        ingredients: selectedIngredients,
        instructions: [
          "Begin by sifting 2 teaspoons of high-grade matcha powder into a bowl",
          "Heat your liquid base to approximately 175°F (80°C)",
          ...selectedIngredients.map(ing => 
            `Add ${ing.name.toLowerCase()} according to taste preference`
          ),
          "Whisk thoroughly until well combined and smooth",
          "Pour into your serving glass",
          "Add any toppings and serve immediately"
        ],
        tips: [
          "Use water just below boiling to prevent bitter taste",
          "Adjust sweetness to taste",
          "For the best results, use ceremonial grade matcha"
        ]
      };
      setRecipe(newRecipe);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <header className="header">
          <h1>Matcha Fusion Creator</h1>
          <p>
            Discover unique matcha combinations with our AI-powered recipe generator
          </p>
        </header>

        <main className="main-content">
          {/* Ingredients Panel */}
          <div className="panel">
            <h2>Ingredients</h2>
            <IngredientsPanel onIngredientSelect={handleIngredientSelect} />
          </div>

          {/* Preview & Recipe Panel */}
          <div className="panel">
            <h2>Your Creation</h2>
            
            {/* Compatibility Meter */}
            <div className="compatibility-meter">
              <h3>Matcha Compatibility Meter</h3>
              <div className="meter-bar">
                <div 
                  className="meter-fill"
                  style={{ width: `${compatibilityScore}%` }}
                />
              </div>
              <p className="compatibility-score">
                Compatibility Score: {compatibilityScore}%
              </p>
            </div>

            {/* Selected Ingredients */}
            <div className="selected-ingredients">
              {selectedIngredients.map((ingredient) => (
                <div 
                  key={ingredient.id}
                  className="selected-ingredient"
                >
                  <span>{ingredient.name}</span>
                  <button 
                    onClick={() => {
                      setSelectedIngredients(prev => 
                        prev.filter(item => item.id !== ingredient.id)
                      );
                      setRecipe(null);
                    }}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Generate Recipe Button */}
            {selectedIngredients.length > 0 && (
              <button 
                className={`generate-button${isGenerating ? ' disabled' : ''}`}
                onClick={generateRecipe}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating Recipe...' : 'Generate Recipe'}
              </button>
            )}

            {/* Recipe Display */}
            {recipe && (
              <div className="recipe-section">
                <h3>{recipe.title}</h3>
                
                <div>
                  <h4>Instructions</h4>
                  <ol className="instructions-list">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4>Pro Tips</h4>
                  <ul className="tips-list">
                    {recipe.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
