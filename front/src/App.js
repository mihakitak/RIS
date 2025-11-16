import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddRecipe from './recipes/AddRecipe';
import EditRecipe from './recipes/EditRecipe';
import ViewRecipe from './recipes/ViewRecipe';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addrecipe" element={<AddRecipe />} />
          <Route exact path="/editrecipe/:id" element={<EditRecipe />} />
          <Route exact path="/viewrecipe/:id" element={<ViewRecipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
