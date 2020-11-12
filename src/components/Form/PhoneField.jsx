import React from "react";

export const PhoneField = ({
  data: phoneField,
  handleAddField,
  handleRemoveField,
  handleChange,
  setPhoneField,
  errors,
}) => {
  return (
    <fieldset className="form-group">
      <div className="row">
        <legend className="col-form-label col-sm-2 pt-0">Phone</legend>
        <div className={phoneField.length === 0 ? "" : "col-sm-6"}>
          {(phoneField || []).map((phone, index) => (
            <div key={index} className="form-group row">
              <div className={handleChange ? "col-sm-8" : "col-sm-12"}>
                <input
                  type="tel"
                  className="form-control"
                  value={phone.number || ""}
                  name="number"
                  readOnly={handleChange ? false : true}
                  placeholder="Example: 2013334000"
                  onChange={(event) =>
                    handleChange(index, event, phoneField, setPhoneField)
                  }
                />
                {phoneField && errors && errors.number && (
                  <small className="text-danger">{errors.number}</small>
                )}
              </div>
              {handleRemoveField && (
                <div className="col-sm-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() =>
                      handleRemoveField(index, phoneField, setPhoneField)
                    }
                  >
                    X
                  </button>
                </div>
              )}
              {index >= phoneField.length - 1 && handleAddField && (
                <div className="col-sm-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleAddField(phoneField, setPhoneField)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {phoneField.length === 0 && handleAddField && (
          <div className="col-sm-2">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => handleAddField(phoneField, setPhoneField)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </fieldset>
  );
};
