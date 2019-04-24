const Box = require("../models/Box");

class BoxController {
  async store(req, res) {
    try {
      const box = await Box.create({ title: req.body.title });
      return res.json(box);
    } catch (err) {
      return res.send(err);
    }
  }

  async show(req, res) {
    try {
      const box = await Box.findById(req.params.id).populate({
        path: "files",
        options: { sort: { createdAt: -1 } }
      });
      return res.json(box);
    } catch (err) {
      return res.send(err);
    }
  }
}

module.exports = new BoxController();
