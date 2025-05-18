
    const formTarea = document.querySelector("#formulario-tareas");
    const ulListaTareas = document.querySelector("#lista-tareas");
    const h5TituloAgregarTarea = document.querySelector("#titulo-agregar-tarea");
    const buttonBtnGuardar = document.querySelector(".btn-guardar");
    const inputNombreTarea = document.querySelector("#nombre-tarea");
    const selectPrioridadTarea = document.querySelector("#prioridad-tarea");
    const inputFechaTarea = document.querySelector("#fecha-tarea");
    
    let editandoTarea = null;
    
    formTarea.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombre = inputNombreTarea.value.trim();
        const prioridad = selectPrioridadTarea.value;
        const fecha = inputFechaTarea.value ? inputFechaTarea.value : "No registra";;

        if (editandoTarea) {
            editandoTarea.querySelector(".contenido-tarea").textContent = `${inputNombreTarea.value} - ${selectPrioridadTarea.value} - ${inputFechaTarea.value}`;

            h5TituloAgregarTarea.textContent = "Agregar tarea";
            buttonBtnGuardar.textContent = "Guardar tarea";
            editandoTarea = null;
        } else {
            const liTarea = document.createElement("li");

            const spanContenido = document.createElement("span");
            spanContenido.textContent = `${nombre} - ${prioridad} - ${fecha}`;
            spanContenido.classList.add("contenido-tarea");

            // Boton para modificar tarea de la lista
            const modificarTarea = document.createElement("button");
            modificarTarea.textContent = "Modificar";
            modificarTarea.classList.add("btn", "btn-warning", "btn-sm", "mx-2");
            modificarTarea.type = "button";
            modificarTarea.addEventListener("click", () => {
                h5TituloAgregarTarea.textContent = "Modificar Tarea";
                buttonBtnGuardar.textContent = "Guardar Cambios";

                inputNombreTarea.value = nombre;
                selectPrioridadTarea.value = prioridad;
                inputFechaTarea.value = fecha;

                editandoTarea = liTarea;
            })

            // Boton para eliminar tarea de la lista
            const buttonEliminar = document.createElement("button");
            buttonEliminar.textContent = "Eliminar";
            buttonEliminar.classList.add("btn", "btn-danger", "btn-sm");
            buttonEliminar.type = "button";
            buttonEliminar.addEventListener("click", () => liTarea.remove());
            
            liTarea.appendChild(spanContenido);
            liTarea.appendChild(modificarTarea);
            liTarea.appendChild(buttonEliminar);
        
            ulListaTareas.appendChild(liTarea);
        }        

        inputNombreTarea.value = "";
        selectPrioridadTarea.value = "";
        inputFechaTarea.value = "";
    })