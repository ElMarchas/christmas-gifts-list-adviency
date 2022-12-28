import { useState } from "react";
import { background, Text } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Text fontWeight="bold" backgroundColor="brand.200" color="red.700">
        Gifts:
      </Text>
      <Text backgroundColor="brand.200" color="red.700">
        ¿Qué
      </Text>
      <Text backgroundColor="brand.200" color="red.700">
        miras
      </Text>
      <Text backgroundColor="brand.200" color="red.700">
        bobo?
      </Text>
    </div>
  );
}

export default App;
