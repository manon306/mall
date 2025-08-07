// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/nav.jsx";
import Footer from "./Components/footer.jsx";
import Home from "./pages/home.jsx";
import Login from "./Components/login.jsx";
import Logout from "./Components/logout.jsx";
import Signin from "./Components/signin.jsx";
import Profile from "./pages/profile.jsx";
import BookDetails from "./pages/article.jsx";
import MockPayment from "./pages/payment.jsx";
import { AuthProvider } from "./Components/AuthContext.jsx";
import ProductDetails from "./pages/article.jsx";

import "./index.css"
import { createTheme } from "@mui/material/styles";

import Books from "./Components/books.jsx";
import CartPage from "./pages/cart.jsx";
import CustomizedDialogs from "./Components/dialog.jsx";


import { GlobalProvider } from "./Components/context.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});
function App() {
  return (
    <div >
      <AuthProvider>
        <GlobalProvider>
            <CustomizedDialogs />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/payment" element={
                <ProtectedRoute>
                  <MockPayment />
                </ProtectedRoute>} />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/Logout" element={<Logout />} />
              <Route path="/Signin" element={<Signin />} />
              <Route path="/profile" element={
              <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>} />
              <Route path="/article" element={<BookDetails />} />
              {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
            </Routes>
            <Footer />
        </GlobalProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
