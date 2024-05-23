import express from "express";
const router = express.Router();
import auth from "../middleware/auth";
import adminauth from "../middleware/adminauth";
import superauth from "../middleware/superauth";
import { getConnection } from "../config/db";

// this route is to handle search requests

//lets handle the seach rquest for intransactions.

router.get(
  "/transaction/date/:from/:to",
  auth,
  async (req, res): Promise<void> => {
    try {
      const conn: any = await getConnection();
      let message = "";
      const intransactions = await conn.query(
        "SELECT * FROM intransaction WHERE date BETWEEN ? AND ?",
        [req.params.from, req.params.to]
      );
      if (intransactions.length === 0) {
        message = message.concat("No intransaction found,");
      }
      const outtransactions = await conn.query(
        "SELECT * FROM outtransaction WHERE date BETWEEN ? AND ?",
        [req.params.from, req.params.to]
      );
      if (outtransactions.length === 0) {
        message = message.concat("No outtransaction found");
      }
      res.status(200).json({ message, intransactions, outtransactions });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Get intransaction by user name
router.get("intransaction/user/:username", auth, async (req, res) => {
  try {
    const conn: any = await getConnection();
    const intransactions = await conn.query(
      "SELECT * FROM intransaction WHERE user_id = (SELECT id FROM users WHERE name = ? )",
      [req.params.username]
    );
    if (intransactions.length === 0) {
      res.status(404).json({ message: "No intransaction found" });
    }
    res.status(200).json({ message: "All intransaction", intransactions });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get outtransaction by user name
router.get("outtransaction/user/:username", auth, async (req, res) => {
  try {
    const conn: any = await getConnection();
    const transaction = await conn.query(
      "SELECT * FROM outtransactions WHERE user_id = (SELECT id FROM users WHERE name = ? )",
      [req.params.username]
    );
    if (transaction.length === 0) {
      res.status(404).json({ message: "No outtransaction found" });
    }
    res.status(200).json({ message: "All outtransaction", transaction });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get intransaction by product name
// first get all the intransaction items containing the item
// then get the intransaction using the intransaction id

router.get("intransaction/product/:productname", auth, async (req, res) => {
  try {
    const conn: any = await getConnection();
    const intransactions = await conn.query(
      "SELECT * FROM intransaction WHERE id = (SELECT intransaction_id FROM intransactionitem WHERE product_id = (SELECT id FROM products WHERE name = ? ))",
      [req.params.productname]
    );
    if (intransactions.length === 0) {
      res.status(404).json({ message: "No intransaction found" });
    }
    res.status(200).json({ message: "All intransaction", intransactions });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get outtransaction by product name
// first get all the outtransaction items containing the item
// then get the outtransaction using the outtransaction id

router.get("outtransaction/product/:productname", auth, async (req, res) => {
  try {
    const conn: any = await getConnection();
    const outtransactions = await conn.query(
      "SELECT * FROM outtransaction WHERE id = (SELECT outtransaction_id FROM outtransactionitem WHERE product_id = (SELECT id FROM products WHERE name = ? ))",
      [req.params.productname]
    );
    if (outtransactions.length === 0) {
      res.status(404).json({ message: "No outtransaction found" });
    }
    res.status(200).json({ message: "All outtransaction", outtransactions });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get intransaction by total price range in transaction
// first get total price from intransactionitem table
// then get the intransaction using the intransaction id and adding the total price
// this is to get the total price of the intransaction

router.get("intransaction/totalprice/:from/:to", auth, async (req, res) => {
  try {
    const conn: any = await getConnection();
    const intransactions = await conn.query(
      "SELECT t.* FROM intransaction t WHERE (SELECT SUM(total_price) FROM intransactionitem i WHERE i.intransaction_id = t.id) BETWEEN ? AND ?",
      [req.params.from, req.params.to]
    );
    if (intransactions.length === 0) {
      res.status(404).json({ message: "No intransaction found" });
    }
    res.status(200).json({ message: "All intransaction", intransactions });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get outtransaction by total price range in transaction
// first get total price from outtransactionitem table
// then get the outtransaction using the outtransaction id and adding the total price
// this is to get the total price of the outtransaction

router.get("outtransaction/totalprice/:from/:to", auth, async (req, res) => {
  try {
    const conn: any = await getConnection();
    const outtransactions = await conn.query(
      "SELECT t.* FROM outtransaction t WHERE (SELECT SUM(total_price) FROM outtransactionitem i WHERE i.outtransaction_id = t.id) BETWEEN ? AND ?",
      [req.params.from, req.params.to]
    );
    if (outtransactions.length === 0) {
      res.status(404).json({ message: "No outtransaction found" });
    }
    res.status(200).json({ message: "All outtransaction", outtransactions });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get intransactionitems by price range
router.get("intransactionitem/price/:from/:to", auth, async (req, res) => {
  try {
    const conn: any = await getConnection();
    const intransactionitems = await conn.query(
      "SELECT * FROM intransactionitem WHERE price BETWEEN ? AND ?",
      [req.params.from, req.params.to]
    );
    if (intransactionitems.length === 0) {
      res.status(404).json({ message: "No intransactionitem found" });
    }
    res
      .status(200)
      .json({ message: "All intransactionitem", intransactionitems });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get outtransactionitems by price range
router.get("outtransactionitem/price/:from/:to", auth, async (req, res) => {
  try {
    const conn: any = await getConnection();
    const outtransactionitems = await conn.query(
      "SELECT * FROM outtransactionitem WHERE price BETWEEN ? AND ?",
      [req.params.from, req.params.to]
    );
    if (outtransactionitems.length === 0) {
      res.status(404).json({ message: "No outtransactionitem found" });
    }
    res
      .status(200)
      .json({ message: "All outtransactionitem", outtransactionitems });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
