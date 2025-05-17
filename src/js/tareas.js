
const formTarea = document.querySelector("#formulario-tareas");

formTarea.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const inputNombreTarea = document.querySelector("#nombre-tarea");
    const selectPrioridadTarea = document.querySelector("#prioridad-tarea");
    const inputFechaTarea = document.querySelector("#fecha-tarea");

    const inputFechaTareaValue = inputFechaTarea.value ? inputFechaTarea.value: "No registra";

    const ulListaTareas = document.querySelector("#lista-tareas");
    const liTarea = document.createElement("li");
    const modificarTarea = document.createElement("button");
    const buttonEliminar = document.createElement("button");

    // Boton para modificar tarea de la lista
    modificarTarea.textContent = "Modificar";
    modificarTarea.classList.add("btn", "btn-warning", "btn-sm", "mx-2");
    modificarTarea.type = "button";
    modificarTarea.addEventListener("click", () => {
        // Pendiente
    })


    // Boton para eliminar tarea de la lista
    buttonEliminar.textContent = "Eliminar";
    buttonEliminar.classList.add("btn", "btn-danger", "btn-sm");
    buttonEliminar.type = "button";
    buttonEliminar.addEventListener("click", () => {
        liTarea.remove();
    });
    
    liTarea.textContent = `${inputNombreTarea.value} - ${selectPrioridadTarea.value} - ${inputFechaTareaValue}`;
    liTarea.appendChild(modificarTarea);
    liTarea.appendChild(buttonEliminar);

    buttonEliminar.addEventListener("click", () => {
        liTarea.remove();
    });
    
    ulListaTareas.appendChild(liTarea);

    console.log("Nombre de la tarea:", inputNombreTarea.value);
    console.log("Prioridad de la tarea:", selectPrioridadTarea.value);
    console.log("Fecha de la tarea:", inputFechaTarea.value);
    
    
})