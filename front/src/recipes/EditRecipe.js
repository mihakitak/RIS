import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditRecipe() {
  const navigate = useNavigate();
  const {id} = useParams();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
  });

  const { name, ingredients, instructions } = recipe;

  const onInputChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadRecipe();
  },[]);

  const loadRecipe = async () => {
    const result = await axios.get(`http://localhost:8081/recipe/${id}`);
    setRecipe(result.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8081/recipe/${id}`, recipe);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Recipe</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Recipe Name
              </label>
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
              <label htmlFor="ingredients" className="form-label">
                Ingredients
              </label>
              <textarea
                className="form-control"
                placeholder="Enter ingredients"
                name="ingredients"
                rows="4"
                value={ingredients}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="instructions" className="form-label">
                Instructions
              </label>
              <textarea
                className="form-control"
                placeholder="Enter instructions"
                name="instructions"
                rows="5"
                value={instructions}
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
