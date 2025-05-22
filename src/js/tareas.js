const formTarea = document.querySelector("#formulario-tareas");
const ulListaTareas = document.querySelector("#lista-tareas");
const h5TituloAgregarTarea = document.querySelector("#titulo-agregar-tarea");
const buttonBtnGuardar = document.querySelector(".btn-guardar");
const inputNombreTarea = document.querySelector("#nombre-tarea");
const selectPrioridadTarea = document.querySelector("#prioridad-tarea");
const inputFechaTarea = document.querySelector("#fecha-tarea");
const filtroTarea = document.querySelectorAll(".filtro-tarea");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let editandoTareaId = null;
let filtroActual = "Todas";

//Funciones
const manejarEnvioFormulario = (evento) => {
    evento.preventDefault();

    let nombre = inputNombreTarea.value.trim();
    let prioridad = selectPrioridadTarea.value;
    let fecha = inputFechaTarea.value ? inputFechaTarea.value : "No registra";

    if (!nombre || !prioridad) return alert("Llena los campos con *")

    if (editandoTareaId) {
        tareas = tareas.map(tarea => {
            if (tarea.id === editandoTareaId) {
                return {
                    ...tarea,
                    nombre: nombre,
                    prioridad: prioridad,
                    fecha: fecha
                }
            }
            return tarea;
        })

        h5TituloAgregarTarea.textContent = "Agregar tarea";
        buttonBtnGuardar.textContent = "Guardar tarea";
        editandoTareaId = null;
    } else {
        // Crear un objeto tarea
        const tarea = {
            id: Date.now(),
            nombre: nombre,
            prioridad: prioridad,
            fecha: fecha,
            completada: false
        }

        // Agregar la tarea al array de tareas
        tareas.push(tarea);
    }
    // Guardar las tareas en el localStorage
    guardarTareasEnLocalStorage();
    // Mostrar las tareas en la lista
    mostrarTareas();
    // Limpiar el formulario
    formTarea.reset();
}

const guardarTareasEnLocalStorage = () => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}   

const mostrarTareas = () => {
    ulListaTareas.innerHTML = "";

    let tareasFiltradas = tareas;
    if (filtroActual === "Completadas") {
        tareasFiltradas = tareas.filter(tarea => tarea.completada === true);
    } else if (filtroActual === "Pendientes") {
        tareasFiltradas = tareas.filter(tarea => tarea.completada === false)
    }

    tareasFiltradas.forEach(tarea => {
        const li = document.createElement("li");
        li.className = "d-flex justify-content-between align-items-center p-2 border";
        if (tarea.completada) {
                li.classList.add("background-checked");
        } 
        
        const span = document.createElement("span");
        span.className = "contenido-tarea";
        span.innerHTML = `<strong>${tarea.nombre}</strong>, ${tarea.prioridad}, ${tarea.fecha}`;
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completada;
        checkbox.className = "checkbox-tarea";
        checkbox.addEventListener("click", () => {
            tarea.completada = checkbox.checked;

            guardarTareasEnLocalStorage();
            mostrarTareas();
        });

        const buttonEditar = document.createElement("button");
        buttonEditar.textContent = "Editar";
        buttonEditar.className = "btn-editar btn btn-warning";
        buttonEditar.onclick = () => {
            inputNombreTarea.value = tarea.nombre;
            selectPrioridadTarea.value = tarea.prioridad;
            inputFechaTarea.value = tarea.fecha;
            h5TituloAgregarTarea.textContent = "Editar tarea";
            buttonBtnGuardar.textContent = "Actualizar tarea";
            editandoTareaId = tarea.id;
        }

        const buttonEliminar = document.createElement("button");
        buttonEliminar.textContent = "Eliminar";
        buttonEliminar.className = "btn-eliminar btn btn-danger";
        buttonEliminar.onclick = () => {
            tareas = tareas.filter(element => element.id !== tarea.id);
            guardarTareasEnLocalStorage();
            mostrarTareas();
        }

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(buttonEditar);
        li.appendChild(buttonEliminar);
        ulListaTareas.appendChild(li);
    });
}

//Eventoss
formTarea.addEventListener("submit", manejarEnvioFormulario);
filtroTarea.forEach(selector => {
    selector.addEventListener("click", () => {
        filtroActual = selector.value;
        mostrarTareas();
    })
})

// Inicializar
mostrarTareas();