export function mapProductToCard(product) {
   console.log('Mapping product to card:', product); // Log product mapping
   return `
       <div class="product-card flex-col gap-20 items-center justify-between">
           <h3 class="card-title">${product.name}</h3>
           <a href="pages/details.html?id=${product.id}">
              
               <img src=${product.imageUrl} width="150px"/>
           </a>
           <p class="card-price">${product.price} €</p>
   
           <button class="add-to-cart" 
           data-id="${product.id}" 
           data-name="${product.name}" 
           data-price="${product.price}" 
           data-image="${product.imageUrl}">Add to cart</button>
       </div>
   `;
}


export function mapProductToAdminTableRow(product) {
	return `
            <tr>
               <td>${product.name}</td>
               <td>${product.price}</td>
               <td>
                  <a href="details.html?id=${product.id}">
                     <img src="${product.imageUrl}" width="60px" />
                  </a>
               </td>
               <td>
                  <button class="edit-${product.id}">
                     <i class="fa-solid fa-pen-to-square">
                     </i>
                  </button>
               </td>
               <td>
                  <button class="delete-${product.id}">
                     <i class="fa-solid fa-trash"></i>
                  </button>
               </td>
               
            </tr>
            `;
}