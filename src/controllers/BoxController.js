const Box = require('../models/Box')

class BoxController {
  async store (req, res) {
    try {
      const box = await Box.create({ title: req.body.title })
      return res.json(box)
    } catch (err) {
      return res.send(err)
    }
  }

  async showAll (req, res) {
    try {
      const boxes = await Box.find().sort({ createdAt: -1 })
      return res.json(boxes)
    } catch (err) {
      return res.send(err)
    }
  }

  async show (req, res) {
    try {
      const box = await Box.findById(req.params.id).populate({
        path: 'files',
        options: { sort: { createdAt: -1 } }
      })
      return res.json(box)
    } catch (err) {
      return res.send('Erro!')
    }
  }

  async update (req, res) {
    try {
      const newTitle = req.body.title
      const box = await Box.findById(req.params.id)
      if (newTitle) {
        box.title = newTitle
        await box.save()
        return res.json({
          status: 'concluido',
          result: box
        })
      } else {
        return res.json({
          status: 'falha',
          message: 'não encontramos a propriedade title no corpo da requisição'
        })
      }
    } catch (err) {
      return res.json({
        status: 'erro',
        ...err
      })
    }
  }

  async drop (req, res) {
    try {
      const boxId = req.params.id
      const boxDeleted = await Box.findByIdAndDelete(boxId)
      return res.json(boxDeleted)
    } catch (err) {
      return res.json({
        status: 'erro',
        ...err
      })
    }
  }
}

module.exports = new BoxController()
