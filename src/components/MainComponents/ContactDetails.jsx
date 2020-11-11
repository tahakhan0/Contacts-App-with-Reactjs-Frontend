import React, { useState } from "react";
import { NameField } from "../Form/NameField";
import { PhoneField } from "../Form/PhoneField";
import { SocialMediaField } from "../Form/SocialMediaField";
import { AddressField } from "../Form/AddressField";
import { EmailField } from "../Form/EmailField";
import EditForm from "../Form/EditForm";

export default function ContactDetails({
  contactDetailsCard: data,
  updateContact,
  setDeleteContact,
}) {
  const {
    id,
    first_name,
    last_name,
    email,
    phone,
    social_media,
    address,
  } = data;
  const nameField = [
    {
      first_name: first_name,
      last_name: last_name,
    },
  ];
  const emailField = email.length >= 1 ? email : false;
  const addressField = address.length >= 1 ? address : false;
  const socialMedia = social_media.length >= 1 ? social_media : false;
  const phoneField = phone.length >= 1 ? phone : false;
  const [displayEditForm, setDisplayEditForm] = useState(false);
  const [formData, setFormData] = useState({});

  const handleEditContact = (id, names, emails, address, social, phone) => {
    if (!displayEditForm) {
      setFormData({
        id,
        names,
        emails,
        address,
        social,
        phone,
      });
      setDisplayEditForm(!displayEditForm);
    }
  };
  const toggleDisplayForm = () => {
    setDisplayEditForm(!displayEditForm);
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-12 d-flex justify-content-end pr-4">
          {!displayEditForm && (
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={() =>
                handleEditContact(
                  id,
                  nameField,
                  emailField,
                  addressField,
                  socialMedia,
                  phoneField
                )
              }
            >
              Edit this
            </button>
          )}
          {displayEditForm && (
            <button
              className="btn btn-warning"
              onClick={() => setDisplayEditForm(false)}
            >
              Cancel edit
            </button>
          )}
        </div>
      </div>
      {!displayEditForm && (
        <div className="row d-flex justify-content-center pt-4">
          <div className="col-10">
            {nameField && <NameField data={nameField} />}
            {phoneField && <PhoneField data={phoneField} />}
            {emailField && <EmailField data={emailField} />}
            {socialMedia && <SocialMediaField data={socialMedia} />}
            {addressField && <AddressField data={addressField} />}
          </div>
        </div>
      )}
      {displayEditForm && (
        <EditForm
          data={formData}
          toggleDisplayForm={toggleDisplayForm}
          updateContact={updateContact}
          setDeleteContact={setDeleteContact}
        />
      )}
    </div>
  );
}
