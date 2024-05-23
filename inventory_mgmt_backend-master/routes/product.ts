import { Router, Request, Response } from "express";
import { getConnection } from "../config/db";

interface OkPacket {
  affectedRows: number;
}

const router = Router();

// Get all products
router.get("/", async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const [rows, fields] = await conn.execute("SELECT * FROM product");
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get a product by ID
// router.get("/:id", async (req: Request, res: Response) => {
//   try {
//     const conn: any = await getConnection();
//     const [rows, fields] = await conn.execute(
//       "SELECT * FROM product WHERE id = ?",
//       [req.params.id]
//     );
//     if (rows.length === 0) {
//       res.status(404).json({ error: "Product not found" });
//     } else {
//       res.json(rows[0]);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// Get a product by name
router.get("/:name", async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const result = await conn.query("SELECT * FROM product WHERE name = ?", [
      req.params.name,
    ]);
    res.status(200).json(result[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new product
router.post("/", async (req: Request, res: Response) => {
  const { name, description, category, threshold, user_id, price } = req.body;
  try {
    const conn: any = await getConnection();

    //fetch category id from category name
    const [rows] = await conn.execute(
      "SELECT id FROM category WHERE name = ?",
      [category]
    );
    const category_id = rows[0].id;

    const [result] = await conn.execute(
      "INSERT INTO product (name, description, quantity, category_id,  threshold, user_id, price) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, description, 0, category_id, threshold, user_id, 0]
    );
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a product
router.put("/:id", async (req: Request, res: Response) => {
  const {
    name,
    description,
    quantity,
    category,
    purchase_date,
    expiry_date,
    supplier_id,
    user_id,
    price,
  } = req.body;
  try {
    const conn: any = await getConnection();
    const [result, fields] = await conn.execute(
      "UPDATE product SET name = ?, description = ?, quantity = ?, category = ?, purchase_date = ?, expiry_date = ?, supplier_id = ?, user_id = ?, price = ? WHERE id = ?",
      [
        name,
        description,
        quantity,
        category,
        purchase_date,
        expiry_date,
        supplier_id,
        user_id,
        price,
        req.params.id,
      ]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a product
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const [result, fields] = await conn.execute(
      "DELETE FROM product WHERE id = ?",
      [req.params.id]
    );
    if ((result as OkPacket).affectedRows === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
