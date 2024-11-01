import Swal from 'sweetalert2';


export const poppleAlert = {
  alert : (title, text) => Swal.fire({
    // position: "top-end",
    timer: 1500,
    timerProgressBar: true,
    width: 300,
    height: 100,
    title,
    text
  })
};