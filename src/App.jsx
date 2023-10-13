import React from "react";
import { BrowserRouter } from "react-router-dom";
import { StateContext } from "../context/StateContext";
import PageRoutes from "./routes/PageRoutes";
import "./App.css";
import { QueryClient, QueryClientProvider } from 'react-query';


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>

    <StateContext>
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
    </StateContext>
    </QueryClientProvider>
  );
}

export default App;
