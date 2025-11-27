document.addEventListener('DOMContentLoaded',()=>{

    const modal = document.getElementById('pop-up-editar');
    const contenidoModal = document.querySelector('.contenidoPop-Up');
    const editar = document.querySelectorAll('.btn-editar');
    const cerrar = modal.querySelector('.cerrar');

    const formularioEditar = document.getElementById('formularioEditar');
    const inputNombre = document.getElementById('nombre');
    const inputEmail = document.getElementById('email');
    const inputContraseña = document.getElementById('contraseña');
    const inputPermisos = document.getElementById('permisos');

    editar.forEach(btn =>{
        btn.onclick = (e)=>{

            const boton = e.target;

            const id = boton.dataset.id;
            const nombre = boton.dataset.nombre;
            const email = boton.dataset.email;
            const permisos = boton.dataset.permisos;

            inputNombre.value = nombre;
            inputEmail.value = email;
            inputContraseña.value = "";

            inputPermisos.checked = (permisos == 1);

            formularioEditar.action = `/editar/${id}`;

            const rect = e.target.getBoundingClientRect();
            const top = rect.bottom + window.scrollY + 5;
            const left = rect.left + window.scrollX;

            contenidoModal.style.margin = `${top}px 0 0 ${left}px`;

            modal.style.display = 'block';
        }
    });

    const eliminar = document.querySelectorAll('.btn-eliminar');

    eliminar.forEach(btn =>{
        btn.onclick=(e)=>{
            const boton = e.target;
            const id = boton.dataset.id;

            const confirmar = confirm(`Estas seguro de que quieres elinar al usuario con el ID: ${id}?`);

            if(confirmar){
                fetch(`/eliminar/${id}`,{
                    method: 'POST'
                })
                .then(res => res.json())
                .then(data => {
                    if(data.success){
                        alert('Usuario eliminado correctamente');
                        location.reload();
                    }else{
                        alert('Error al eliminar: ' + data.message);
                    }
                })
                .catch(err =>{
                    console.error('Error de red', err);
                    alert('Error de conexion al intentar eliminar')
                });
            }
        }
    });

    const cerrarModal = ()=>{
        modal.style.display = 'none';
        contenidoModal.style.margin = '10% auto';
    }

    if(cerrar){
        cerrar.onclick =()=>{
            cerrarModal();
        }
    }

    const modalAgregar = document.getElementById('pop-up-agregar');
    const contenidoModalAgregar = modalAgregar.querySelector('.contenidoPop-Up');
    const agregar = document.getElementById('añadir');
    const cerrarAgregar = modalAgregar.querySelector('.cerrar');

    if(agregar){
        agregar.onclick = (e) =>{
            document.getElementById('add_nombre').value ='';
            document.getElementById('add_email').value ='';
            document.getElementById('add_contraseña').value ='';
            document.getElementById('add_permisos').checked =false;

            const rect = e.target.getBoundingClientRect();
            const top = rect.bottom + window.scrollY + 5;
            const left = rect.left + window.scrollX;

            contenidoModalAgregar.style.margin = `${top}px 0 0 ${left}px`;

            modalAgregar.style.display = 'block';
        }
    }

    if(cerrarAgregar){
        cerrarAgregar.onclick = () =>{
            modalAgregar.style.display = 'none';
        }
    }

    
    window.onclick = (event)=>{
        if(event.target == modal){
        cerrarModal();     
       }
       if(event.target == modalAgregar){
        modalAgregar.style.display = 'none';
       }
    }
  
});