const getcategories = async () => {
    const { data } = await axios.get('https://dummyjson.com/products/category-list');
    return data;
}
const displaycategories = async () => {
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");
    try {
        const data = await getcategories();
        const result = data.map((category) => {
            return `
        <div class="category">
        <h2>${category}</h2>
        <a href='categoryDetails.html?category=${category}'>Details</a>
        </div>`

        }).join('');
        document.querySelector(".categories .row").innerHTML = result;
    }
    catch (error) {
        document.querySelector(".categories .row").innerHTML = "<p>error loading</p>";
    }
    finally {
        loader.classList.remove("active");
    }
}
const getproducts = async () => {
    const { data } = await axios.get('https://dummyjson.com/products');
    return data;
}
const displaygetproducts = async () => {
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");
    try {
        const data = await getproducts();
        const result = data.products.map((product) => {
            return `
        <div class="product">
        <img src="${product.thumbnail}" alt="${product.description}"/>
        <h2>${product.title}</h2>
        <span>${product.price}</span>
        
        </div>
        `
        }).join('');
        document.querySelector(".products .row").innerHTML = result;
    }
    catch (error) {
        document.querySelector(".categories .row").innerHTML = "<p>error loading</p>";
    }
    finally {
        loader.classList.remove("active");
    }
}
displaycategories();
displaygetproducts();

window.onscroll=function(){
    const nav=document.querySelector(".header");
    const categories=document.querySelector(".categories");
    
   if(window.scrollY > categories.offsetTop){
    nav.classList.add("scrollNAV");
   }
   else{
    nav.classList.remove("scrollNAV");
   }
 

}

