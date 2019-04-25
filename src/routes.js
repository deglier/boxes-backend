// Config no Express
const express = require('express')
const routes = express.Router()

// Config no multer
const multer = require('multer')
const multerConfig = require('./config/multer')

// Chamada dos controllers
const BoxController = require('./controllers/BoxController')
const FileController = require('./controllers/FileController')

// Cria uma box
routes.post('/box/store', BoxController.store)

// Lista todas as boxes
routes.get('/boxes', BoxController.showAll)

// Seleciona um box pelo id
routes.get('/boxes/:id', BoxController.show)

// Atualiza uma box
routes.put('/boxes/:id', BoxController.update)

// Deleta uma box
routes.delete('/boxes/:id', [FileController.drop, BoxController.drop])

routes.post(
  '/boxes/:id/files',
  multer(multerConfig).single('file'),
  FileController.store
)

routes.get('/teste', (req, res) => {
  return res.send('Hello World!')
})

module.exports = routes
