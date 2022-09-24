import Navbar from "./Navbar";
import NewsList from "./NewsList/NewsList";
import NewsAddForm from "./NewsAddForm";
import NewsFilter from "./NewsFilter";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <NewsList />
        <div className="content_page">
          <NewsAddForm />
          <NewsFilter />
        </div>
      </div>
    </div>
  );
}

export default App;
