const express = require("express");
const router = express.Router();
const db = require("../lib/db");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // 쿼리 파라미터로 보여줄 개수 받기
    const orderBy = req.query.orderBy || "ASC"; // 쿼리 파라미터로 정렬 순서 받기
    const orderField = req.query.orderField || "created"; // 쿼리 파라미터로 정렬할 필드 받기
    const page = parseInt(req.query.page) || 1; // 쿼리 파라미터로 페이지 번호 받기
    const keyword = req.query.keyword || "";
    const deleted = req.query.deleted || 0;
    // console.log(deleted);

    const token = req.cookies.accessToken;
    let data = "";
    let token_name = "";
    if (token) {
      data = jwt.verify(token, process.env.ACCESS_SECRET);
      token_name = data.name;
    }

    let totalQuery = `SELECT COUNT(*) AS total FROM mongTable LEFT JOIN author ON mongTable.author_id = author.id WHERE deleted = 0`;

    if (token_name) {
      // name 값이 있는 경우 해당 name으로 필터링
      totalQuery += ` AND name ='${token_name}'`;
    }

    db.query(totalQuery, (err, result) => {
      const total = result[0].total;

      const totalPages = Math.ceil(total / limit);
      const offset = (page - 1) * limit;

      let query = `SELECT mongTable.id, title, name, created, updatedDate, views_Num
        FROM mongTable
        LEFT JOIN author ON mongTable.author_id = author.id
        WHERE deleted = ${deleted}`;

      if (token_name) {
        // name 값이 있는 경우 해당 name으로 필터링
        query += ` AND name ='${token_name}'`;
      }

      if (keyword) {
        // keyword 값이 있는 경우 title, description, name에서 검색
        query += ` AND (title LIKE '%${keyword}%' OR description LIKE '%${keyword}%' OR name LIKE '%${keyword}%')`;
      }

      query += ` ORDER BY ${orderField} ${orderBy}
        LIMIT ${limit}
        OFFSET ${offset}`;

      db.query(query, (err2, results) => {
        res.json({ content: results, totalPages }); // JSON으로 content와 totalPages 반환
      });
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
