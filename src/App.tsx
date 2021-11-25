import "antd/dist/antd.css";
import "./App.css";
import KmeansAlgorithme from "./algorithmes/k-means";
import Kmeans from "./views/kMeans";

function App() {
  // KmeansAlgorithme(5, dataSet);

  return (
    <div>
      <Kmeans />
    </div>
  );
}

export default App;
