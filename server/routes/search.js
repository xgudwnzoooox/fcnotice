var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var sanitizeHtml = require("sanitize-html");
var db = require("../lib/db");
//private

router.get("/", function (request, response, next) {
  const keyword = request.query.keyword || "";
  db.query("SELECT * FROM mongTable", function (err, topic, fields) {
    if (err) throw err;
    db.query(
      `SELECT mongTable.id, title, description, created, updatedDate, name FROM mongTable LEFT JOIN author ON mongTable.author_id = author.id
      WHERE title LIKE '%${keyword}%' OR description LIKE '%${keyword}%' OR name LIKE '%${keyword}%'`,
      function (err2, topic, fields) {
        if (err2) throw err2;
        response.json(topic);
      }
    );
  });
});

// router.get("/:keyword", function (request, response, next) {
//   let keyword = request.params.keyword;
//   db.query("SELECT * FROM mongTable", function (err, topic, fields) {
//     if (err) throw err;
//     db.query(
//       `SELECT mongTable.id, title, description, created, updatedDate, name FROM mongTable LEFT JOIN author ON mongTable.author_id = author.id
//       WHERE title LIKE '%${keyword}%' OR description LIKE '%${keyword}%' OR name LIKE '%${keyword}%'`,
//       function (err2, topic, fields) {
//         if (err2) throw err2;
//         response.json(topic);
//       }
//     );
//   });
// });

module.exports = router;
