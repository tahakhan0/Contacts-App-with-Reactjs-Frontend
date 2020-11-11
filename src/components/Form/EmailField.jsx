import React from "react";

export const EmailField = ({
  data: emailField,
  handleAddField,
  handleRemoveField,
  handleChange,
  setEmailFields,
  errors,
}) => {
  return (
    <fieldset className="form-group">
      <div className="row">
        <legend className="col-form-label col-sm-2 pt-0">Email</legend>
        <div className={emailField.length === 0 ? "" : "col-sm-6"}>
          {(emailField || []).map((email, index) => (
            <div key={index} className="form-group row">
              <div className={handleChange ? "col-sm-8" : "col-12"}>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                  name="email"
                  readOnly={handleChange ? false : true}
                  value={email.email || ""}
                  onChange={(event) =>
                    handleChange(index, event, emailField, setEmailFields)
                  }
                  autoComplete="off"
                />
                {emailField && errors && errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>
              {handleRemoveField && (
                <div className="col-sm-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() =>
                      handleRemoveField(index, emailField, setEmailFields)
                    }
                  >
                    X
                  </button>
                </div>
              )}
              {index === emailField.length - 1 && handleAddField && (
                <div className="col-sm-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleAddField(emailField, setEmailFields)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {emailField.length === 0 && handleAddField && (
          <div className="col-sm-2">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => handleAddField(emailField, setEmailFields)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </fieldset>
  );
};
