import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Medicament = () => {
  const [medicamentInput, setMedicament] = useState({
    medicament_nom: "",
    medicament_categorie: "",
    medicament_reference: "",
    medicament_prix: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setMedicament({ ...medicamentInput, [e.target.name]: e.target.value });
  };

  const submitMedicament = (e) => {
    e.preventDefault();

    const data = {
      medicament_nom: medicamentInput.medicament_nom,
      medicament_categorie: medicamentInput.medicament_categorie,
      medicament_reference: medicamentInput.medicament_reference,
      medicament_prix: medicamentInput.medicament_prix,
    };

    axios.post(`/api/store-medicament`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setMedicament({
          medicament_nom: "",
          medicament_categorie: "",
          medicament_reference: "",
          medicament_prix: "",
          error_list: [],
        });
      } else if (res.data.status === 400) {
        setMedicament({
          ...medicamentInput,
          error_list: res.data.validation_errors,
        });
      }
    });
  };
  return (
    <div className="card mt-4">
      <div className="card-header">
        <h4 className="mt-4">
          Ajouter Medicament
          <Link
            to="/admin/view-medicament"
            className="btn btn-primary btn-sm float-end"
          >
            Liste Medicament
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <form onSubmit={submitMedicament}>
          <div className="form-group mb-3">
            <label>Nom du Medicament</label>
            <input
              type="text"
              name="medicament_nom"
              onChange={handleInput}
              value={medicamentInput.medicament_nom}
              className="form-control"
            />
            <span className="text-danger">
              {medicamentInput.error_list.medicament_nom}
            </span>
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
            <span className="text-danger">
              {medicamentInput.error_list.medicament_categorie}
            </span>
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
            <span className="text-danger">
              {medicamentInput.error_list.medicament_reference}
            </span>
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
            <span className="text-danger">
              {medicamentInput.error_list.medicament_prix}
            </span>
          </div>

          <button type="submit" className="btn btn-primary px-4 float-end">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Medicament;
