import Joi from "joi-browser";

const detailSchema = {
  email: Joi.string().email().label("Email").allow("", null),
  number: Joi.number().label("Phone number").allow("", null),
  url: Joi.string().label("Url").allow("", null),
  street: Joi.string().label("Street").allow("", null),
  street_detail: Joi.string().label("Apt/Floor").allow("", null),
  city: Joi.string().label("City").allow("", null),
  zipcode: Joi.number().label("Zipcode").allow("", null),
  country: Joi.string().label("Country").allow("", null),
};

const nameSchema = {
  first_name: Joi.string().required().label("First Name"),
  last_name: Joi.string().required().label("Last Name"),
};

const validateProperty = (initialField, schema) => {
  const options = { abortEarly: false };
  for (var i = 0, iLen = initialField.length; i < iLen; i++) {
    const { error } = Joi.validate(initialField[i], schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
      return errors;
    }
  }
};

export function getNameSchema() {
  return nameSchema;
}
export function getDetailSchema() {
  return detailSchema;
}
export function getValidateProperty(initialField, schema) {
  return validateProperty(initialField, schema);
}
