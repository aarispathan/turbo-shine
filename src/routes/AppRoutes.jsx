import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignIn from "../pages/signIn/SignIn";
import Cart from "../pages/cart/Cart";
import About from "../pages/about/About";
import ProductDetails from "../pages/productdetail/ProductDetails";
import Products from "../pages/products/Products";
import ContactUsPage from "../pages/contact/ContactUsPage";
import Checkout from "../pages/checkout/Checkout";
import Payment from "../pages/payment/Payment";
import RequireAuth from "../auth/RequireAuth";
import UserProfile from "../pages/profile/UserProfile";
import ForgetPassword from "../pages/forgetpassword/ForgetPassword";
import NotFoundPage from "../pages/404/NotFoundPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "products", element: <Products /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <ContactUsPage /> },
            { path: "login", element: <Login /> },
            { path: "signin", element: <SignIn /> },
            { path: "product-details/:id", element: <ProductDetails /> },
            { path: "forget-password", element: <ForgetPassword /> },
            { path: "cart", element: <Cart /> },
            {
                element: <RequireAuth />,
                children: [
                    { path: "checkout", element: <Checkout /> },
                    { path: "payment-integration", element: <Payment /> },
                    { path: "profile", element: <UserProfile /> }
                ]
            }
        ]
    },
    { path: "*", element: <NotFoundPage /> }
]);

export default function AppRoutes() {
    return <RouterProvider router={router} />;
}
