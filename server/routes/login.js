const express = require("express");
const router = express.Router();
const db = require("../lib/db");
const jwt = require("jsonwebtoken");

const expireTime = "2h";

//restAPI
// 로그인 및 access, refresh 토큰 생성
router.post("/firstAccessToken", (req, res, next) => {
  try {
    const { email, password } = req.body;
    const query = `SELECT id, name, email FROM author WHERE email = ? AND password = ?`;

    db.query(query, [email, password], (err, results) => {
      if (!results || results.length === 0) {
        res.status(403).json("Not Authorized");
      } else {
        const { id, name, email } = results[0];

        // access Token 발급
        const accessToken = jwt.sign(
          {
            id,
            name,
            email,
          },
          process.env.ACCESS_SECRET,
          {
            expiresIn: expireTime,
            issuer: "mong",
          }
        );

        // refresh Token 발급
        const refreshToken = jwt.sign(
          {
            id,
            name,
            email,
          },
          process.env.REFRECH_SECRET,
          {
            expiresIn: "24h",
            issuer: "mong",
          }
        );

        // token 전송
        res.cookie("accessToken", accessToken, {
          secure: false,
          httpOnly: true,
        });

        res.cookie("refreshToken", refreshToken, {
          secure: false,
          httpOnly: true,
        });

        res.json(results);
      }
    });
  } catch (error) {
    next(error);
  }
});

// refresh accessToken using refreshToken
router.post("/refreshedAccessToken", (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      res.json("logout");
      return;
    }

    const data = jwt.verify(token, process.env.REFRECH_SECRET);
    const { name } = data;
    const query = `SELECT name FROM author WHERE name = ?`;

    db.query(query, [name], (err, results) => {
      if (!results || results.length === 0) {
        res.status(403).json("Not Authorized");
      } else {
        // access Token 발급
        const { id, name, email } = results[0];

        const accessToken = jwt.sign(
          {
            id,
            name,
            email,
          },
          process.env.ACCESS_SECRET,
          {
            expiresIn: expireTime,
            issuer: "mong",
          }
        );

        res.cookie("accessToken", accessToken, {
          secure: false,
          httpOnly: true,
        });

        res.status(200).json("Access Token Recreated");
      }
    });
  } catch (error) {
    next(error);
  }
});

// 로그인 후, 클라이언트 토큰 비교해서 맞을 경우 사용자 정보 가져오기
router.get("/userInfo", (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      res.json("noToken");
      return;
    }

    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const { name } = data;
    const query = `SELECT name FROM author WHERE name = ?`;

    db.query(query, [name], (err, results) => {
      res.json(data);
    });
  } catch (error) {
    next(error);
  }
});

// 로그아웃하여 access 토큰 초기화
router.post("/logout", (req, res, next) => {
  try {
    res.cookie("accessToken", "");
    res.json("Logout Success");
  } catch (error) {
    next(error);
  }
});

// myInfo
router.get("/myinfo", (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      res.json("noToken");
      return;
    }

    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
