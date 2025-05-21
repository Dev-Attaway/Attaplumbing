const express = require("express");
const routes = require("./controllers");
const session = require("express-session");
const exphbs = require("express-handlebars");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
  PARTIALSDIR,
  LAYOUTDIR,
  PUBLICFOLDER,
  UPLOADSDIR,
} = process.env;

const fetchMetaData = require("./controllers/Middleware/metaDataMiddleware");
const app = express();

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const PORT = (process.env.PORT = 3005);
const HOST = "0.0.0.0"; // Listen on all interfaces

const hbs = exphbs.create({
  extname: ".handlebars",
  partialsDir: PARTIALSDIR,
  layoutsDir: LAYOUTDIR,
  helpers: {
    json: function (context) {
      return JSON.stringify(context);
    },
    isSelected: function (categoryId, selectedCategories) {
      return (
        selectedCategories && selectedCategories.includes(categoryId.toString())
      );
    },
    ifEquals: function (arg1, arg2, options) {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    },
    includes: function (str, substr) {
      if (typeof str === "string" && typeof substr === "string") {
        return str.includes(substr);
      }
      return false; // Return false if any argument is not a string
    },
    eq: function (a, b) {
      return a === b;
    },
    or: function (a, b) {
      return a || b;
    },
    gt: function (a, b) {
      return a > b;
    },
    range: function (start, end) {
      let rangeArray = [];
      for (let i = start; i <= end; i++) {
        rangeArray.push(i);
      }
      return rangeArray;
    },
    lt: function (a, b) {
      return a < b;
    },
    add: function (a, b) {
      return a + b;
    },
    subtract: function (a, b) {
      return a - b;
    },
    ifCond: function (v1, operator, v2, options) {
      switch (operator) {
        case "==":
          return v1 == v2 ? options.fn(this) : options.inverse(this);
        case "===":
          return v1 === v2 ? options.fn(this) : options.inverse(this);
        case "!=":
          return v1 != v2 ? options.fn(this) : options.inverse(this);
        case "!==":
          return v1 !== v2 ? options.fn(this) : options.inverse(this);
        case "<":
          return v1 < v2 ? options.fn(this) : options.inverse(this);
        case "<=":
          return v1 <= v2 ? options.fn(this) : options.inverse(this);
        case ">":
          return v1 > v2 ? options.fn(this) : options.inverse(this);
        case ">=":
          return v1 >= v2 ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    },
    repeat: function (times, block) {
      console.log("Repeat helper called with times =", times); // Debug log
      let result = "";
      for (let i = 0; i < times; i++) {
        result += block.fn(i);
      }
      return result;
    },
  },
  cache: false, // Disable caching in development
});

const sess = {
  secret: "Super secret secret",
  cookie: {}, //change to true when going live
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fetchMetaData);
app.use(express.static(PUBLICFOLDER));
app.use(express.static(UPLOADSDIR));

app.use(routes);

const base =
  process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

console.log(base);
app.use(express.static("client/dist"));
// parse post params sent in body in json format

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

app.use((req, res, next) => {
  res.status(404).render("notFound");
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, HOST, () => console.log(`Now listening on ${PORT}`));
});
