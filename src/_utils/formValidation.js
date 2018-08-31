const emailValidation = (value) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]? w+)*(\.\w{2,3})+$/;
  return emailRegex.test(value);
};

export default emailValidation;
