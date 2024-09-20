function formatUser(user) {
  try {
    const gender = user.gender;
    const email = user.email;
    const phone = user.phone;
    const full_name = getName(user);
    const title = getTitle(user);
    const coordinates = getCoordinates(user);
    const timezone = getTimezone(user);
    const postcode = getPostcode(user);
    const { city, state, country } = user.location ?? user;
    const { date: b_date, age } = user.dob ?? user;
  
    const {
      large: picture_large = user.picture_large,
      thumbnailL: picture_thumbnail = user.picture_thumbnail,
    } = user.picture;
  
    return {
      gender,
      email,
      phone,
      full_name,
      title,
      coordinates,
      timezone,
      postcode,
      city,
      state,
      country,
      b_date,
      age,
      picture_large,
      picture_thumbnail,
    };
  } catch (err) {
    console.error("Unexpected user format:", user);
    console.error(err);
    
    return null;
  }
}

function getName(user) {
  if (user.full_name) {
    return user.full_name;
  }

  const { first, last } = user.name;
  if (first && last) {
    return `${first} ${last}`;
  }

  throw new Error("Uknown name format for: " + user);
}

function getTitle(user) {
  if (user.title) {
    return user.title;
  }

  if (user.name?.title) {
    return user.name?.title;
  }

  throw new Error("Uknown title format for: " + user);
}

function getCoordinates(user) {
  if (user.coordinates) {
    return user.coordinates;
  }

  const { coordinates } = user.location;
  if (coordinates) {
    return coordinates;
  }

  throw new Error("Uknown coordinates format for: " + user);
}

function getTimezone(user) {
  if (user.timezone) {
    return user.timezone;
  }

  const { timezone } = user.location;
  if (timezone) {
    return timezone;
  }

  throw new Error("Uknown timezone format for: " + user);
}

function getPostcode(user) {
  if (user.postcode) {
    return user.postcode;
  }

  const { postcode } = user.location;
  if (postcode) {
    return postcode;
  }

  throw new Error("Uknown postcode format for: " + user);
}

module.exports = {
  formatUser,
};
