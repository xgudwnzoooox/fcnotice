var express = require("express");
var router = express.Router();
var db = require("../lib/db");

router.get("/", function (request, res, next) {
  const limit = parseInt(request.query.limit) || 10; // 쿼리 파라미터로 보여줄 개수 받기
  const orderBy = request.query.orderBy || "ASC"; // 쿼리 파라미터로 정렬 순서 받기
  const orderField = request.query.orderField || "created"; // 쿼리 파라미터로 정렬할 필드 받기
  const page = parseInt(request.query.page) || 1; // 쿼리 파라미터로 페이지 번호 받기
  const keyword = request.query.keyword || "";

  db.query(
    "SELECT COUNT(*) AS total FROM mongTable WHERE deleted = 0",
    function (err, result) {
      if (err) throw err;
      const total = result[0].total;
      const totalPages = Math.ceil(total / limit);
      const offset = (page - 1) * limit;
      const query = `SELECT mongTable.id, title, name, created, updatedDate, views_Num
      FROM mongTable
      LEFT JOIN author ON mongTable.author_id = author.id
      WHERE deleted = 0 
      AND (title LIKE '%${keyword}%' OR description LIKE '%${keyword}%' OR name LIKE '%${keyword}%')
      ORDER BY ${orderField} ${orderBy}
      LIMIT ${limit}
      OFFSET ${offset}`;

      db.query(query, function (err2, results) {
        if (err2) throw err2;
        res.json({ content: results, totalPages }); // JSON으로 content와 totalPages 반환
      });
    }
  );
});

module.exports = router;
