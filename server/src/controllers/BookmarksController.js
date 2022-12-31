const {Bookmark,Song} = require ('../models')
//const { Op } = require('sequelize')
const _ = require('lodash')
module.exports = {
    async  index (req, res) {
        try {
    
            const userId = req.user.id
            const {songId} = req.query
            const where = {
                UserId: userId
              }
            if (songId) {
                where.SongId = songId
                // const bookmark = await Bookmark.findOne({
                //     where: where,
                // })
                //.map(bookmark => bookmark.toJSON())
                // .map(bookmark =>_.extend({
                //    bookmarkId: bookmark.id
                //  }, bookmark.Song))
                //res.send(bookmark)
            } 
            // else{
            const bookmarks = await Bookmark.findAll({
                where: where,
                include: {
                    model: Song,
                }
                })
                
                const newbookmarks= Array.from(bookmarks)
                .map(bookmark => bookmark.toJSON())
                .map(bookmark =>_.extend({
                   bookmarkId: bookmark.id
                 }, bookmark.Song))
                 res.send(newbookmarks)
            
        }   catch (error) {
            console.log(error)
            res.status(500).send({
                error: "An error has occurred trying to fetch the bookmark"
            })
        }
    },
    async  post (req, res) {
        try {
            const userId = req.user.id
            const {songId} = req.body.params
            
            const bookmark = await Bookmark.findOne({
                where: {
                    songId : songId,
                    userId : userId
                }
            })
            
            if(bookmark){
                return res.status(400).send({
                    error: 'You already have set this as a bookmark'
                })
            }
            const newBookmark = await Bookmark.create({
                    SongId: songId,
                    UserId: userId
            })
            res.send(newBookmark)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: "An error has occurred trying to create the bookmark"
            })
        }
    },
    async  delete (req, res) {
        try {
            const userId = req.user.id
            const {bookmarkId} = req.params
            const bookmark = await Bookmark.findOne({
                where:{
                    id: bookmarkId,
                    UserId: userId
                }
            })
            if (!bookmark) {
                return res.status(403).send({
                  error: 'you do not have access to this bookmark'
                })  
              }
            
            await bookmark.destroy()
            res.send(bookmark)
            console.log(bookmark)
            console.log(bookmark)
            console.log(bookmark)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: "An error has occurred trying to delete the bookmark"
                
            })
        }
    }
       
}