import { GiftsProvider } from "./context/Context";
import Layout from "./layouts/layout";

function App() {
  return (
    <GiftsProvider>
      <Layout />
    </GiftsProvider>
  );
}

export default App;
