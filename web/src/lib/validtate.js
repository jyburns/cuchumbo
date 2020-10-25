// regex source: https://www.w3resource.com/javascript/form/email-validation.php
const isValidEmailAddress = (emailAddress) => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailAddress);
};

export {
  isValidEmailAddress
};