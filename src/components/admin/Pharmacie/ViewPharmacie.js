import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewPharmacie = () => {
  const [loading, setLoading] = useState(true);
  const [pharmacielist, setPharmacielist] = useState([]);
  useEffect(() => {
    axios.get(`/api/view-pharmacie`).then((res) => {
      if (res.status === 200) {
        setPharmacielist(res.data.pharmacie);
      }
      setLoading(false);
    });
  }, []);

  var viewpharmacie_HTMLTABLE = "";

  if (loading) {
    return <h4> Chargement de la page de pharmacie ...</h4>;
  } else {
    viewpharmacie_HTMLTABLE = pharmacielist.map((item) => {
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.pharmacie_nom}</td>
          <td>{item.pharmacie_adresse}</td>
          <td>{item.pharmacie_numero}</td>
          <td>
            <Link
              to={`/edit-pharmacie/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <button type="button">Delete</button>
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
            Liste des Pharmacies
            <Link
              to="/admin/add-pharmacie"
              className="btn btn-primary btn-sm float-end"
            >
              Ajoutez une pharmacie
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pharmacie Nom</th>
                <th>Pharmacie Adresse</th>
                <th>Pharmacie Numero</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>{viewpharmacie_HTMLTABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewPharmacie;
