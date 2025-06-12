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
    
    // Helper function to get personalized recipe name
    const getRecipeName = () => {
      const highestScoreIngredient = [...selectedIngredients].sort((a, b) => 
        b.compatibilityScore - a.compatibilityScore
      )[0];

      if (compatibilityScore >= 90) {
        return `${highestScoreIngredient.name} Paradise Matcha Fusion`;
      } else if (compatibilityScore >= 80) {
        return `Artisanal ${highestScoreIngredient.name} Matcha Blend`;
      } else {
        return `Custom ${highestScoreIngredient.name} Matcha Creation`;
      }
    };

    // Helper function to get personalized instructions based on ingredient types
    const getPersonalizedInstructions = () => {
      const hasDairy = selectedIngredients.some(ing => ing.category === 'dairy');
      const hasToppings = selectedIngredients.some(ing => ing.category === 'toppings');
      
      const instructions = [
        "Begin by sifting 2 teaspoons of premium-grade matcha powder into your bowl",
      ];

      if (hasDairy) {
        instructions.push(
          "Heat your dairy base to approximately 155°F (68°C) - slightly cooler than usual to preserve its natural sweetness"
        );
      } else {
        instructions.push(
          "Heat your water to approximately 175°F (80°C) - just below boiling to prevent bitterness"
        );
      }

      // Add ingredient-specific instructions
      selectedIngredients.forEach(ing => {
        switch (ing.category) {
          case 'sweeteners':
            instructions.push(`Gently incorporate ${ing.name.toLowerCase()} to taste, starting with a small amount`);
            break;
          case 'spices':
            instructions.push(`Add a pinch of ${ing.name.toLowerCase()} to enhance the aromatic profile`);
            break;
          case 'flavors':
            instructions.push(`Carefully blend in ${ing.name.toLowerCase()} to create depth of flavor`);
            break;
          case 'boosters':
            instructions.push(`Mix in ${ing.name.toLowerCase()} for added benefits`);
            break;
          case 'teas':
            instructions.push(`Blend in the prepared ${ing.name.toLowerCase()} for an elevated tea experience`);
            break;
          case 'fruits':
            instructions.push(`Stir in ${ing.name.toLowerCase()} for a fruity twist`);
            break;
          default:
            instructions.push(`Add ${ing.name.toLowerCase()} according to taste preference`);
        }
      });

      instructions.push(
        "Using a bamboo whisk or electric frother, blend until smooth and well combined",
        hasDairy ? "Continue whisking until a rich, creamy consistency is achieved" : "Whisk until a light, frothy consistency forms"
      );

      if (hasToppings) {
        instructions.push(
          "Pour into your favorite serving vessel",
          "Top with your selected garnishes for both visual appeal and texture"
        );
      } else {
        instructions.push(
          "Pour into your serving vessel",
          "Consider adding a light dusting of matcha powder as garnish"
        );
      }

      return instructions;
    };

    // Helper function to generate personalized tips based on ingredients
    const getPersonalizedTips = () => {
      const tips = [
        "For optimal results, use ceremonial grade matcha",
        "Prepare your workspace and ingredients before starting"
      ];
      
      const categories = new Set(selectedIngredients.map(ing => ing.category));
      
      if (categories.has('dairy')) {
        tips.push("Steam your dairy base gently to avoid scalding and preserve its natural sweetness");
      }
      
      if (categories.has('sweeteners')) {
        tips.push("Adjust sweetener gradually - you can always add more but can't take it away");
      }
      
      if (categories.has('spices')) {
        tips.push("Start with a small amount of spices and adjust to taste - they can become stronger as the drink sits");
      }

      if (categories.has('teas')) {
        tips.push("When blending different teas, let each steep to its optimal time before combining");
      }

      if (categories.has('fruits')) {
        tips.push("Fresh fruits will give the best flavor, but preserves work well for consistency");
      }

      if (categories.has('boosters')) {
        tips.push("Add boosters gradually and taste as you go to maintain the matcha's delicate flavor");
      }

      if (compatibilityScore >= 90) {
        tips.push("This combination is excellent - feel free to experiment with proportions");
      } else if (compatibilityScore >= 80) {
        tips.push("This blend works well, but consider adjusting amounts to find your perfect balance");
      } else {
        tips.push("Start with smaller amounts of each ingredient to find your preferred ratio");
      }

      return tips;
    };

    // Simulate AI recipe generation with personalized content
    setTimeout(() => {
      const newRecipe: Recipe = {
        title: getRecipeName(),
        ingredients: selectedIngredients,
        instructions: getPersonalizedInstructions(),
        tips: getPersonalizedTips()
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
          <div className="panels-container">
            {/* Left Panel - Ingredients Selection */}
            <section className="ingredients-section panel">
              <IngredientsPanel onIngredientSelect={handleIngredientSelect} />
            </section>

            {/* Right Panel - Preview & Recipe */}
            <section className="preview-section panel">
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
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
