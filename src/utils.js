// characters that would otherwise be changed when encoded
const ALLOWED_CHARACTERS_IN_CLIENT_ID = ['|', '@', ':', '+'];

module.exports = {
  // the second capturing group is used to catch a user's github username
  CLIENT_ID_PATTERN: /^([^\/]*\/[^\/]*)\/([^\/]*).*$/,
  // Limits the encoding so that ALLOWED_CHARACTERS_IN_CLIENT_ID are not encoded
  // To make sure Client IDs are URL safe, we use a slightly different encoding
  // Encoding:
  // 1. Replace ! with !21
  // 2. Encode with encodeUriComponent (which won't encode !) while making sure allowed characters are not encoded
  // 3. Replace % with !
  encode: (str, allowed = ALLOWED_CHARACTERS_IN_CLIENT_ID) => {
    const encoded = allowed
      .reduce((acc, curr) => {
        const encodedSymbol = encodeURIComponent(curr);

        return acc.replace(new RegExp(encodedSymbol, 'g'), curr);
      }, encodeURIComponent(str.replace(/!/g, '!21')))
      .replace(/%/g, '!');

    return encoded;
  },
  // Decoding:
  // 1. Replace ! with %
  // 2. Decode with decodeUriComponent (which converts %21 to !)
  decode: str => decodeURIComponent(str.replace(/!/g, '%')),
};
