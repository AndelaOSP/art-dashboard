// checks that an email is an Andela email
export const validAndelaEmail = (email) => {
  const VALID_ANDELA_EMAIL = /^[\w.-]+@andela\.com$/;
  return VALID_ANDELA_EMAIL.test(email);
};
