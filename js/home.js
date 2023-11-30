const productos = JSON.parse(localStorage.getItem("productos")) || [];
const cardContainer = document.getElementById("card-container");

productos.forEach((prod) => {
    cardContainer.innerHTML += `
    
    <div class="card" style="width: 100%;">
    <img src="${prod.imagen}" alt="${prod.titulo}" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title">${prod.titulo}</h5>
        
        <p class="card-text">${prod.descripcion}</p>
        <a href="../pages/product/description.html?identificador=${prod.id}" class="btn mr-2">
            <i class="fas fa-link"></i>
            Ver Más
        </a>
        <a href="#" class="btn"><i class="fab fa-github"></i>Comprar</a>
    </div>
</div>
    
    `
});


/*

    <div class="card" style="width: 100%;">
                <img src="" alt="" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Card Title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card Subtitle</h6>
                    <p class="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor deserunt
                        facilis aliquam doloremque dolorum adipisci, laudantium, pariatur reprehenderit illum autem hic
                        voluptas optio culpa enim ipsa laboriosam sequi reiciendis accusantium.</p>
                    <a href="#" class="btn mr-2">
                        <i class="fas fa-link"></i>Ver Más
                    </a>
                    <a href="#" class="btn"><i class="fab fa-github"></i>Comprar</a>
                </div>
            </div>

*/