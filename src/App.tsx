import React from "react";
import Home from './home'; 
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

export default function ProtectedApp() {
  return (
    <React.Suspense fallback="Loading...">
      <BrowserRouter>
        <AppRouting />
      </BrowserRouter>
    </React.Suspense>
  );
}

function AppRouting() {
  return (
    <Routes>
      <Route key="/" path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
