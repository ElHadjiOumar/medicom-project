import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

function EditMedicament(props) {
  const [loading, setLoading] = useState(true);
  const [medicamentInput, setMedicament] = useState([]);
  const history = useHistory();
  const [error, setErrors] = useState([]);

  useEffect(() => {
    const medicament_id = props.match.params.id;
    axios.get(`api/edit-medicament/${medicament_id}`).then((res) => {
      if (res.data.status === 200) {
        setMedicament(res.data.medicament);
      } else if (res.data.status === 400) {
        swal("Erreur", res.data.message, "error");
        history.push("/admin/view-medicament");
      }
      setLoading(false);
    });
  }, [props.match.params.id, history]);

  const handleInput = (e) => {
    e.persist();
    setMedicament({ ...medicamentInput, [e.target.name]: e.target.value });
  };

  const updateMedicament = (e) => {
    e.preventDefault();

    const data = {
      medicament_nom: medicamentInput.medicament_nom,
      medicament_categorie: medicamentInput.medicament_categorie,
      medicament_reference: medicamentInput.medicament_reference,
      medicament_prix: medicamentInput.medicament_prix,
    };
    const medicament_id = props.match.params.id;
    axios.put(`/api/update-medicament/${medicament_id}`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setErrors([]);
        history.push("/admin/view-medicament");
      } else if (res.data.status === 422) {
        swal("Tous les Champs ne sont pas remplis", "", "error");
        setErrors(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Erreur", res.data.message, "error");
        history.push("/admin/view-medicament");
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
            Modifier Medicament
            <Link
              to="/admin/view-medicament"
              className="btn btn-primary btn-sm float-end"
            >
              Retour
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={updateMedicament}>
            <div className="form-group mb-3">
              <label>Nom du Medicament</label>
              <input
                type="text"
                name="medicament_nom"
                onChange={handleInput}
                value={medicamentInput.medicament_nom}
                className="form-control"
              />
              <span className="text-danger">{error.medicament_nom}</span>
            </div>
            <div className="form-group mb-3">
              <label>Categorie du Medicament</label>
              <input
                type="text"
                name="medicament_categorie"
                onChange={handleInput}
                value={medicamentInput.medicament_categorie}
                className="form-control"
              />
              <span className="text-danger">{error.medicament_categorie}</span>
            </div>
            <div className="form-group mb-3">
              <label>Reference du Medicament</label>
              <input
                type="text"
                name="medicament_reference"
                onChange={handleInput}
                value={medicamentInput.medicament_reference}
                className="form-control"
              />
              <span className="text-danger">{error.medicament_reference}</span>
            </div>
            <div className="form-group mb-3">
              <label>Prix du Medicament</label>
              <input
                type="text"
                name="medicament_prix"
                onChange={handleInput}
                value={medicamentInput.medicament_prix}
                className="form-control"
              />
              <span className="text-danger">{error.medicament_prix}</span>
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

export default EditMedicament;
