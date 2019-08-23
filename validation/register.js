const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.middleName = !isEmpty(data.middleName) ? data.middleName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.mobileNumber = !isEmpty(data.mobileNumber) ? data.mobileNumber : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = "firstName must be between 2 and 30 characters";
  }
  if (!Validator.isLength(data.middleName, { min: 2, max: 30 })) {
    errors.middleName = "middleName must be between 2 and 30 characters";
  }
  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = "lastName must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "firstName field is required";
  }
  if (Validator.isEmpty(data.middleName)) {
    errors.name = "middleName field is required";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "lastName field is required";
  }
  if (Validator.isEmpty(data.mobileNumber)) {
    errors.mobileNumber = "mobileNumber field is required";
  }
  if (Validator.isMobilePhone(data.mobileNumber, ["en-US"])) {
    errors.mobileNumber = "please provide country code +91 mobile number";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
