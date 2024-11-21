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
const getproducts = async (page) => {
    let skip=(page - 1)*10;
    const { data } = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
    
    return data;
}
const displaygetproducts = async (page=1) => {
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");
   
    try {
        const data = await getproducts(page);
        const numOfpage=Math.ceil(data.total/10);
        const result = data.products.map((product) => {
            return `
        <div class="product">
        <img src="${product.thumbnail}" alt="${product.description}" class="image"/>
        <h2>${product.title}</h2>
        <span>${product.price}</span>
        
        </div>
        `
        }).join('');
        document.querySelector(".products .row").innerHTML = result;
        pagination(page,numOfpage);
          /*  Model();*/
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

window.onscroll = function () {
    const nav = document.querySelector(".header");
    const categories = document.querySelector(".categories");

    if (window.scrollY > categories.offsetTop) {
        nav.classList.add("scrollNAV");
    }
    else {
        nav.classList.remove("scrollNAV");
    }


}
/*---------------------- pagination-------------*/
function pagination(page,numOfpage){
    let paginationLinks=``;
    if(page == 1){
    paginationLinks+=`<li class="page-item"><button class="page-link" disabled>&laquo;</button></li>`;
    }
    else{
    paginationLinks+=`<li class="page-item"><button class="page-link" onclick=displaygetproducts('${page-1}')>&laquo;</button></li>`;
    }
    for(let i=1;i<=numOfpage;i++){
        paginationLinks+= `<li class="page-item ${i == page ? 'active':''}"><button class="page-link" onclick=displaygetproducts('${i}')>${i}</button></li>`;
    }
    if(page == numOfpage){
        paginationLinks+=`<li class="page-item"><button class="page-link" disabled>&raquo;</button></li>`;
    }
    else{
        paginationLinks+=`<li class="page-item"><button class="page-link" onclick=displaygetproducts('${parseInt(page)+1}')>&raquo;</button></li>`;  
    }
    document.querySelector('.pagination').innerHTML = paginationLinks;
}
/*-------------------MODEL-------------------*/
function Model() {
    const model = document.querySelector(".my-model");
    const closeBtn = document.querySelector(".close_btn");
    const rightBtn = document.querySelector(".right_btn");
    const leftBtn = document.querySelector(".left_btn");
    const images =document.querySelectorAll(".image");
    console.log(images);
    let currentIndex = 0;
    images.forEach(function (img) {
        img.addEventListener("click", function (e) {
            console.log("hi");
            model.classList.remove("d_none");
            model.querySelector("img").setAttribute("src", e.target.src);
            
        })
      
    })

}

