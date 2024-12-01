import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { RoutesPage } from "./pages/RoutesPage"

import { RoutesProvider } from "./context/RoutesProvider"

const App = () => {
  return (
    <BrowserRouter>
      <RoutesProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/routes" replace />} />
          <Route path="routes" element={<RoutesPage />} />
        </Routes>
      </RoutesProvider>
    </BrowserRouter>
  )
}

export default App
