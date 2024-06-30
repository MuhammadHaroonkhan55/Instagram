import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (user) {
    return children;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;

ProtectedRoute.protoTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};
