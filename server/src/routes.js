const Auth = require ('./controllers/AuthenticationController')
const SongsController = require ('./controllers/SongsController')
const AuthConPol = require('./policies/AuthenticationControllerPolicy')
const BookmarksController = require('./controllers/BookmarksController')
const HistoriesController = require('./controllers/HistoriesController')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
    app.post('/register',
    AuthConPol.register ,
    Auth.register)

    app.post('/login',
    Auth.login)

    app.get('/songs',
    SongsController.index)

    app.post('/songs',
    SongsController.post)

    app.get('/songs/:songId',
    SongsController.show)
    
    app.put('/songs/:songId',
    SongsController.put)

    app.get('/bookmarks',
    isAuthenticated,
    BookmarksController.index)

    app.post('/bookmarks',
    isAuthenticated,
    BookmarksController.post)

    app.delete('/bookmarks/:bookmarkId',
    isAuthenticated,
    BookmarksController.delete)

    app.get('/histories',
    HistoriesController.index)
  app.post('/histories',
    HistoriesController.post)
}