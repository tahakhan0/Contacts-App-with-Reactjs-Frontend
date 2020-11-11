import React, { useState } from "react";
import { NameField } from "./NameField";
import { PhoneField } from "./PhoneField";
import { EmailField } from "./EmailField";
import { AddressField } from "./AddressField";
import { SocialMediaField } from "./SocialMediaField";
import { saveContacts } from "../MainComponents/getData";
import {
  getNameSchema,
  getDetailSchema,
  getValidateProperty,
} from "./SchemaValidation";
import { toast } from "react-toastify";

export default function Form({ cancelNewContact, addNewContact }) {
  const [nameField, setNameFields] = useState([
    {
      first_name: "",
      last_name: "",
    },
  ]);
  const [emailField, setEmailFields] = useState([
    {
      email: "",
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
  const [phoneField, setPhoneField] = useState([
    {
      number: "",
    },
  ]);

  const nameSchema = getNameSchema();
  const detailSchema = getDetailSchema();

  const [errors, setErrors] = useState({});

  const handleChange = (index, event, initialField, method) => {
    const values = [...initialField];
    values[index][event.target.name] = event.target.value;
    const errors = getValidateProperty(
      initialField,
      initialField === nameField ? nameSchema : detailSchema
    );
    setErrors(errors ? errors : {});
    method(values);
  };

  const handleAddField = (initialField, setMethod) => {
    let values = {};
    if (initialField === emailField) {
      values = {
        email: "",
      };
    } else if (initialField === socialMedia) {
      values = {
        url: "",
      };
    } else if (initialField === phoneField) {
      values = {
        number: "",
      };
    } else {
      values = {
        street: "",
        street_detail: "",
        city: "",
        zipcode: "",
        country: "",
      };
    }
    setMethod([...initialField, values]);
  };
  const handleRemoveField = (index, initialField, method) => {
    const values = [...initialField];
    values.splice(index, 1);
    method(values);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    doSubmit();
  };
  const doSubmit = async () => {
    const result = {
      first_name: nameField[0].first_name,
      last_name: nameField[0].last_name,
      email: [...emailField],
      address: [...addressField],
      phone: [...phoneField],
      social_media: [...socialMedia],
    };
    try {
      await saveContacts(result);
      // setAddNewContact();
      addNewContact(false);
      toast.success("Contact added successfully");
    } catch (error) {
      toast.error("An unexpected error occured");
    }
  };

  return (
    <div className="container mt-2">
      <div className="row mb-4">
        <div className="col-6">
          <h4>Adding new contact</h4>
        </div>
        {cancelNewContact && (
          <div className="col-6 d-flex justify-content-end pr-4">
            <button
              className="btn btn-warning"
              type="button"
              onClick={() => cancelNewContact()}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="row d-flex justify-content-center mb-4">
        <div className="col-10">
          <form onSubmit={handleSubmit}>
            <NameField
              data={nameField}
              handleChange={handleChange}
              setNameFields={setNameFields}
              errors={errors}
            />
            <PhoneField
              data={phoneField}
              handleRemoveField={handleRemoveField}
              handleAddField={handleAddField}
              handleChange={handleChange}
              setPhoneField={setPhoneField}
              errors={errors}
            />
            <EmailField
              data={emailField}
              handleRemoveField={handleRemoveField}
              handleAddField={handleAddField}
              handleChange={handleChange}
              setEmailFields={setEmailFields}
              errors={errors}
            />
            <SocialMediaField
              data={socialMedia}
              handleRemoveField={handleRemoveField}
              handleAddField={handleAddField}
              handleChange={handleChange}
              setSocialMedia={setSocialMedia}
              errors={errors}
            />
            <AddressField
              data={addressField}
              handleRemoveField={handleRemoveField}
              handleAddField={handleAddField}
              handleChange={handleChange}
              setAddressField={setAddressField}
              errors={errors}
            />
            <button className="btn btn-primary btn-block" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
