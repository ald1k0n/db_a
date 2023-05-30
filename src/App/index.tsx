import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import "Shared/styles/index.css";
import { Routing } from "Pages";

const store = setupStore();

const App = () => {
  return (
    <Provider store={store}>
      <div className={`App absolute left-0 right-0 top-0 bottom-0 bg-gray-50`}>
        <Routing />
      </div>
    </Provider>
  );
};

export default App;
