import Container from "@mui/material/Container";
import Graph from "@src/components/Graph";
import Home from "@src/components/Home";
import Layout from "@src/components/Layout";
import NotFound from "@src/components/NotFound";
import Profiles from "@src/components/Profiles";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Container maxWidth="lg">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="graph" element={<Graph />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
