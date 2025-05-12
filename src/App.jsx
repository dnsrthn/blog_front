import React from "react";
import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { routes } from "./routes.jsx";

export const App = () => {
  let element = useRoutes(routes);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {element}
    </div>
  );
};

export default App
