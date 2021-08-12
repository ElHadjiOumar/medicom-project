import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";

const Pharmacie = () => {
  const [pharmacieInput, setPharmacie] = useState({
    pharmacie_nom: "",
    pharmacie_adresse: "",
    pharmacie_numero: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setPharmacie({ ...pharmacieInput, [e.target.name]: e.target.value });
  };

  const submitPharmacie = (e) => {
    e.preventDefault();

    const data = {
      pharmacie_nom: pharmacieInput.pharmacie_nom,
      pharmacie_adresse: pharmacieInput.pharmacie_adresse,
      pharmacie_numero: pharmacieInput.pharmacie_numero,
    };

    axios.post(`/api/store-pharmacie`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        document.getElementById("PHARMACIE_FORM").reset();
      } else if (res.data.status === 400) {
        setPharmacie({
          ...pharmacieInput,
          error_list: res.data.validation_errors,
        });
      }
    });
  };
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Ajouter Pharmacie</h1>
      <form onSubmit={submitPharmacie} id="PHARMACIE_FORM">
        <div className="form-group mb-3">
          <label>Nom de la Pharmacie</label>
          <input
            type="text"
            name="pharmacie_nom"
            onChange={handleInput}
            value={pharmacieInput.pharmacie_nom}
            className="form-control"
          />
          <span>{pharmacieInput.error_list.pharmacie_nom}</span>
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
          <span>{pharmacieInput.error_list.pharmacie_adresse}</span>
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
          <span>{pharmacieInput.error_list.pharmacie_numero}</span>
        </div>

        <button type="submit" className="btn btn-primary px-4 float-end">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Pharmacie;
