import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { NewsProvider } from "./contexts/NewsContext"
import { PayoutProvider } from "./contexts/PayoutContext"
import Login from "./components/Auth/Login"
import Dashboard from "./components/Dashboard/Dashboard"
import NewsPage from "./components/News/NewsPage"
import PayoutPage from "./components/Payout/PayoutPage"
import AnalyticsPage from "./components/Analytics/AnalyticsPage"
import Layout from "./components/Layout/Layout"
import ProtectedRoute from "./components/Auth/ProtectedRoute"
import { Toaster } from "react-hot-toast"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <NewsProvider>
        <PayoutProvider>
          <Router>
            <div className="App">
              <Toaster position="top-right" />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Dashboard />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/news"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <NewsPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payouts"
                  element={
                    <ProtectedRoute adminOnly>
                      <Layout>
                        <PayoutPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <AnalyticsPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </Router>
        </PayoutProvider>
      </NewsProvider>
    </AuthProvider>
  )
}

export default App
