import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

function EditPharmacie(props) {
  const [loading, setLoading] = useState(true);
  const [pharmacieInput, setPharmacie] = useState([]);
  const history = useHistory();
  const [error, setErrors] = useState([]);

  useEffect(() => {
    const pharmacie_id = props.match.params.id;
    axios.get(`api/edit-pharmacie/${pharmacie_id}`).then((res) => {
      if (res.data.status === 200) {
        setPharmacie(res.data.pharmacie);
      } else if (res.data.status === 400) {
        swal("Erreur", res.data.message, "error");
        history.push("/admin/view-pharmacie");
      }
      setLoading(false);
    });
  }, [props.match.params.id, history]);

  const handleInput = (e) => {
    e.persist();
    setPharmacie({ ...pharmacieInput, [e.target.name]: e.target.value });
  };

  const updatePharmacie = (e) => {
    e.preventDefault();

    const data = {
      pharmacie_nom: pharmacieInput.pharmacie_nom,
      pharmacie_adresse: pharmacieInput.pharmacie_adresse,
      pharmacie_numero: pharmacieInput.pharmacie_numero,
    };
    const pharmacie_id = props.match.params.id;
    axios.put(`/api/update-pharmacie/${pharmacie_id}`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setErrors([]);
        history.push("/admin/view-pharmacie");
      } else if (res.data.status === 422) {
        swal("Tous les Champs ne sont pas remplis", "", "error");
        setErrors(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Erreur", res.data.message, "error");
        history.push("/admin/view-pharmacie");
      }
    });
  };

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
  }

  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4 className="mt-4">
            Modifier Pharmacie
            <Link
              to="/admin/view-pharmacie"
              className="btn btn-primary btn-sm float-end"
            >
              Retour
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={updatePharmacie}>
            <div className="form-group mb-3">
              <label>Nom de la Pharmacie</label>
              <input
                type="text"
                name="pharmacie_nom"
                onChange={handleInput}
                value={pharmacieInput.pharmacie_nom}
                className="form-control"
              />
              <span className="text-danger">{error.pharmacie_nom}</span>
            </div>
            <div className="form-group mb-3">
              <label>Adresse de la Pharmacie</label>
              <input
                type="text"
                name="pharmacie_adresse"
                onChange={handleInput}
                value={pharmacieInput.pharmacie_adresse}
                className="form-control"
              />
              <span className="text-danger">{error.pharmacie_adresse}</span>
            </div>
            <div className="form-group mb-3">
              <label>Numero de la Pharmacie</label>
              <input
                type="text"
                name="pharmacie_numero"
                onChange={handleInput}
                value={pharmacieInput.pharmacie_numero}
                className="form-control"
              />
              <span className="text-danger">{error.pharmacie_numero}</span>
            </div>

            <button type="submit" className="btn btn-primary px-4 float-end">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPharmacie;
