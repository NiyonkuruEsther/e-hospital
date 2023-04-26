import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const nav = useNavigate();
  React.useEffect(() => {
    nav("/login");
  }, []);

  return <div className="container"></div>;
}
