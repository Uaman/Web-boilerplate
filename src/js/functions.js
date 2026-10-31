import { randomUserMock, additionalUsers } from "./FE4U-Lab2-mock.js";

export const courses = [
  "Mathematics",
  "Physics",
  "English",
  "Computer Science",
  "Dancing",
  "Chess",
  "Biology",
  "Chemistry",
  "Law",
  "Art",
  "Medicine",
  "Statistics",
];

const FIELD_PATHS = {
  title: ["title", "name.title"],
  city: ["city", "location.city"],
  state: ["state", "location.state"],
  country: ["country", "location.country"],
  postcode: ["postcode", "location.postcode"],
  coordinates: ["coordinates", "location.coordinates"],
  timezone: ["timezone", "location.timezone"],
  b_date: ["b_day", "dob.date"],
  picture_large: ["picture_large", "picture.large"],
  picture_thumbnail: ["picture_thumbnail", "picture.thumbnail"],
};

function firstDefined(user, paths) {
  return _.find(
    _.map(paths, (path) => _.get(user, path)),
    (value) => !_.isNil(value),
  );
}

function nameKey(user) {
  return _.toLower(_.trim(user.full_name));
}

function formatMockUsers(user) {
  const result = {
    ..._.mapValues(FIELD_PATHS, (paths) => firstDefined(user, paths)),
    gender: user.gender,
    email: user.email,
    phone: user.phone,
    favorite: user.favorite,
    bg_color: user.bg_color,
    full_name:
      user.full_name ||
      _.compact([_.get(user, "name.first"), _.get(user, "name.last")]).join(
        " ",
      ),
    age:
      _.get(user, "dob.age") ??
      (user.b_day
        ? new Date().getFullYear() - new Date(user.b_day).getFullYear()
        : null),
    id: _.isString(user.id) ? user.id : _.uniqueId("teach-"),
    course: capitalize(user.course) ?? _.sample(courses),
    note: user.note ?? "",
  };

  return _.mapValues(result, (value) => _.defaultTo(value, null));
}

//TASK 1
export function getFormattedUsers(
  usersList = [...randomUserMock, ...additionalUsers],
) {
  const formatted = _.filter(_.map(usersList, formatMockUsers), nameKey);

  return _.map(_.groupBy(formatted, nameKey), (group) =>
    _.reduce(group, (old, user) =>
      _.mapValues(user, (value, key) => value ?? old[key]),
    ),
  );
}

//TASK 2
export function validateUser(user) {
  return (
    isCapitalizedString(user.full_name) &&
    isCapitalizedString(user.city) &&
    isCapitalizedString(user.country) &&
    (_.isNil(user.state) || isCapitalizedString(user.state)) &&
    (user.note === "" || isCapitalizedString(user.note)) &&
    _.isString(user.gender) &&
    !_.isEmpty(user.gender) &&
    _.isFinite(user.age) &&
    isValidPhone(user.phone) &&
    _.isString(user.email) &&
    _.includes(user.email, "@")
  );
}

function isCapitalizedString(value) {
  if (!_.isString(value)) return false;
  const first = value.charAt(0);
  return /\p{L}/u.test(first) && first === _.toUpper(first);
}

function isValidPhone(phone) {
  return (
    _.isString(phone) &&
    /^[\d\s\-()+]+$/.test(phone) &&
    _.size(_.replace(phone, /\D/g, "")) >= 8
  );
}

//TASK 3
export function filterUsers(users, values) {
  return _.filter(users, values);
}

//TASK 4
export function sortUsers(users, field, order = 1) {
  return _.orderBy(
    users,
    [(user) => _.isNil(user[field]), (user) => sortValue(user, field)],
    ["asc", order === 1 ? "asc" : "desc"],
  );
}

function sortValue(user, field) {
  const value = user[field];
  if (field == "b_date") {
    return new Date(value).getTime();
    return _.isString(value) ? _.deburr(_.toLower(value)) : value;
  }
}

//TASK 5
export function findUser(users, field, value) {
  return _.find(users, (user) => matchesField(user, field, value));
}

//TASK 6
export function countPercentage(users, condition) {
  if (_.isEmpty(users)) return 0;
  return _.round((_.filter(users, condition).length / users.length) * 100, 2);
}

//additional
export function capitalize(str) {
  return _.isString(str) && str ? _.upperFirst(str) : null;
}

function matchesField(user, field, value) {
  const x = user[field];
  if (_.isNumber(x)) return x === value;
  if (field === "b_date") {
    return new Date(x).toDateString() === new Date(value).toDateString();
  }
  if (_.isString(x)) return _.includes(_.toLower(x), _.toLower(value));
  return false;
}

export function searchUsers(users, query) {
  const que = query.trim();
  if (_.isEmpty(que)) return users;
  const checks = [
    ["full_name", que],
    ["note", que],
    ["age", Number(que)],
  ];
  return _.filter(users, (user) =>
    _.some(checks, ([field, value]) => matchesField(user, field, value)),
  );
}

export function daysToBirthday(bDate) {
  if (!bDate) return null;

  const birth = dayjs(bDate.slice(0, 10));
  if (!birth.isValid()) return null;

  const today = dayjs().startOf("day");
  let next = birth.year(today.year());
  if (next.isBefore(today)) next = next.add(1, "year");

  return next.diff(today, "day");
}
