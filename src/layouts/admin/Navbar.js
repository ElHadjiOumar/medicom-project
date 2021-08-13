import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

const Navbar = () => {
  const history = useHistory();
  const logoutSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/logout`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");
        history.push("/");
      }
    });
  };
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      {/* <!-- Navbar Brand--> */}
      <Link className="navbar-brand ps-3" to="index.html">
        Senepharma
      </Link>
      {/* <!-- Sidebar Toggle--> */}

      {/* <!-- Navbar Search--> */}

      <button
        type="button"
        onClick={logoutSubmit}
        className="btn btn-danger text-white d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"
      >
        Deconnexion
      </button>
    </nav>
  );
};

export default Navbar;
