import Swal from 'sweetalert2';

export default withSwal({text} => {
    Swal.fire({
        title: 'Auto close alert!',
        text: 'I will close in 2 seconds.',
        timer: 2000
    })
});