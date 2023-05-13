var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var sanitizeHtml = require("sanitize-html");
var db = require("../lib/db");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// 로그인 및 access, refresh 토근 생성
router.post("/", function (request, response, next) {
  const post = request.body;
  const email = post.email;
  const password = post.password;
  db.query(
    `SELECT id, name, email FROM author WHERE email = ? AND password = ?`,
    [email, password],
    function (err2, topic, fields) {
      if (err2) throw err2;
      if (!topic) {
        response.status(403).json("Not Authorized");
      } else {
        // access Token 발급
        const accessToken = jwt.sign(
          {
            id: topic[0].id,
            name: topic[0].name,
            email: topic[0].email,
          },
          process.env.ACCESS_SECRET,
          {
            expiresIn: "60m", //개발용
            issuer: "mong",
          }
        );

        // refresh Token 발급
        const refreshToken = jwt.sign(
          {
            id: topic[0].id,
            name: topic[0].name,
            email: topic[0].email,
          },
          process.env.REFRECH_SECRET,
          {
            expiresIn: "24h",
            issuer: "mong",
          }
        );

        // token 전송
        response.cookie("accessToken", accessToken, {
          secure: false,
          httpOnly: true,
        });

        response.cookie("refreshToken", refreshToken, {
          secure: false,
          httpOnly: true,
        });

        response.json(topic);
        // try {
        // } catch (error) {
        //   response.status(500).json(error);
        // }
      }
    }
  );
});

// 로그인 후, 클라이언트 토큰 비교해서 맞을 경우 사용자 정보 가져오기
router.get("/success", function (request, response, next) {
  const token = request.cookies.accessToken;

  // 로그아웃시 jwt empty 에러 해결을 위해 if문 추가
  if (token) {
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const token_name = data.name;
    db.query(
      `SELECT name FROM author WHERE name = ?`,
      [token_name],
      function (err2, topic, fields) {
        if (err2) throw err2;
        response.json(topic);
      }
    );
  } else {
    response.json("logout");
  }
});

// 로그아웃하여 access 토큰 초기화
router.post("/logout", function (request, response, next) {
  response.cookie("accessToken", "");
  response.json("Logout Success");
});

module.exports = router;
