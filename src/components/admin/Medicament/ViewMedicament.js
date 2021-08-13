import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const ViewMedicament = () => {
  const [loading, setLoading] = useState(true);
  const [medicamentlist, setMedicamentlist] = useState([]);
  useEffect(() => {
    axios.get(`/api/view-medicament`).then((res) => {
      if (res.status === 200) {
        setMedicamentlist(res.data.medicament);
      }
      setLoading(false);
    });
  }, []);

  const deleteMedicament = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Suppression";

    axios.delete(`/api/delete-medicament/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.status === 404) {
        swal("Success", res.data.message, "success");
        thisClicked.innerText = "Delete";
      }
    });
  };

  var viewmedicament_HTMLTABLE = "";

  if (loading) {
    return (
      <div className="wrapper">
        <div className="box-wrap">
          <div className="box one"></div>
          <div className="box two"></div>
          <div className="box three"></div>
          <div className="box four"></div>
          <div className="box five"></div>
          <div className="box six"></div>
        </div>
      </div>
    );
  } else {
    viewmedicament_HTMLTABLE = medicamentlist.map((item) => {
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.medicament_nom}</td>
          <td>{item.medicament_categorie}</td>
          <td>{item.medicament_reference}</td>
          <td>{item.medicament_prix}</td>
          <td>
            <Link
              to={`/admin/edit-medicament/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-primary"
              onClick={(e) => deleteMedicament(e, item.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Liste des Medicaments
            <Link
              to="/admin/add-medicament"
              className="btn btn-primary btn-sm float-end"
            >
              Ajoutez une medicament
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Medicament Nom</th>
                <th>Medicament Categorie</th>
                <th>Medicament Reference</th>
                <th>Medicament Prix</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>{viewmedicament_HTMLTABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewMedicament;
