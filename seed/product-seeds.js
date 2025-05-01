const { Product } = require("../modals");

const productData = [
  {
    productName: "Plain T-Shirt",
    price: 14.99,
    stockNum: 14,
    category_id: 1, // Clothing
    description: "A comfortable plain t-shirt suitable for everyday wear.",
    image: "/assets/imgs/PlaceHolder.png",
    activeUnit: true,
    featured: false
  },
  {
    productName: "Cargo Shorts",
    price: 29.99,
    stockNum: 22,
    category_id: 2, // Shorts
    description: "Comfortable cargo shorts with multiple pockets for storage.",
    image: "/assets/imgs/PlaceHolder.png",
    activeUnit: true,
    featured: false
  },
  {
    productName: "Top 40 Music Compilation Vinyl Record",
    price: 12.99,
    stockNum: 50,
    category_id: 3, // Music
    description: "A compilation of top 40 hits, pressed on high-quality vinyl.",
    image: "/assets/imgs/PlaceHolder.png",
    activeUnit: true,
    featured: false
  },
  {
    productName: "Branded Baseball Hat",
    price: 22.99,
    stockNum: 12,
    category_id: 4, // Accessories
    description: "A stylish baseball hat featuring a prominent brand logo.",
    image: "/assets/imgs/PlaceHolder.png",
    activeUnit: true,
    featured: false
  },
  {
    productName: "Running Sneakers",
    price: 90.0,
    stockNum: 25,
    category_id: 5, // Footwear
    description: "Durable sneakers designed for long-distance running.",
    image: "/assets/imgs/PlaceHolder.png",
    activeUnit: true,
    featured: false
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
