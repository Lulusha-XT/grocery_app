import express from "express";
import connectDB from "../config/db.conn";
import errorHandler from "../middleware/error";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import routes from "../routes/api/app.routes";
import bodyParser from "body-parser";

connectDB();
const app = express();

// app.use(express.json);
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", routes);
app.use(errorHandler);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.port || 4000, () => {
  console.log("Ready to go at http://localhost:4000");
});
