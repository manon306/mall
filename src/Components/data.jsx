// data/products.js
const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products?limit=1000');
    const data = await res.json();
    console.log(data.products); // لو عايزة تشوفي كل المنتجات في الكونسول

        return data.products.map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.thumbnail,
        category: product.category,
        }));
}
  
  export default fetchProducts;
  