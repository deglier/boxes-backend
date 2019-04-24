const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const server = require("http").Server(app);
const io = require("socket.io")(server);

const serverUser = process.env.SERVER_USER || require("./config/serverAuth.json").server_user;
const serverPass = process.env.SERVER_PASS || require("./config/serverAuth.json").server_pass;

io.on("connection", socket => {
  socket.on("connectionRoom", box => {
    socket.join(box);
  });
});

mongoose.connect(
  `mongodb+srv://${serverUser}:${serverPass}@notesapi-guncc.mongodb.net/boxes?retryWrites=true`,
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(require("./routes"));

app.listen(process.env.PORT || 4000);
