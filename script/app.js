const containerEl = document.querySelector(".container");


function loadProducts(){
    fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => renderData(data))
    

}
loadProducts();

function renderData(products){

    products.forEach(product => {
        
        const boxEl = document.createElement("div");
        boxEl.className = "box";
        boxEl.innerHTML = `
        <img src="${product.image}" alt="img">
        <div class="sub-box">
            <p><strong> Price:</strong>${product.price}</p>
            <p><strong> Discount:</strong> ${product.category}</p>
            <p><strong> Desc:</strong> ${product.description}</p>
            <p><strong> Name:</strong> ${product.title}</p>
        </div>       
            <i data-post-id="${product.id}" class="fas fa-trash"></i>
        
        `
        containerEl.appendChild(boxEl)
    })

}

containerEl.addEventListener("click", (event) =>{
    if(event.target.classList.contains("fa-trash")){

        const postId = event.target.getAttribute("data-post-id");
        const isCustomerAgreed = confirm("Are you sure to delete this?")

       if(postId && isCustomerAgreed){
            fetch(`https://fakestoreapi.com/products/${postId}`,{
            method: "DELETE",
           }).then((response) => {
            if(response){
                loadProducts()
                console.log(response);
            }
            })
        }
   }

})