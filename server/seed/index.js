const {
    sequelize,
    Song,
    User,
    Bookmark
} = require ('../src/models')

const Promise = require('bluebird')
const songs = require ('./song.json')
const users = require ('./user.json')
const bookmarks = require ('./bookmark.json')


sequelize.sync({force: true })
.then(async function() {
    await Promise.all(
        users.map(user =>{
            User.create(user)
        })
    )

    await Promise.all(
        songs.map(user =>{
            Song.create(user)
        })
    )

    await Promise.all(
        bookmarks.map(bookmark =>{
            Bookmark.create(bookmark)
        })
    )
})