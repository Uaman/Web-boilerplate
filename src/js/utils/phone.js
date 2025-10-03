const countryDialCodes = {
  Germany: "+49",
  Ireland: "+353",
  Australia: "+61",
  "United States": "+1",
  Finland: "+358",
  Turkey: "+90",
  Switzerland: "+41",
  Spain: "+34",
  Norway: "+47",
  France: "+33",
  Canada: "+1",
  Iran: "+98",
  "New Zealand": "+64",
  Denmark: "+45",
  Netherlands: "+31"
};

const e164Pattern = /^\+[1-9]\d{6,14}$/;

export function normalizePhone(phone, country) {
  if (!phone) return "";

  let digits = phone.replace(/[^\d]/g, "");

  if (phone.startsWith("+")) {
    return phone;
  }

  const code = countryDialCodes[country];
  if (!code) return "";

  digits = digits.replace(/^0+/, "");

  return code + digits;
}

export function validatePhone(phone, country) {
  if (!phone) {
    return { valid: false, normalized: "", error: "Empty phone number" };
  }

  const normalized = normalizePhone(phone, country);

  if (!normalized) {
    return { valid: false, normalized, error: `No phone pattern for ${country}` };
  }

  const ok = e164Pattern.test(normalized);

  return {
    valid: ok,
    normalized,
    error: ok ? null : `Invalid phone format for ${country}: ${phone}`
  };
}