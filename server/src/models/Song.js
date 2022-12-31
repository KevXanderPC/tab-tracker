module.exports = (sequelize, Datatypes) => {
    const Song= sequelize.define('Song',{
        title: {
            type: Datatypes.STRING,
        },
        artist: Datatypes.STRING,
        genre: Datatypes.STRING,
        album: Datatypes.STRING,
        albumImageUrl: Datatypes.STRING,
        youtubeId: Datatypes.STRING,
        lirycs: Datatypes.TEXT,
        tab: Datatypes.TEXT,
    }) 
    return Song
}
