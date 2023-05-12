import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const APP_ID = "<YOUR_APP_ID>";
  const APP_KEY = "<YOUR_APP_KEY>";

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
    };

    getRecipes();
  }, [query]);

  const updateSearch = (event) => {
    setSearch(event.target.value);
  };

  const getSearch = (event) => {
    event.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <h1>Recipe App</h1>
      <form onSubmit={getSearch} className="search-form">
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={updateSearch}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <div key={recipe.recipe.label} className="recipe">
            <h2>{recipe.recipe.label}</h2>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
            <ul>
              {recipe.recipe.ingredients.map((ingredient) => (
                <li>{ingredient.text}</li>
              ))}
            </ul>
            <p>Calories: {recipe.recipe.calories.toFixed(2)}</p>
            <a href={recipe.recipe.url}>View Recipe</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
