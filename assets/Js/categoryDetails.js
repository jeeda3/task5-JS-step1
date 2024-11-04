const getProduct =async()=>{
    const params=new URLSearchParams(window.location.search);
   const category=params.get("category");
   const {data}=await axios.get(`https://dummyjson.com/products/category/${category}`);
   return data;
}
const displaygetCatogery = async()=>{
    const data=await getProduct();
    
    const result=data.products.map((product)=>{
        
        return`
        <div class="product">
        <img src="${product.thumbnail}" alt="${product.description}"/>
        <h2>${product.title}</h2>
        <span>${product.price}</span>
        
        </div>
        `
    }).join('');
  
    document.querySelector(".categories .row").innerHTML=result;

}
displaygetCatogery();