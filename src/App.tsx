import { Routes, Route } from "react-router-dom";
import Home from "@src/components/Home";
import Layout from "@src/components/Layout";
import Table from "@src/components/Table";
import Graph from "@src/components/graph";
import NotFound from "@src/components/NotFound";
import Container from "@mui/material/Container";

function App() {
  return (
    <Container maxWidth="lg">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="table" element={<Table />} />
          <Route path="graph" element={<Graph />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
