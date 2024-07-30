function isValidBaseURL(url, baseURLs) {
  // Regular expression for a valid URL pattern
  const urlRegex = /^((http|https):\/\/)?([^\?\/]+)(\?.*)?$/;

  // Check if the URL follows the basic structure
  const match = url.match(urlRegex);
  if (!match) {
    return false;
  }

  // Extract hostname (without protocol)
  const hostname = match[3];

  // Check if the hostname matches any base URL
  return baseURLs.some((baseURL) => hostname.endsWith(baseURL));
}

export function validateDynamicURL({ url, baseURLs }) {
  if (!isValidBaseURL(url, baseURLs)) {
    return false;
  }

  return true;
}
