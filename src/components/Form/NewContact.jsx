import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

export const NewContact = ({ displayMenu }) => {
  const [nameField, setNameFields] = useState([
    {
      first_name: "",
      last_name: "",
    },
  ]);
  const [emailField, setEmailFields] = useState([
    {
      url: "",
    },
  ]);
  const [addressField, setAddressField] = useState([
    { street: "", street_detail: "", city: "", zipcode: "", country: "" },
  ]);
  const [socialMedia, setSocialMedia] = useState([
    {
      url: "",
    },
  ]);
  const [activeField, setActiveField] = useState("Name");
  const [displayButtons, setDisplayButtons] = useState(true);

  const handleChange = (index, event, method, initalField) => {
    const values = [...initalField];
    values[index][event.target.name] = event.target.value;
    method(values);
  };
  const handleAddField = (name, initialField, method) => {
    method([...initialField, addressField]);
  };
  const handleRemoveFields = (index, initialField, method) => {
    const values = [...initialField];
    if (index >= 1) {
      values.splice(index, 1);
      method(values);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = [
      { ...nameField, email: [...emailField], address: [...addressField] },
    ];
  };
  const changeActiveField = (name) => {
    setActiveField(name);
  };
  const Name = () => {
    return (
      <div>
        {nameField.map((name, index) => (
          <div key={index} className="row">
            <div className="col-12">
              <h5 className="text-center">Name</h5>
              <hr />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="first_name">First name</label>
              <input
                type="text"
                value={name.first_name}
                name="first_name"
                className="form-control"
                autoComplete="off"
                onChange={(event) =>
                  handleChange(index, event, setNameFields, nameField)
                }
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="last_name">Last name</label>
              <input
                type="text"
                className="form-control"
                value={name.last_name}
                name="last_name"
                autoComplete="off"
                onChange={(event) =>
                  handleChange(index, event, setNameFields, nameField)
                }
              />
            </div>
          </div>
        ))}
      </div>
    );
  };
  const Email = () => {
    return (
      <div>
        {emailField.map((email, index) => (
          <div key={index} className="row">
            <div className="col-12">
              <h5 className="text-center">
                Email <small>({index + 1})</small>
              </h5>
              <hr />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="url">Email</label>
              <input
                type="email"
                value={email.url}
                name="url"
                className="form-control"
                autoComplete="off"
                onChange={(event) =>
                  handleChange(index, event, setEmailFields, emailField)
                }
              />
            </div>
            {displayButtons && (
              <div className="form-group col-md-4 d-flex align-items-end">
                <button
                  className="btn btn-outline-primary btn-sm mr-2"
                  type="button"
                  onClick={() =>
                    handleRemoveFields(index, emailField, setEmailFields)
                  }
                >
                  -
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  type="button"
                  onClick={() =>
                    handleAddField("emailField", emailField, setEmailFields)
                  }
                >
                  +
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  const Address = () => {
    return (
      <div>
        {addressField.map((address, index) => (
          <div key={index} className="row">
            <div className="col-12">
              <h5 className="text-center">
                Address <small>({index + 1})</small>
              </h5>
              <hr />
            </div>
            <div className="col p-0">
              <div className="form-group col-md-12">
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  value={address.street}
                  name="street"
                  className="form-control"
                  autoComplete="off"
                  onChange={(event) =>
                    handleChange(index, event, setAddressField, addressField)
                  }
                />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="street_detail">Apt/Floor no.</label>
                <input
                  type="text"
                  className="form-control"
                  value={address.street_detail}
                  name="street_detail"
                  autoComplete="off"
                  onChange={(event) =>
                    handleChange(index, event, setAddressField, addressField)
                  }
                />
              </div>
              <div className="row pl-3">
                <div className="form-group col-md-6">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    className="form-control"
                    value={address.city}
                    name="city"
                    autoComplete="off"
                    onChange={(event) =>
                      handleChange(index, event, setAddressField, addressField)
                    }
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="zipcode">Zipcode</label>
                  <input
                    type="number"
                    className="form-control"
                    value={address.zipcode}
                    name="zipcode"
                    autoComplete="off"
                    onChange={(event) =>
                      handleChange(index, event, setAddressField, addressField)
                    }
                  />
                </div>
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  className="form-control"
                  value={address.country}
                  name="country"
                  autoComplete="off"
                  onChange={(event) =>
                    handleChange(index, event, setAddressField, addressField)
                  }
                />
              </div>
            </div>
            {displayButtons && (
              <div className="col-md-3 d-flex align-items-center">
                <button
                  className="btn btn-outline-primary btn-sm mr-2"
                  type="button"
                  onClick={() =>
                    handleRemoveFields(index, addressField, setAddressField)
                  }
                >
                  -
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  type="button"
                  onClick={() =>
                    handleAddField(
                      "addressField",
                      addressField,
                      setAddressField
                    )
                  }
                >
                  +
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  const listgroupStyle = "list-group-item list-group-item-action";
  const allFields = () => {
    return (
      <div>
        {Name()}
        {Email()}
        {Address()}
      </div>
    );
  };
  return (
    // <div className="container mt-4">
    //   <div className="card">
    //     <div className="card-body">
    <div className="row p-0">
      {displayMenu && (
        <div className="col-3 border-right">
          <div className="list-group p-0">
            <button
              type="button"
              className={
                activeField === "Name"
                  ? listgroupStyle + " active"
                  : listgroupStyle
              }
              onClick={() => changeActiveField("Name")}
            >
              Name
            </button>
            <button
              type="button"
              className={
                activeField === "Phone"
                  ? listgroupStyle + " active"
                  : listgroupStyle
              }
              onClick={() => changeActiveField("Phone")}
            >
              Phone
            </button>
            <button
              type="button"
              className={
                activeField === "Email"
                  ? listgroupStyle + " active"
                  : listgroupStyle
              }
              onClick={() => changeActiveField("Email")}
            >
              Email
            </button>
            <button
              type="button"
              className={
                activeField === "Address"
                  ? listgroupStyle + " active"
                  : listgroupStyle
              }
              onClick={() => changeActiveField("Address")}
            >
              Address
            </button>
            <button
              type="button"
              className={
                activeField === "All"
                  ? listgroupStyle + " active"
                  : listgroupStyle
              }
              onClick={() => changeActiveField("All")}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      <div className="col">
        <form onSubmit={handleSubmit}>
          {activeField === "Name" ? Name() : null}
          {activeField === "Email" ? Email() : null}
          {activeField === "Address" ? Address() : null}
          {activeField === "All" && (
            <div>
              {allFields()}

              <div className="row mt-4">
                <div className="col-12 d-flex justify-content-end">
                  <button className="btn btn-danger mr-4" type="submit">
                    Delete
                  </button>
                  <button className="btn btn-primary" type="submit">
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
    //     </div>
    //   </div>
    // </div>
  );
};
