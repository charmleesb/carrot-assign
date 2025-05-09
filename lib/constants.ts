export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).+$/
);
export const PASSWORD_REGEX_ERROR = "A password must have lowercase, UPPERCASE, a number and special caracters";