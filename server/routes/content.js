var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var fs = require("fs");
var sanitizeHtml = require("sanitize-html");
var db = require("../lib/db");
const multer = require("multer");
//private

const upload = multer({ dest: "./uploads" });
// 아래 코드는 main.js 에 위치해야한다.
// app.use("/image", express.static("./uploads"));

// create
router.post(
  "/create_content_process",
  //사용자가 전송한 데이터에서 파일이 포함되어있다면, 그 파일을 가공해서 request 객체의 file이라는 프로퍼티를 암시적으로 추가
  // single의 인자값은 image input의 name 값
  upload.single("image"),
  function (request, response) {
    const post = request.body;
    const title = post.title;
    const image = request.file ? "/image/" + request.file.filename : null;
    const description = post.description;
    const author_id = post.author_id;
    db.query(
      `INSERT INTO mongTable (title, image, description, created, author_id, deleted) VALUES(?,?,?,NOW(),?,0)`,
      [title, image, description, author_id],
      function (err, topic, fields) {
        if (err) throw err;
        // response.redirect(`http://localhost:3000/content/${topic.insertId}}`);
        response.json(topic.insertId);
      }
    );
    // return response.send("suc/cess");
  }
);

// update
// 질문2
router.post(
  "/update_content_process",
  upload.single("image"),
  function (request, response) {
    let post = request.body;
    let updated_id = post.id;
    let title = post.title;
    const image = request.file ? "/image/" + request.file.filename : null;
    let description = post.description;

    db.query(
      `UPDATE mongTable SET title = COALESCE(?, title), image = COALESCE(?, image), description = COALESCE(?, description),  updatedDate = NOW(), views_Num = views_Num+1  WHERE id = ?;`,
      [title, image, description, updated_id],
      function (err, topic, fields) {
        if (err) throw err;
        // response.redirect(`http://localhost:3000/content/${updated_id}}`);
        response.json(updated_id);
      }
    );
  }
);

// delete
router.post("/delete_content_process", function (request, response) {
  var post = request.body;
  var id = post.id;

  db.query(
    // DB에서는 삭제하지 않고 deleted 여부만 입력
    `UPDATE mongTable SET deleted = 1, deletedDate = NOW() WHERE id = ?`,
    // DB에서도 삭제
    // `DELETE FROM mongTable WHERE id = ?`,
    [id],
    function (err, topic, fields) {
      if (err) throw err;
      response.json(id);
      // 질문 3
      // response.redirect(`http://localhost:3000/user`);
    }
  );
});

// show previous contentList
router.get("/prev/:pageId", function (request, response, next) {
  let id = request.params.pageId;
  db.query("SELECT * FROM mongTable", function (err, topic, fields) {
    if (err) throw err;
    db.query(
      `SELECT mongTable.id,title,image, description, created, updatedDate, name FROM mongTable LEFT JOIN author ON mongTable.author_id = author.id WHERE mongTable.id < ? AND deleted = 0 ORDER BY mongTable.id DESC LIMIT 1`,
      [id],
      function (err2, topic, fields) {
        if (err2) throw err2;
        response.json(topic);
      }
    );
  });
});

// show next contentList
router.get("/next/:pageId", function (request, response, next) {
  let id = request.params.pageId;
  db.query("SELECT * FROM mongTable", function (err, topic, fields) {
    if (err) throw err;
    db.query(
      `SELECT mongTable.id,title,image, description, created, updatedDate, name FROM mongTable LEFT JOIN author ON mongTable.author_id = author.id WHERE mongTable.id > ? AND deleted = 0 ORDER BY mongTable.id ASC LIMIT 1`,
      [id],
      function (err2, topic, fields) {
        if (err2) throw err2;
        response.json(topic);
      }
    );
  });
});

// show content detail
// 질문 4
router.get("/:pageId", function (request, response, next) {
  let id = request.params.pageId;
  db.query("SELECT * FROM mongTable", function (err, topic, fields) {
    if (err) throw err;
    db.query(
      `SELECT mongTable.id,title,image, description, created, updatedDate, views_Num, name FROM mongTable LEFT JOIN author ON mongTable.author_id = author.id WHERE mongTable.id = ?`,
      [id],
      function (err2, topic, fields) {
        if (err2) throw err2;
        response.json(topic);
      }
    );
  });
});

module.exports = router;
