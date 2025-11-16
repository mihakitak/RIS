import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AddRecipe() {
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
  });

  const { name, ingredients, instructions} = recipe;

  const onInputChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/recipe", recipe);
      navigate("/"); 
    } catch (error) {
      console.error("Napaka pri dodajanju recepta:", error);
      alert("Napaka pri dodajanju recepta. Preveri konzolo za podrobnosti.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 border rounded p-4 mt-4 shadow">
          <h2 className="text-center mb-4">Add New Recipe</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Recipe Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter recipe name"
                name="name"
                value={name}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="ingredients" className="form-label">Ingredients</label>
              <textarea
                className="form-control"
                placeholder="List ingredients (comma separated)"
                name="ingredients"
                rows="4"
                value={ingredients}
                onChange={onInputChange}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="instructions" className="form-label">Instructions</label>
              <textarea
                className="form-control"
                placeholder="Step by step instructions"
                name="instructions"
                rows="5"
                value={instructions}
                onChange={onInputChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-outline-primary">Save Recipe</button>
            <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
