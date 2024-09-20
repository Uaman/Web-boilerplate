function validateUser(user) {
  const { full_name, gender, note, state, city, country } = user;

  const validStrings = [full_name, gender, note, state, city, country]
    .every((property) => property && typeof property === 'string' && property[0] === property[0].toUpperCase())

  const ageIsNumber = typeof user.age === 'number';
  const validPhone = typeof user.phone === 'string' && user.phone.length === 9;

  const { email } = user.email;
  const chunkedEmail = email.split('@');

  const validEmail = chunkedEmail.length === 2
    && chunkedEmail[0].length > 0
    && chunkedEmail[1].length > 0;

  return validStrings && ageIsNumber && validPhone && validEmail;
}

module.exports = {
  validateUser
}