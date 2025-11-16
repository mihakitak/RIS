import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function ViewRecipe() {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
  });

  const {id} = useParams();

  useEffect(() => {
    loadRecipe();
  }, []);

  const loadRecipe = async () => {
    const result = await axios.get(`http://localhost:8081/recipe/${id}`);
    setRecipe(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Recipe Details</h2>

          <div className="card">
            <div className="card-header">
              Details for recipe ID: {id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Title:</b> {recipe.name}
                </li>
                <li className="list-group-item">
                  <b>Ingredients:</b> {recipe.ingredients}
                </li>
                <li className="list-group-item">
                  <b>Instructions:</b> {recipe.instructions}
                </li>
              </ul>
            </div>
          </div>

          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
