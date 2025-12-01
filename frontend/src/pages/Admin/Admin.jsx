import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import PostManagement from "./PostManagement";
import AirplaneManagement from "./AirplaneManagement";
import FlightManagement from "./FlightManagement";
import Statistics from "./Statistics";

function Admin() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="manage-posts" element={<PostManagement />} />
          <Route path="manage-airplanes" element={<AirplaneManagement />} />
          <Route path="manage-flights" element={<FlightManagement />} />
          <Route path="statistics" element={<Statistics />} />
        </Routes>
      </Layout>
    </>
  )
}

export default Admin;