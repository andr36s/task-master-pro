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
let filtroSeleccionado = "todas";

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
        editandoTarea = null;
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
        // li.classList.add();

        const span = document.createElement("span");
        // span.className = "";
        span.innerHTML = `<strong>${tarea.nombre}</strong> - ${tarea.prioridad} - ${tarea.fecha}`;
        li.appendChild(span);

        ulListaTareas.appendChild(li);
    });
}
//Eventoss
formTarea.addEventListener("submit", manejarEnvioFormulario);
console.log(filtroTarea);

filtroTarea.forEach(cualquierCosa => {
    cualquierCosa.addEventListener("click", () => {
        filtroActual = cualquierCosa.value;
        mostrarTareas();
    })
})