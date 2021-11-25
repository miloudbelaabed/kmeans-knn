import "antd/dist/antd.css";
import "./App.css";
import KmeansAlgorithme from "./algorithmes/k-means";
import Kmeans from "./views/kMeans";
import { Typography } from "antd";
const {Text} = Typography;
function App() {
  // KmeansAlgorithme(5, dataSet);

  return (
    <div>
      
      <Kmeans />
    </div>
  );
}

export default App;
