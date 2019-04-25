const File = require('../models/File')
const Box = require('../models/Box')

class FileController {
  async store (req, res) {
    try {
      const box = await Box.findById(req.params.id)
      const file = await File.create({
        title: req.file.originalname,
        path: req.file.key
      })
      box.files.push(file)

      await box.save()

      req.io.sockets.in(box._id).emit('file', file)
      return res.send(req.file)
    } catch (err) {
      return res.json({
        status: 'erro',
        ...err
      })
    }
  }

  async show (req, res) {
    try {
      const file = await File.findById(req.params.id)

      res.json(file)
    } catch (err) {
      return res.json({
        status: 'erro',
        ...err
      })
    }
  }

  async drop (req, res, next) {
    try {
      const box = await Box.findById(req.params.id)
      const files = box.files
      files.forEach(async fileId => {
        const file = await File.findByIdAndDelete(fileId)
        console.log(file)
      })
      return next()
    } catch (err) {
      return res.json({
        status: 'erro',
        ...err
      })
    }
  }
}

module.exports = new FileController()
