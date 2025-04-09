import useAppStore from "./appStore";
import { Button } from "@radix-ui/themes";

const App = () => {
  const { toggleTheme } = useAppStore();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-amber-600" onClick={toggleTheme}>Hello World!</h1>
    </div>
  );
};

export default App;
