const {
  Message,
  Product,
  Category,
  SubCategory,
  ProductSubCategory,
  User,
  Slides,
  Leads,
} = require("../modals");

const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 15;
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const nodemailer = require("nodemailer");

// ✅ Define upload path
const UPLOADS_DIR = path.join(__dirname, "../public/assets/uploads");

// ✅ Ensure upload directory exists

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// ✅ Multer Storage: Always save to disk first
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Invalid file type"), false);
    }
    cb(null, true);
  },
}).array("productImages", 5); // Allow up to 5 images

router.use((req, res, next) => {
  const isLoggedIn = req.session.logged_in ? true : false;
  const currentPath = req.path;

  // Pass variables to templates
  res.locals.isLoggedIn = isLoggedIn;
  res.locals.currentPath = currentPath;

  next(); // Proceed to the next middleware or route
});

router.get("/", async (req, res) => {
  try {
    const productsDb = await Product.findAll({
      where: {
        featured: true,
        activeUnit: true,
      },
      include: [
        {
          model: Category, // Include the Category model
        },
        {
          model: SubCategory, // Include the SubCategory model through ProductSubCategory
          through: {
            model: ProductSubCategory, // This is the join table model
            attributes: [], // Exclude attributes from the join table, optional
          },
        },
      ],
    });

    // Convert Sequelize instances to plain JavaScript objects

    // instance of product to plain JavaScript objects
    const products = productsDb.map((product) => product.get({ plain: true }));

    res.render("newsSplash", {
      products,
    });
  } catch (error) {
    res.render("home");
  }
});

router.get("/home", async (req, res) => {
  try {
    const productsDb = await Product.findAll({
      where: {
        featured: true,
        activeUnit: true,
      },
      include: [
        {
          model: Category, // Include the Category model
        },
        {
          model: SubCategory, // Include the SubCategory model through ProductSubCategory
          through: {
            model: ProductSubCategory, // This is the join table model
            attributes: [], // Exclude attributes from the join table, optional
          },
        },
      ],
    });

    // Convert Sequelize instances to plain JavaScript objects

    // instance of product to plain JavaScript objects
    const products = productsDb.map((product) => product.get({ plain: true }));

    res.render("home", {
      products,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/service-process", async (req, res) => {
  console.log(res.locals);

  res.render("service-process");
});

router.get("/services", async (req, res) => {
  console.log(res.locals);

  res.render("services");
});

router.get("/construct", async (req, res) => {
  console.log(res.locals);

  res.render("construction");
});

router.get("/about", async (req, res) => {
  res.render("about");
});

router.get("/contact", async (req, res) => {
  res.render("contact");
});

router.get("/orderConfirm", async (req, res) => {
  res.render("orderConfirm");
});

// adding shop page route
// router.get("/shop-page", async (req, res) => {
//   try {
//     const sort = req.query.sort || "name_asc"; // Default to sorting by name (A-Z)
//     const page = parseInt(req.query.page) || 1; // Default to the first page
//     const limit = 48; // Number of products per page
//     const offset = (page - 1) * limit; // Offset for pagination

//     // Define sort options for Sequelize query
//     let order = [];
//     switch (sort) {
//       case "price_asc":
//         order = [["price", "ASC"]];
//         break;
//       case "price_desc":
//         order = [["price", "DESC"]];
//         break;
//       case "name_asc":
//         order = [["productName", "ASC"]];
//         break;
//       case "name_desc":
//         order = [["productName", "DESC"]];
//         break;
//       default:
//         order = [["productName", "ASC"]];
//     }

//     // Fetch paginated and sorted products
//     const { count, rows: productsDb } = await Product.findAndCountAll({
//       where: {
//         activeUnit: true,
//       },
//       include: [Category, { model: SubCategory, through: ProductSubCategory }],
//       limit,
//       offset,
//       order,
//     });

//     // Convert Sequelize instances to plain JavaScript objects
//     const products = productsDb.map((product) => product.get({ plain: true }));

//     // Calculate total pages and pagination numbers
//     const totalPages = Math.ceil(count / limit);
//     const paginationPages = [];
//     for (let i = 1; i <= totalPages; i++) {
//       paginationPages.push(i); // Create an array of page numbers for Handlebars
//     }

//     const categoriesDb = await Category.findAll({
//       include: [
//         {
//           model: SubCategory, // Include the SubCategory model
//           as: "sub_categories", // Use the alias if you've defined one
//         },
//       ],
//     });
//     // Map Sequelize model instances to plain JS objects
//     const categories = categoriesDb.map((category) =>
//       category.get({ plain: true })
//     );

//     // Render the template with products, categories, and pagination info
//     res.render("shopPage", {
//       products,
//       categories: categories || [],
//       currentPage: page,
//       totalPages,
//       paginationPages, // Pass page numbers to Handlebars
//       sort, // Pass current sort option to maintain sorting in pagination links
//     });
//   } catch (err) {
//     res.status(400).json(err.message);
//   }
// });

// router.get("/product/:id", async (req, res) => {
//   try {
//     const productDb = await Product.findByPk(req.params.id, {
//       include: [
//         {
//           model: Category, // Include the Category model
//         },
//         {
//           model: SubCategory, // Include the SubCategory model through ProductSubCategory
//           through: {
//             model: ProductSubCategory, // This is the join table model
//             attributes: [], // Exclude attributes from the join table, optional
//           },
//         },
//       ],
//     });

//     // instance of product to plain JavaScript objects
//     const product = productDb.get({ plain: true });

//     console.log(product);
//     res.render("product", {
//       product,
//     });
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

//After Chosing a Category, this gets all subcategories currently entered for this category.
// router.get("/getSubCategories/:id", async (req, res) => {
//   try {
//     const SubCategoryDB = await SubCategory.findAll({
//       where: {
//         category_id: req.params.id,
//       },
//     });
//     console.log("getting These SubCategories:", SubCategoryDB);
//     res.status(200).json(SubCategoryDB);
//   } catch (err) {
//     res.status(400).json(err);
//     console.log(err);
//   }
// });

router.post("/contact/submit", async (req, res) => {
  try {
    console.log(req.body);
    const newMess = await Leads.create(req.body);
    res.status(200).json(newMess);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/unsubscribe/:email", async (req, res) => {
  const email = req.params.email; // ✅ correctly use route param

  if (!email) {
    return res.status(400).send("Email is required.");
  }

  try {
    const lead = await Leads.findOne({
      where: {
        formData: {
          email: email,
        },
      },
    });

    if (!lead) {
      return res
        .status(404)
        .send("We couldn't find a subscription with that email.");
    }

    await lead.destroy();

    res.send("You've been unsubscribed successfully.");
  } catch (err) {
    console.error("Unsubscribe error:", err);
    res.status(500).send("An error occurred. Please try again.");
  }
});

router.post("/newsletter/subscribe", async (req, res) => {
  try {
    const { formData } = req.body;
    console.log(formData.email, "this is my check");
    if (!formData?.email) {
      return res.status(400).json({ message: "Email is required." });
    }

    console.log("Email exsistiss");

    // 🔍 Check if this email already exists in formData.email
    const existing = await Leads.findOne({
      where: {
        formName: "NewsLetter",
        formData: {
          email: formData.email,
        },
      },
    });
    console.log(existing);

    if (existing) {
      console.log("I exsist");
      return res
        .status(409)
        .json({ message: "This email is already subscribed." });
    }

    const newMess = await Leads.create(req.body);

    // ✉️ Set up Nodemailer
    const transporter = nodemailer.createTransport({
      host: "mail.privateemail.com", // e.g., smtp.mail.yahoo.com, smtp.zoho.com, mail.yourdomain.com
      port: 587, // or 587 if using STARTTLS
      secure: false, // true for port 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    // Email send attempt
    try {
      // 📨 Send welcome email
      await transporter.sendMail({
        from: '"Attaplumbing" <support@queuedevelop.com>',
        to: formData.email,
        subject: "Thanks for subscribing!",
        html: `
<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;background-color:#fefefe;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Attaplumbing</title>
  </head>
  <body style="font-family:Arial, sans-serif;background-color:#fefefe;margin:0;padding:0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fefefe;">
      <tr>
        <td align="center" style="padding: 40px 20px;">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border:1px solid #ddd;border-radius:8px;padding: 30px;">
            <!-- Header -->
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <h1 style="color:#000000;margin:0;font-size:24px;">Welcome to <span style="color:#ed1b24;">Attaplumbing</span> — Smarter Shopping Starts Here</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="color:#000000;font-size:16px;line-height:1.6;padding: 0 20px;">
                <p style="margin-bottom: 16px;">
                  Welcome to <strong>Attaplumbing</strong>! 👋<br><br>
                  Your trusted partner for all plumbing repairs, installations, and maintenance. Whether it's a leaky faucet, clogged drain, or emergency pipe burst, our licensed technicians are ready to help.
                </p>
                <p style="margin-bottom: 16px;">
                  We pride ourselves on:
                </p>
                <ul style="margin-bottom: 24px; padding-left: 20px;">
                  <li>Upfront pricing with no hidden fees</li>
                  <li>Licensed and insured professionals</li>
                  <li>Quality workmanship with lasting results</li>
                </ul>
                <p style="margin-bottom: 32px; text-align: center;">
                  Ready to solve your plumbing problems? We're just one call away.
                </p>
                <div style="text-align: center;">
                  <a href="https://www.Attaplumbing.com/contact" style="background-color:#1dede2;color:#000000;text-decoration:none;font-weight:bold;padding:12px 24px;border-radius:6px;display:inline-block;">
                    Contact Us Today
                  </a>
                </div>
              </td>
            </tr>

            <!-- New Section: We're Just Getting Started -->
            <tr>
              <td style="padding: 40px 20px 20px; text-align: center; font-size: 16px; color: #000000;">
                <h2 style="font-size:18px; font-weight:bold; margin-bottom: 12px;">We’re Just Getting Started 🚀</h2>
                <p style="margin-bottom: 16px;">
                  Attaplumbing is starting small — handpicking only the suppliers and products we trust.
                  But we’re adding more OEMs and new finds every day.
                </p>
                <p style="margin-bottom: 0;">
                  Keep checking back for fresh drops, trusted factories, and smarter ways to shop the global supply chain.
                </p>
              </td>
            </tr>

            <!-- Footer / Unsubscribe -->
            <tr>
              <td style="padding-top: 40px; text-align: center; font-size: 12px; color: #666;">
                <p style="margin-bottom: 4px;">You're receiving this email because you signed up for updates from Attaplumbing.</p>
                <p style="margin-bottom: 8px;">
                  If you'd rather not receive emails from us, you can
                  <a href="https://www.Attaplumbingtradepost.com/unsubscribe/${encodeURIComponent(
                    formData.email
                  )}" style="color:#ed1b24;text-decoration:underline;">unsubscribe here</a>.
                </p>
                <p style="margin: 4px 0;">Attaplumbing</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
        `,
      });

      res.status(200).json(newMess);
    } catch (emailErr) {
      console.error("❌ Email sending failed:", emailErr);
      return res
        .status(500)
        .json({ message: "Subscription saved, but email failed to send." });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/test-email", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Test" <support@queuedevelop.com>',
      to: "quentinhnilica@gmail.com",
      subject: "SMTP Test",
      text: `<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;background-color:#fefefe;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Attaplumbing</title>
  </head>
  <body style="font-family:Arial, sans-serif;background-color:#fefefe;margin:0;padding:0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fefefe;">
      <tr>
        <td align="center" style="padding: 40px 20px;">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border:1px solid #ddd;border-radius:8px;padding: 30px;">
            <!-- Header -->
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <h1 style="color:#000000;margin:0;font-size:24px;">Welcome to <span style="color:#ed1b24;">Attaplumbing</span> — Smarter Shopping Starts Here</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="color:#000000;font-size:16px;line-height:1.6;padding: 0 20px;">
                <p style="margin-bottom: 16px;">
                  Welcome to <strong>Attaplumbing</strong>! 👋<br><br>
                  Your trusted partner for all plumbing repairs, installations, and maintenance. Whether it's a leaky faucet, clogged drain, or emergency pipe burst, our licensed technicians are ready to help.
                </p>
                <p style="margin-bottom: 16px;">
                  We pride ourselves on:
                </p>
                <ul style="margin-bottom: 24px; padding-left: 20px;">
                  <li>24/7 emergency service</li>
                  <li>Upfront pricing with no hidden fees</li>
                  <li>Licensed and insured professionals</li>
                  <li>Quality workmanship with lasting results</li>
                </ul>
                <p style="margin-bottom: 32px; text-align: center;">
                  Ready to solve your plumbing problems? We're just one call away.
                </p>
                <div style="text-align: center;">
                  <a href="https://www.Attaplumbing.com/contact" style="background-color:#1dede2;color:#000000;text-decoration:none;font-weight:bold;padding:12px 24px;border-radius:6px;display:inline-block;">
                    Contact Us Today
                  </a>
                </div>
              </td>
            </tr>
            <!-- New Section: We're Just Getting Started -->
            <tr>
              <td style="padding: 40px 20px 20px; text-align: center; font-size: 16px; color: #000000;">
                <h2 style="font-size:18px; font-weight:bold; margin-bottom: 12px;">We’re Just Getting Started 🚀</h2>
                <p style="margin-bottom: 16px;">
                  Attaplumbing is starting small — handpicking only the suppliers and products we trust.
                  But we’re adding more OEMs and new finds every day.
                </p>
                <p style="margin-bottom: 0;">
                  Keep checking back for fresh drops, trusted factories, and smarter ways to shop the global supply chain.
                </p>
              </td>
            </tr>

            <!-- Footer / Unsubscribe -->
            <tr>
              <td style="padding-top: 40px; text-align: center; font-size: 12px; color: #666;">
                <p style="margin-bottom: 4px;">You're receiving this email because you signed up for updates from Attaplumbing.</p>
                <p style="margin-bottom: 8px;">
                  If you'd rather not receive emails from us, you can
                  <a href="https://www.Attaplumbingtradepost.com/unsubscribe/" style="color:#ed1b24;text-decoration:underline;">unsubscribe here</a>.
                </p>
                <p style="margin: 4px 0;">Attaplumbing</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
        `,
    });

    res.send("Test email sent");
  } catch (err) {
    console.error(err);
    res.status(500).send("SMTP test failed");
  }
});

// Route to check if a category exists by name
// router.get("/categories/check", async (req, res) => {
//   const categoryName = req.query.name;

//   try {
//     const category = await Category.findOne({ where: { categoryName } });

//     if (category) {
//       return res.json(category); // Return the existing category if found
//     } else {
//       return res.json(null); // Return null if no category found
//     }
//   } catch (error) {
//     console.error("Error checking category:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// Route to check if a subcategory exists by name and category ID
// router.get("/subcategories/check", async (req, res) => {
//   const subCategoryName = req.query.name;
//   const categoryId = req.query.category_id;

//   try {
//     const subCategory = await SubCategory.findOne({
//       where: { subCategoryName, category_id: categoryId },
//     });

//     if (subCategory) {
//       return res.json(subCategory); // Return the existing subcategory if found
//     } else {
//       return res.json(null); // Return null if no subcategory found
//     }
//   } catch (error) {
//     console.error("Error checking subcategory:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// Login Logic

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.userName },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

// cart routes using sess storage to avoid using a user signin system

// router.post("/cart/add", (req, res) => {
//   const { productID, quantity, maxQ } = req.body;

//   // If cart doesn't exist in session, create an empty cart
//   if (!req.session.cart) {
//     req.session.cart = [];
//   }

//   // Check if the product is already in the cart
//   const existingCartItem = req.session.cart.find(
//     (item) => item.productID === productID
//   );

//   const quantityToAdd = parseInt(quantity);

//   if (existingCartItem) {
//     // Update the quantity if the product is already in the cart
//     existingCartItem.quantity =
//       parseInt(existingCartItem.quantity) + quantityToAdd;
//   } else {
//     // Add the product to the cart
//     req.session.cart.push({ productID, quantity });
//   }
//   console.log("Updated cart: ", JSON.stringify(req.session.cart, null, 2));

//   res.json({ message: "Product added to cart", cart: req.session.cart });

//   //*************  Clear the cart this for testing purposes  ****************
//   // req.session.cart = null; // or delete req.session.cart;
// });

// router.post("/cart/update", (req, res) => {
//   const { productID, quantity, maxQ } = req.body;

//   // If cart doesn't exist in session, create an empty cart
//   if (!req.session.cart) {
//     req.session.cart = [];
//   }

//   // Check if the product is already in the cart
//   const existingCartItem = req.session.cart.find(
//     (item) => String(item.productID) === String(productID)
//   );

//   const quantityToAdd = parseInt(quantity);

//   if (existingCartItem) {
//     // Update the quantity if the product is already in the cart
//     existingCartItem.quantity = quantity;
//   } else {
//     // Add the product to the cart
//     req.session.cart.push({ productID, quantity });
//   }
//   console.log("Updated cart: ", JSON.stringify(req.session.cart, null, 2));

//   res.json({ message: "Product added to cart", cart: req.session.cart });

//   //*************  Clear the cart this for testing purposes  ****************
//   // req.session.cart = null; // or delete req.session.cart;
// });

// router.get("/cart", async (req, res) => {
//   try {
//     console.log("testing in cart:", JSON.stringify(req.session.cart, null, 2));
//     const cart = req.session.cart || [];

//     // Array to store the product details
//     let cartItems = [];

//     // Loop through the cart and find each product by id
//     for (let i = 0; i < cart.length; i++) {
//       const product_id = cart[i].productID;
//       const sessionquantity = cart[i].quantity; // Quantity stored in session
//       const product = await Product.findOne({
//         where: { id: product_id },
//         raw: true, // Optional: if you want the plain object instead of a Sequelize instance
//       });

//       if (product) {
//         product.quantity = sessionquantity;
//         cartItems.push(product); // Add the product to the cartItems array
//       }
//     }

//     // Getting the total for all the products grabbed
//     let pretotal = 0;
//     for (let i = 0; i < cartItems.length; i++) {
//       pretotal += cartItems[i].price * cartItems[i].quantity;
//     }
//     var total = Math.round(pretotal * 100) / 100;
//     res.json({
//       cartItems,
//       total,
//     });
//   } catch (error) {
//     console.error("Error finding products in the cart:", error);
//     res.status(500).json({ message: "Failed to find cart" });
//   }
// });

// router.get("/cart/checkout", async (req, res) => {
//   try {
//     console.log("testing in cart:", JSON.stringify(req.session.cart, null, 2));
//     const cart = req.session.cart || [];

//     // Array to store the product details
//     let cartItems = [];

//     // Loop through the cart and find each product by id
//     for (let i = 0; i < cart.length; i++) {
//       const product_id = cart[i].productID;
//       const sessionquantity = cart[i].quantity; // Quantity stored in session
//       const product = await Product.findOne({
//         where: { id: product_id },
//         raw: true, // Optional: if you want the plain object instead of a Sequelize instance
//       });

//       if (product) {
//         product.currQuan = sessionquantity;
//         cartItems.push(product); // Add the product to the cartItems array
//       }
//     }

//     // Getting the total for all the products grabbed
//     let pretotal = 0;
//     for (let i = 0; i < cartItems.length; i++) {
//       pretotal += cartItems[i].price * cartItems[i].currQuan;
//     }

//     var total = Math.round(pretotal * 100) / 100;
//     var pretax = total * 0.06;
//     var tax = Math.round(pretax * 100) / 100;

//     var prerealTotal = total + tax;
//     var realTotal = Math.round(prerealTotal * 100) / 100;

//     res.render("cart", {
//       cartItems, // Pass the list of products to the view
//       total,
//       tax,
//       realTotal,
//     });
//   } catch (error) {
//     console.error("Error finding products in the cart:", error);
//     res.status(500).json({ message: "Failed to find cart" });
//   }
// });

// router.delete("/cart/delete/:productID", async (req, res) => {
//   try {
//     const productID = req.params.productID; // Get productID from request params

//     if (!req.session.cart) {
//       return res.status(404).json({ message: "Cart not found." });
//     }
//     console.log("This product id is", productID);
//     // Find the index of the item in the cart
//     const cartIndex = req.session.cart.findIndex(
//       (item) => item.productID == productID
//     );
//     console.log(req.session.cart);
//     console.log("productIndex = ", cartIndex);

//     if (cartIndex !== -1) {
//       // Remove the item from the cart
//       req.session.cart.splice(cartIndex, 1);
//       console.log(`Product ${productID} removed from cart.`);

//       // Optionally, send the updated cart back to the client
//       res.status(200).json({
//         cart: req.session.cart,
//         message: "Product removed from cart.",
//       });
//     } else {
//       res.status(404).json({ message: "Product not found in cart." });
//     }
//   } catch (error) {
//     console.error("Error removing product from cart:", error);
//     res.status(500).json({ message: "Failed to remove product from cart." });
//   }
// });

// image posting

router.post("/upload", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("❌ Multer Error:", err);
      return res
        .status(400)
        .json({ error: "Upload failed", details: err.message });
    }

    if (!req.files || req.files.length === 0) {
      console.error("❌ No files uploaded.");
      return res.status(400).json({ error: "No images uploaded" });
    }

    try {
      console.log("✅ Files received:", req.files.length);

      // ✅ Process Images Asynchronously (Parallel Processing)
      const filePaths = await Promise.all(
        req.files.map(async (file) => {
          try {
            const optimizedBuffer = await sharp(file.buffer)
              .rotate() // Auto-fix orientation
              .resize(800, 800, { fit: "inside" }) // Resize while keeping aspect ratio
              .jpeg({ quality: 75 }) // Optimize quality
              .toBuffer();

            // ✅ Save optimized image
            const filename = `optimized_${Date.now()}_${file.originalname}`;
            const filePath = path.join(UPLOADS_DIR, filename);
            await fs.promises.writeFile(filePath, optimizedBuffer);

            return `/assets/uploads/${filename}`;
          } catch (error) {
            console.error("❌ Sharp Processing Error:", error);
            return null;
          }
        })
      );

      // ✅ Filter out failed uploads
      const validPaths = filePaths.filter((path) => path !== null);

      if (validPaths.length === 0) {
        throw new Error("All image processing failed");
      }

      res.json({ message: "Images uploaded successfully!", paths: validPaths });
    } catch (error) {
      console.error("❌ Image Processing Error:", error);
      res
        .status(500)
        .json({ error: "Image processing failed", details: error.message });
    }
  });
});

router.post("/createMyUser", async (req, res) => {
  try {
    const CreateNew = {
      username: "Dace",
      email: "dace@ragfrogrevival.com",
      password: "SuperPass123!",
      isAdmin: true,
    };

    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Disclosure Routes
router.get("/privacy", async (req, res) => {
  res.render("privacy");
});

router.get("/policy", async (req, res) => {
  res.render("policy");
});
router.get("/terms", async (req, res) => {
  res.render("terms");
});
router.get("/accessibility", async (req, res) => {
  res.render("accessibility");
});

module.exports = router;
