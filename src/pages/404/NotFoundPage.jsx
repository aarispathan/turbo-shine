// src/pages/404/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./notfoundpage.css";
import { FaHome } from "react-icons/fa";

export default function NotFoundPage() {
    return (
        <section className="page_404">
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-sm-12">
                        <div className="four_zero_four_bg">
                            <h1 className="text-center">404</h1>
                        </div>

                        <div className="contant_box_404">
                            <h3 className="h2">Looks like you’re lost</h3>
                            <p>The page you are looking for is not available!</p>

                            <Link to="/" className="action-btn cursor-hover">
                                <span className="btn-text">HOME PAGE</span>
                                <FaHome className="login-icon" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
