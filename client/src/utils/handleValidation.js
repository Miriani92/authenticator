export const handleSignupValidation = ({ name, password, email }) => {
  // TODO ===> add more robust validation
  const isValid = name && password && email;
  return isValid;
};

export const handleLoginValidation = ({ password, email }) => {
  // TODO ===> add more robust validation
  const isValid = password && email;
  return isValid;
};
export const handleBookValidation = ({ title, author, published }) => {
  // TODO ===> add more robust validation
  const isValid = title && author && published;
  return isValid;
};
