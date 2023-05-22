const express = require("express");
const router = express.Router();
const db = require("../lib/db");

router.get("/", (req, res, next) => {
  try {
    const keyword = req.query.keyword || "";
    const query = `SELECT mongTable.id, title, description, created, updatedDate, name FROM mongTable LEFT JOIN author ON mongTable.author_id = author.id
      WHERE title LIKE '%${keyword}%' OR description LIKE '%${keyword}%' OR name LIKE '%${keyword}%'`;

    db.query(query, (err, topic, fields) => {
      if (err) throw err;
      res.json(topic);
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
