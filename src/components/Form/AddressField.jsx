import React from "react";

export const AddressField = ({
  data: addressField,
  handleAddField,
  handleRemoveField,
  handleChange,
  setAddressField,
  errors,
}) => {
  // : { street, street_detail, city, city, zipcode, country },
  return (
    <fieldset className="form-group">
      <div className="row">
        <legend className="col-form-label col-sm-2 pt-0">Address</legend>
        <div className={addressField.length === 0 ? "" : "col-sm-10"}>
          {(addressField || []).map((address, index) => (
            <div key={index} className="row">
              <div className="col-sm-8 pl-3">
                <div key={index} className="form-group">
                  <label htmlFor="street">Street</label>
                  <input
                    type="text"
                    className="form-control"
                    name="street"
                    readOnly={handleChange ? false : true}
                    value={address.street || ""}
                    placeholder="1234 Main St"
                    onChange={(event) =>
                      handleChange(index, event, addressField, setAddressField)
                    }
                  />
                  {errors && errors.street && (
                    <small className="text-danger">{errors.street}</small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="street_detail">Apt/Floor</label>
                  <input
                    type="text"
                    className="form-control"
                    name="street_detail"
                    value={address.street_detail || ""}
                    readOnly={handleChange ? false : true}
                    placeholder="Apartment, studio, or floor"
                    onChange={(event) =>
                      handleChange(index, event, addressField, setAddressField)
                    }
                  />
                  {errors && errors.street_details && (
                    <small className="text-danger">
                      {errors.street_detail}
                    </small>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      className="form-control"
                      readOnly={handleChange ? false : true}
                      name="city"
                      placeholder="NYC"
                      value={address.city || ""}
                      onChange={(event) =>
                        handleChange(
                          index,
                          event,
                          addressField,
                          setAddressField
                        )
                      }
                    />
                    {errors && errors.city && (
                      <small className="text-danger">{errors.city}</small>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="zipcode">Zip</label>
                    <input
                      type="number"
                      className="form-control"
                      readOnly={handleChange ? false : true}
                      name="zipcode"
                      placeholder="10021"
                      value={address.zipcode || ""}
                      onChange={(event) =>
                        handleChange(
                          index,
                          event,
                          addressField,
                          setAddressField
                        )
                      }
                    />
                    {errors && errors.zipcode && (
                      <small className="text-danger">{errors.street}</small>
                    )}
                  </div>
                </div>
                <div className="form-group col-md-12 p-0">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    placeholder="United States"
                    value={address.country || ""}
                    readOnly={handleChange ? false : true}
                    onChange={(event) =>
                      handleChange(index, event, addressField, setAddressField)
                    }
                  />
                  {errors && errors.country && (
                    <small className="text-danger">{errors.country}</small>
                  )}
                </div>
              </div>
              <div className="col">
                <div className="row">
                  {handleRemoveField && (
                    <div className="col-12 col-sm-12 col-xl-3 pb-2 pb-xl-0">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() =>
                          handleRemoveField(
                            index,
                            addressField,
                            setAddressField
                          )
                        }
                      >
                        X
                      </button>
                    </div>
                  )}
                  {index >= addressField.length - 1 && handleAddField && (
                    <div className="col-12 col-sm-12 col-xl-3">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() =>
                          handleAddField(addressField, setAddressField)
                        }
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {addressField.length === 0 && handleAddField && (
          <div className="col-12 col-sm-4 col-xl-2">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => handleAddField(addressField, setAddressField)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </fieldset>
  );
};
