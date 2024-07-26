import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import { Neo4jProvider, createDriver } from 'use-neo4j';
import Service from "./components/pages/Service";
import Navbar from "./components/Navbar";

const driver = createDriver('neo4j+s', 'e3dfe4ee.databases.neo4j.io', '', 'neo4j', '1klNtNjuGj5FtPWp4NUTNZtdUNEs-KE7JGyeYYzhNlU')

export default function App() {
  return (
    <Neo4jProvider driver={driver}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
        </Routes>
      </BrowserRouter>
    </Neo4jProvider>
  );
}