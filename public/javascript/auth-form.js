window.addEventListener("DOMContentLoaded", () => {
  const forgot = document.querySelector("#forgot");

  forgot.addEventListener("click", () => {
    Swal.fire({
      title: "Renseignez votre email: ",
      input: "email",
    }).then((result) => {
      const email = result.value;
      if (email) {
        axios
          .post("/user/forgot-password", {
            email: email,
          })
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Vous avez reçu un email avec les instructions",
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Une erreur s'est produite",
            });
          });
      }
    });
  });
});
