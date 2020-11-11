import React from "react";

export const SearchBar = ({ name, value, onChange, addNewContact }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-4">
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={() => addNewContact(true)}
          >
            Add a new contact
          </button>
        </div>
        <div className="col-12 col-sm-6 d-flex justify-content-start">
          <input
            className="form-control"
            type={name}
            placeholder="Search by first name"
            aria-label="Search"
            name={name}
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  );
};
