
const addToCart = async (id, maxQ) => {


    // setting quantity when the buttonn is pressed
    const quantity = 1
    const productID = id
    // Example payload to add the product to cart
    let productInfo = {
        productID: productID,
        quantity: quantity,
        maxQ: maxQ,
    };

    console.log("productInfo: " + JSON.stringify(productInfo, null, 2));
    // Send the product to cart
    const response = await fetch("/cart/add", {
        method: "POST",
        body: JSON.stringify(productInfo),
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const data = await response.json();
        console.log("Product added to cart:", data);
        // be new call here
        fetchCartData(); // called in Nav Partial
    } else {
        alert("Failed to add product to cart");
    }
};


