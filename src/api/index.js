export default async function apiCall({ url, method = "GET", body, headers }) {
  try {
    const response = await fetch(`https://pilotos-rioja.herokuapp.com/api/${url}`,{ method, body, headers });
    return response;
  } catch (error) {
    console.error(error)
    Promise.reject(error);
  }
}
