import Swal from 'sweetalert2';


export const poppleAlert = {
  alert : (title, text) => Swal.fire({
    // position: "top-end",
    timer: 5000,
    timerProgressBar: true,
    width: 400,
    height: 100,
    title,
    text,
  }),
  check : (title, text, confirmAction, cancelAction) => Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "네",
    cancelButtonText: "아니요",
  }).then((result) => {
    if (result.isConfirmed) {
      confirmAction();
    } else {
      cancelAction();
    }
  })
};