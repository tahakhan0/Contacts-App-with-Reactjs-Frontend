import React, { useState } from "react";
import { NameField } from "./NameField";
import { PhoneField } from "./PhoneField";
import { EmailField } from "./EmailField";
import { AddressField } from "./AddressField";
import { SocialMediaField } from "./SocialMediaField";
import { saveContacts, deleteContact } from "../MainComponents/getData";
import { toast } from "react-toastify";
import {
  getNameSchema,
  getDetailSchema,
  getValidateProperty,
} from "./SchemaValidation";

export default function EditForm({
  data,
  toggleDisplayForm,
  updateContact,
  setDeleteContact,
}) {
  const { id, names, emails, address, social, phone } = data;
  const [nameField, setNameFields] = useState(names);
  const [emailField, setEmailFields] = useState(emails || []);
  const [addressField, setAddressField] = useState(address || []);
  const [socialMedia, setSocialMedia] = useState(social || []);
  const [phoneField, setPhoneField] = useState(phone || []);

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
  const handleContactDelete = async (id) => {
    try {
      await deleteContact(id);
      setDeleteContact(true);
      toggleDisplayForm();
      toast.error("Contact is deleted");
    } catch (error) {
      toast.error("An unexpected error occured");
    }
  };

  const doSubmit = async () => {
    const result = {
      id,
      first_name: nameField[0].first_name,
      last_name: nameField[0].last_name,
      email: [...emailField],
      address: [...addressField],
      phone: [...phoneField],
      social_media: [...socialMedia],
    };
    try {
      await saveContacts(result);
      updateContact(result);
      toggleDisplayForm();
      toast.success("Contact successfully updated");
    } catch (error) {
      toast.error("An unexpected error occured");
    }
    // toggleDisplayForm();
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="row d-flex justify-content-center">
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
            <div className="row d-flex justify-content-center">
              <div className="col-2">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleContactDelete(id)}
                >
                  Delete
                </button>
              </div>
              <div className="col-2">
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
