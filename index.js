import express from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path from "path";
import "./src/database/database.js";
import restauranteRouter from "./src/routes/restaurante.routes.js";

const app = express();
app.set("port", 4030);

app.listen(app.get("port"), () => {
  console.log("Estoy vivo ");
  console.log(`Estoy en el puerto ${app.get("port")}`);
});

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "/public")));

app.use("/api", restauranteRouter);
