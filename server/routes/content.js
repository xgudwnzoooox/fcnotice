const express = require("express");
const router = express.Router();
const db = require("../lib/db");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const upload = multer({ dest: "./uploads" });
// 아래 코드는 main.js 에 위치해야한다.
// app.use("/image", express.static("./uploads"));

// create
router.post("/", upload.single("image"), (req, res) => {
  //사용자가 전송한 데이터에서 파일이 포함되어있다면, 그 파일을 가공해서 request 객체의 file이라는 프로퍼티를 암시적으로 추가
  // single의 인자값은 image input의 name 값
  try {
    const token = req.cookies.accessToken;
    const { title, description } = req.body;
    const image = req.file ? "/image/" + req.file.filename : null;

    let data = "";
    let token_name = "";
    let author_id = 0;
    if (token) {
      data = jwt.verify(token, process.env.ACCESS_SECRET);
      author_id = data.id;
    }

    const query = `INSERT INTO mongTable (title, image, description, created, author_id, deleted) VALUES (?, ?, ?, NOW(), ?, 0)`;

    db.query(query, [title, image, description, author_id], (err, result) => {
      res.json(result.insertId);
    });
  } catch (error) {
    next(error);
  }
});

// update
router.put("/", upload.single("image"), (req, res) => {
  try {
    const { id, title, description } = req.body;
    const image = req.file ? "/image/" + req.file.filename : null;
    const query = `UPDATE mongTable SET title = COALESCE(?, title), image = COALESCE(?, image), description = COALESCE(?, description), updatedDate = NOW(), views_Num = views_Num + 1 WHERE id = ?;`;

    db.query(query, [title, image, description, id], (err, result) => {
      res.json(id);
    });
  } catch (error) {
    next(error);
  }
});

// delete
router.delete("/", (req, res) => {
  try {
    const { id } = req.body;
    const query = `UPDATE mongTable SET deleted = 1, deletedDate = NOW() WHERE id = ?`;

    db.query(query, [id], (err, result) => {
      res.json(id);
    });
  } catch (error) {
    next(error);
  }
});

// cancel trash
router.post("/restoration", (req, res) => {
  try {
    const { id } = req.body;
    const query = `UPDATE mongTable SET deleted = 0, deletedDate = NULL WHERE id = ?`;

    db.query(query, [id], (err, result) => {
      res.json(id);
    });
  } catch (error) {
    next(error);
  }
});

// 이전과 다음 게시물
router.get("/prevNextContent/:pageId", (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    const id = req.params.pageId;
    let data = "";
    let token_name = "";
    let author_id = 0;
    if (token) {
      data = jwt.verify(token, process.env.ACCESS_SECRET);
      author_id = data.id;
    }

    const prevQuery = `SELECT mongTable.id, title, image, description, created, updatedDate, name FROM mongTable LEFT JOIN author ON mongTable.author_id = author.id WHERE mongTable.id < ? AND deleted = 0 AND mongTable.author_id = ? ORDER BY mongTable.id DESC LIMIT 1`;
    const nextQuery = `SELECT mongTable.id, title, image, description, created, updatedDate, name FROM mongTable LEFT JOIN author ON mongTable.author_id = author.id WHERE mongTable.id > ? AND deleted = 0 AND mongTable.author_id = ? ORDER BY mongTable.id ASC LIMIT 1`;

    db.query(prevQuery, [id, author_id], (err, prevResult) => {
      if (err) throw err;
      db.query(nextQuery, [id, author_id], (err, nextResult) => {
        if (err) throw err;
        res.json({ prev: prevResult, next: nextResult });
      });
    });
  } catch (error) {
    next(error);
  }
});

// trash contentList
router.get("/TrashContent", (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const orderBy = req.query.orderBy || "ASC";
    const orderField = req.query.orderField || "created";
    const page = parseInt(req.query.page) || 1;

    const token = req.cookies.accessToken;
    let data = "";
    let token_name = "";
    if (token) {
      data = jwt.verify(token, process.env.ACCESS_SECRET);
      token_name = data.name;
    }

    const query = "SELECT COUNT(*) AS total FROM mongTable WHERE deleted = 1";

    db.query(query, (err, result) => {
      const total = result[0].total;
      const totalPages = Math.ceil(total / limit);
      const offset = (page - 1) * limit;

      let query = `SELECT mongTable.id, title, name, created, updatedDate, views_Num, deletedDate
          FROM mongTable
          LEFT JOIN author ON mongTable.author_id = author.id
          WHERE deleted = 1`;

      if (token_name) {
        query += ` AND name ='${token_name}'`;
      }

      query += ` ORDER BY ${orderField} ${orderBy}
          LIMIT ${limit}
          OFFSET ${offset}`;

      db.query(query, (err, results) => {
        res.json({ content: results, totalPages });
      });
    });
  } catch (error) {
    next(error);
  }
});

// show content detail
router.get("/:pageId", (req, res) => {
  try {
    let id = req.params.pageId;
    const query = `SELECT mongTable.id, title, image, description, created, updatedDate, views_Num, name FROM mongTable LEFT JOIN author ON mongTable.author_id = author.id WHERE mongTable.id = ?`;

    db.query(query, [id], (err, result) => {
      res.json(result);
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
