const {Song} = require ('../models')
const { Op } = require('sequelize')

module.exports = {
    async  index (req, res) {
        try {
            
            let songs = null
            const search = req.query.search
            if (search) {
                songs = await Song.findAll({
                  where: {
                    [Op.or] : [
                      'title', 'artist', 'genre', 'album'
                    ].map(key => ({
                      [key]: {
                        [Op.like]: `%${search}%`
                      }
                    }))
                  }
                })
              }else{
                    songs = await Song.findAll({
                    limit: 10
                })
            }
            res.send(songs)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: "An error has occurred trying to fetch the songs"
            })
        }
    },
    async  show (req, res) {
        try {
            const songId = req.params.songId
            // const song = await Song.findByPk(req.params.songId)
            const song = await Song.findOne({
                where:{
                    id: songId
                }
            })

            res.send(song)
        } catch (error) {
            res.status(500).send({
                error: "An error has occurred trying to fetch the song"
            })
        }
    },
   async  post (req, res) {
        try {
            const song = await Song.create(req.body)
            res.send(song)
        } catch (error) {
            res.status(500).send({
                error: "An error has occurred trying to create the song"
            })
        }
    },
    async  put (req, res) {
        console.log('inside put function')
         try {
             await Song.update(req.body, {
                where: {
                    id: req.params.songId
                }
             })
             res.send(req.body)
         } catch (error) {
             res.status(500).send({
                 error: "An error has occurred trying to update the song"
             })
         }
     }
}