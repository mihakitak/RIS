import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    const result = await axios.get("http://localhost:8081/recipes");
    setRecipes(result.data);
  };

  const deleteRecipe = async (id) => {
    await axios.delete(`http://localhost:8081/recipe/${id}`);
    loadRecipes();
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2>Recipes List</h2>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Ingredients</th>
              <th scope="col">Instructions</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecipes.map((recipe, index) => (
              <tr key={recipe.id}>
                <th scope="row">{indexOfFirstRecipe + index + 1}</th>
                <td>{recipe.name}</td>
                <td
                  style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    maxWidth: "200px",
                  }}
                >
                  {recipe.ingredients}
                </td>
                <td
                  style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    maxWidth: "300px",
                  }}
                >
                  {recipe.instructions}
                </td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewrecipe/${recipe.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editrecipe/${recipe.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteRecipe(recipe.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="my-3">
          <Link className="btn btn-success" to="/addrecipe">
            Add New Recipe
          </Link>
        </div>

        {recipes.length > recipesPerPage && (
          <div className="d-flex justify-content-center my-3">
            <button
              className="btn btn-secondary mx-2"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              ←
            </button>

            {getPageNumbers().map((num) => (
              <button
                key={num}
                className={`btn mx-1 ${
                  num === currentPage ? "btn-primary" : "btn-outline-secondary"
                }`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}

            <button
              className="btn btn-secondary mx-2"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
