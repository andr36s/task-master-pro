export async function loadLayout() {
    const navbar = await fetch('../components/navbar.html')
        .then(response => response.text());
    const footer = await fetch('../components/footer.html')
        .then(response => response.text());
    
    document.getElementById('navbar').innerHTML = navbar;
    document.getElementById('footer').innerHTML = footer;

    setTimeout(() => {
        const yearSpan = document.getElementById("year");
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }, 50);
}