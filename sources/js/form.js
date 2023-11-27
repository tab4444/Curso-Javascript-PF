const form = document.getElementById("contact-form");

form.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(
        new FormData(e.target)
    );
    sessionStorage.setItem("USUARIO", JSON.stringify(data));
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Gracias por su mensaje",
        showConfirmButton: false,
        timer: 1500
    });
});