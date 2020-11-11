import React, { Fragment } from "react";

export const NameField = ({
  data: nameField,
  handleChange,
  setNameFields,
  errors,
}) => {
  return (
    <div className="form-group">
      <div className="row">
        <legend className="col-form-label col-sm-2">Name</legend>
        {nameField.map((name, index) => (
          <Fragment key={index}>
            <div key={index} className="form-group col-md-4">
              <input
                type="text"
                className="form-control"
                id={index.first_name}
                placeholder="First name"
                name="first_name"
                readOnly={handleChange ? false : true}
                value={name.first_name || ""}
                onChange={(event) =>
                  handleChange(index, event, nameField, setNameFields)
                }
                autoComplete="off"
              />
            </div>
            <div className="form-group col-md-4">
              <input
                type="text"
                className="form-control"
                id={index.last_name}
                placeholder="Last name"
                readOnly={handleChange ? false : true}
                name="last_name"
                value={name.last_name || ""}
                onChange={(event) =>
                  handleChange(index, event, nameField, setNameFields)
                }
                autoComplete="off"
              />
            </div>
          </Fragment>
        ))}
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center">
          {nameField && errors && errors.first_name && (
            <small className="text-danger text-center">
              {errors.first_name}
            </small>
          )}
          {nameField && errors && errors.last_name && (
            <small className="text-danger">{errors.last_name}</small>
          )}
        </div>
      </div>
    </div>
  );
};
