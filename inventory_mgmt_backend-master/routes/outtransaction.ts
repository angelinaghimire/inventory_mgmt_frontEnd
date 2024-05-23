import express, { Request, Response } from "express";
import { getConnection } from "../config/db";
import outtransaction from "../model/outtransaction";
import outtransactionitem from "../model/outtransactionitem";
import auth from "../middleware/auth";

const router = express.Router();

// Create outtransaction
router.post("/", async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const outtransaction = req.body;
    const addTransaction = await conn.query(
      "INSERT INTO outtransaction (user_id, receiver_id, date, remark, product_id , quantity) VALUES (?, ?, ?, ?, ?, ?)",
      [
        outtransaction.user_id,
        outtransaction.receiver_id,
        outtransaction.date,
        outtransaction.remark,
        outtransaction.product_id,
        outtransaction.quantity,
      ]
    );
    res.status(200).json({ message: "outtransaction created", addTransaction });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create outtransaction-item
router.post("/item", auth, async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const outtransactionitem: outtransactionitem = req.body;
    const addTransactionItem = await conn.query(
      "INSERT INTO outtransactionitem (outtransaction_id, product_id, quantity, unit, unit_price, total_price, remark) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        outtransactionitem.outtransaction_id,
        outtransactionitem.product_id,
        outtransactionitem.quantity,
        outtransactionitem.unit,
        outtransactionitem.unit_price,
        outtransactionitem.total_price,
        outtransactionitem.remark,
      ]
    );
    res
      .status(200)
      .json({ message: "outtransaction item created", addTransactionItem });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all outtransaction
router.get("/", async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const outtransactions = await conn.query("SELECT * FROM outtransaction");
    res.status(200).json({ message: "All outtransaction", outtransactions });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all outtransaction by date range
router.get("/date/:from/:to", auth, async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const outtransactions = await conn.query(
      "SELECT * FROM outtransaction WHERE date BETWEEN ? AND ?",
      [req.params.from, req.params.to]
    );
    res.status(200).json({ message: "All outtransaction", outtransactions });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get outtransaction by id
router.get("/:id", auth, async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const outtransaction = await conn.query(
      "SELECT * FROM outtransaction WHERE id = ?",
      [req.params.id]
    );
    res.status(200).json({ message: "outtransaction", outtransaction });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get outtransaction containing a specific item
// first get all the outtransaction items containing the item
// then get the outtransaction using the outtransaction id
router.get("/item/:id", auth, async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const outtransactionitems = await conn.query(
      "SELECT * FROM outtransactionitem WHERE product_id = ?",
      [req.params.id]
    );
    const outtransaction = await conn.query(
      "SELECT * FROM outtransaction WHERE id = ?",
      [outtransactionitems[0].outtransaction_id]
    );
    res.status(200).json({ message: "outtransaction", outtransaction });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get intransaction by user id
router.get("/user/:id", auth, async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const outtransaction = await conn.query(
      "SELECT * FROM outtransaction WHERE user_id = ?",
      [req.params.id]
    );
    res.status(200).json({ message: "outtransaction", outtransaction });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get intransaction-item by price range
router.get("/price/:from/:to", auth, async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const outtransactionitems = await conn.query(
      "SELECT * FROM outtransactionitem WHERE total_price BETWEEN ? AND ?",
      [req.params.from, req.params.to]
    );
    res
      .status(200)
      .json({ message: "outtransaction items", outtransactionitems });
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
      const outtransactionitems = await conn.query(
        "SELECT * FROM outtransactionitem WHERE total_price BETWEEN ? AND ?",
        [req.params.from, req.params.to]
      );
      res
        .status(200)
        .json({ message: "outtransaction items", outtransactionitems });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Get intransaction by receiver id
router.get("/receiver/:id", auth, async (req: Request, res: Response) => {
  try {
    const conn: any = await getConnection();
    const outtransaction = await conn.query(
      "SELECT * FROM outtransaction WHERE receiver_id = ?",
      [req.params.id]
    );
    res.status(200).json({ message: "outtransaction", outtransaction });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
