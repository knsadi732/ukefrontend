// export function viewURL(url) {
//   return url.replace("/download/", "/view/");
// }

export function viewURL(url) {
  const baseUrl = "http://localhost:5000/uploads/users/";
  if (url) {
    // Ensure you're joining the baseUrl and the file path correctly
    return baseUrl + url.replace("/download/", "/view/");
  }
  return ""; // Return empty string if no URL is provided
}


