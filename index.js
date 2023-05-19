const express = require("express");
const app = express();
const basicAuth = require("express-basic-auth");
const cors = require("cors");

const userCarts = {
  "user@example.com": [
    {
      id: 1,
      name: "똥 춘식이",
      price: 10000,
      imageUrl: "https://item.kakaocdn.net/do/91481c46c6ee38c33e20deba29e1f73f82f3bd8c9735553d03f6f982e10ebe70",
    },
    {
      id: 2,
      price: 10000,
      name: "힝 춘식이",
      imageUrl: "https://item.kakaocdn.net/do/91481c46c6ee38c33e20deba29e1f73f15b3f4e3c2033bfd702a321ec6eda72c",
    },
    {
      id: 3,
      price: 10000,
      name: "생일 춘식이",
      imageUrl: "https://item.kakaocdn.net/do/91481c46c6ee38c33e20deba29e1f73f9f17e489affba0627eb1eb39695f93dd",
    },
  ],
};

app.use(cors());
app.use(
  basicAuth({
    users: { "user@example.com": "password1234" }, // 아이디와 비밀번호를 이곳에 설정합니다.
    unauthorizedResponse: "401 Unauthorized",
  })
);

app.get("/", (req, res) => {
  res.send("You are authenticated!");
});

app.get("/cart-items", (req, res) => {
  const user = req.auth.user;
  const cart = userCarts[user];

  if (!cart) {
    res.status(404).send("Not found");
    return;
  }
  res.send(cart);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server running at port " + port);
});
