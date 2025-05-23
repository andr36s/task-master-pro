const formHabito = document.querySelector("#form-habito");
const inputHabito = document.querySelector("#input-habito");

formHabito.addEventListener("submit", (event) => {
    event.preventDefault();
    const nombreHabito = inputHabito.value.trim();

    if (!nombreHabito) alert("Por favor, ingresa un hábito.");

    const nuevoHabito = {
        id: Date.now(),
        nombre: nombreHabito,
        completado: false
    }
    console.log(nuevoHabito);
    
});