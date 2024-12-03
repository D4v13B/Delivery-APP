import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { RoutesPage } from "./pages/RoutesPage"
import { AddRoutePage } from "./pages/AddRoutePage"

import { RoutesProvider } from "./context/RoutesProvider"
import EditRoutePage from "./pages/EditRoutePage"

const App = () => {
  return (
    <BrowserRouter>
      <RoutesProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/routes" replace />} />
          <Route path="routes" element={<RoutesPage />} />

          <Route path="router-detail/:id" element={<EditRoutePage />} />
          <Route path="add-route" element={<AddRoutePage />} />
        </Routes>
      </RoutesProvider>
    </BrowserRouter>
  )
}

export default App
