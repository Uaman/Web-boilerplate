function sortUsers(users, criterion, asc = true) {
  return users.sort((a, b) => {
    let result;
    switch (typeof value) {
      case "string":
        result = a[criterion].localCompare(b[criterion]);
        break;
      case "number":
        result = a[criterion] - b[criterion];
        break;
      default:
        throw new Error("Unexpected type for field " + property + ": " + typeof value)
    }

    if (!asc) {
      result *= -1;
    }

    return result;
  })
}