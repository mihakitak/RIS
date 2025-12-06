import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";

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

const downloadPDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;

  doc.setFontSize(18);
  doc.text(recipe.name, margin, 20);

  doc.setFontSize(14);
  doc.text("Ingredients:", margin, 40);
  const ingredientsLines = doc.splitTextToSize(recipe.ingredients, maxWidth - 5);
  doc.text(ingredientsLines, margin + 5, 50);

  const instructionsStartY = 50 + ingredientsLines.length * 7; 
  doc.text("Instructions:", margin, instructionsStartY + 10);
  const instructionsLines = doc.splitTextToSize(recipe.instructions, maxWidth - 5);
  doc.text(instructionsLines, margin + 5, instructionsStartY + 20);

  doc.save(`${recipe.name}.pdf`);
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
          <button className="btn btn-success my-2" onClick={downloadPDF}> 
            Download PDF 
          </button>

          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
