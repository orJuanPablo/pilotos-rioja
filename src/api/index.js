export default async function apiCall({ url, method = "get", body, headers }) {
  try {
    const response = await fetch({ url, method, body, headers });
    return response.json();
  } catch (error) {
    Promise.reject(error);
  }

  //   const getList = async () => {
  //     const response = await fetch("http://192.168.1.14:3000/api/pilotos", {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json", authorization: token },
  //     });
  //     try {
  //       const data = await response.json();
  //       return data;
  //     } catch (error) {
  //       Swal.fire({
  //         title: "Error 403",
  //         text: "Acceso prohibido, por favor inicie sesion y vuelva a intentarlo.",
  //         icon: "error",
  //         showConfirmButton: false,
  //         allowOutsideClick: false,
  //         allowEscapeKey: false,
  //         allowEnterKey: false,
  //         timer: 2000,
  //       }).then(hist.push("/login"));
  //     }
  //   };
}
