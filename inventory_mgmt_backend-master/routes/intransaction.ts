//@ts-nocheck
import express from "express";
import { getConnection, endConnection } from "../config/db";
import auth from "../middleware/auth";
import adminauth from "../middleware/adminauth";

// import intransaction from "../model/intransaction";
// import intransactionitem from "../model/intransactionitem";
// import adminauth from "../middleware/adminauth";
// import superauth from "../middleware/superauth";

const router = express.Router();

// Create intransaction
router.post("/", async (req, res) => {
  try {
    const conn: any = await getConnection();
    const intransaction = req.body;
    const addTransaction = await conn.query(
      "INSERT INTO intransaction (user_id, supplier_id, expiry_date , date, remark, product_id , quantity, unit_price ,total_price) VALUES (?, ?, ?, ?,?,?,?,?,?)",
      [
        intransaction.user_id,
        intransaction.supplier_id,
        intransaction.expiry_date,
        intransaction.date,
        intransaction.remark,
        intransaction.product_id,
        intransaction.quantity,
        intransaction.unit_price,
        intransaction.total_price,
      ]
    );
    res.status(200).json({ message: "intransaction created", addTransaction });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create intransaction-item
router.post("/item", auth, async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const intransactionitem: intransactionitem = req.body;
    const addTransactionItem = await conn.query(
      "INSERT INTO intransactionitem (intransaction_id, product_id, quantity, unit, unit_price, total_price, remark) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        intransactionitem.intransaction_id,
        intransactionitem.product_id,
        intransactionitem.quantity,
        intransactionitem.unit,
        intransactionitem.unit_price,
        intransactionitem.total_price,
        intransactionitem.remark,
      ]
    );
    res
      .status(200)
      .json({ message: "intransaction item created", addTransactionItem });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all intransaction
router.get("/", async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const intransactions = await conn.query("SELECT * FROM intransaction");
    res.status(200).json({ message: "All intransaction", intransactions });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get intransaction by id
router.get("/:id", auth, async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const intransaction = await conn.query(
      "SELECT * FROM intransaction WHERE id = ?",
      [req.params.id]
    );
    res.status(200).json({ message: "intransaction", intransaction });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get intransaction containing a specific item
// first get all the intransaction items containing the item
// then get the intransaction using the intransaction id
router.get("/item/:id", auth, async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const intransactionitems = await conn.query(
      "SELECT * FROM intransactionitem WHERE product_id = ?",
      [req.params.id]
    );
    const intransaction = await conn.query(
      "SELECT * FROM intransaction WHERE id = ?",
      [intransactionitems[0].intransaction_id]
    );
    res.status(200).json({ message: "intransaction", intransaction });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get intransaction by user id
router.get("/user/:id", auth, async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const intransaction = await conn.query(
      "SELECT * FROM intransaction WHERE user_id = ?",
      [req.params.id]
    );
    res.status(200).json({ message: "intransaction", intransaction });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get intransaction-item by price range
router.get("/price/:from/:to", auth, async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const intransactionitems = await conn.query(
      "SELECT * FROM intransactionitem WHERE unit_price BETWEEN ? AND ?",
      [req.params.from, req.params.to]
    );
    res.status(200).json({ message: "intransaction", intransactionitems });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get intransaction-item by total price range
router.get(
  "/totalprice/:from/:to",
  auth,
  async (req: Request, res: Response) => {
    try {
      const conn: any = await getConnection();
      const intransactionitems = await conn.query(
        "SELECT * FROM intransactionitem WHERE total_price BETWEEN ? AND ?",
        [req.params.from, req.params.to]
      );
      res.status(200).json({ message: "intransaction", intransactionitems });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Get intransaction by supplier id
router.get("/supplier/:id", auth, async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const intransaction = await conn.query(
      "SELECT * FROM intransaction WHERE supplier_id = ?",
      [req.params.id]
    );
    res.status(200).json({ message: "intransaction", intransaction });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
