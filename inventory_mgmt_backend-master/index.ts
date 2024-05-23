//ignore typescript error for now
// @ts-nocheck
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import userRoutes from "./routes/users";
import supplierRoutes from "./routes/supplier";
import productRoutes from "./routes/product";
import receiverRoutes from "./routes/receiver";
import login from "./routes/login";
import category from "./routes/category";
import search from "./routes/search";
import intransaction from "./routes/intransaction";
import outtransaction from "./routes/outtransaction";

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/product", productRoutes);
app.use("/api/receivers", receiverRoutes);
app.use("/api/login", login);
app.use("/api/category", category);
app.use("/api/search", search);
app.use("/api/intransaction", intransaction);
app.use("/api/outtransaction", outtransaction);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
