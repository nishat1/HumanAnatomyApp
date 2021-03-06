const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Import routes
const bodyParser = require("body-parser");
const initializeFlashcardRoutes = require("./src/routes/flashcardRoutes");
const initializeQuizRoutes = require("./src/routes/quizRoutes");
const initializeImageRoutes = require("./src/routes/ImageRoutes");
const initializeStatRoutes = require("./src/routes/statRoutes");
const initializeAdminRoutes = require("./src/routes/adminRoutes");
const initializeCodeRoutes = require("./src/routes/codeRoutes");
const initializeExploreRoutes = require("./src/routes/exploreRoutes");
const initializeVideoRoutes = require("./src/routes/videoRoutes");
const initializeHierarchyRoutes = require("./src/routes/hierarchyRoutes");
const initializeVersionRoutes = require("./src/routes/versionRoutes");
const initializeContributorRoutes = require("./src/routes/contributorRoutes");

const app = express();

// middle wares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static(path.join(__dirname, "/../WebApp/")));
app.use(express.static(path.join(__dirname, "/../WebApp/css")));
app.use(express.static(path.join(__dirname, "/../WebApp/js")));

// initialize the routes
initializeFlashcardRoutes(app);
initializeQuizRoutes(app);
initializeImageRoutes(app);
initializeStatRoutes(app);
initializeAdminRoutes(app);
initializeCodeRoutes(app);
initializeExploreRoutes(app);
initializeVideoRoutes(app);
initializeHierarchyRoutes(app);
initializeVersionRoutes(app);
initializeContributorRoutes(app);

module.exports = app;
