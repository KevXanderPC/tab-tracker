<template>
   <panel title="Song Metadata">
    <v-layout>
      <v-flex xs6>
        <div class="song-title">
          {{song.title}}
        </div>
        <div class="song-artist">
          {{song.artist}}
        </div>
        <div class="song-genre">
          {{song.genre}}
        </div>

        <v-btn
          dark
          class="cyan"
          :to="{
            name: 'song-edit', 
            params () {
              return {
                songId: song.id
              }
            }
          }">
          Edit
        </v-btn>

         <v-btn
         v-if="isUserLoggedIn && !bookmark"
          dark
          class="cyan"
          @click="setAsBookmark">
          Set As Bookmark
        </v-btn> 

        <v-btn
        v-if="isUserLoggedIn && bookmark "
          dark
          class="cyan"
          @click="unsetAsBookmark">
          Unset As Bookmark
        </v-btn> 
      </v-flex>

      <v-flex xs6>
        <img class="album-image" :src="song.albumImageUrl" />
        <br>
        {{song.album}}
      </v-flex>
    </v-layout>
</panel>
</template>

<script>
// import {mapState} from 'vuex'
 import BookmarksService from '@/services/BookmarkService'
import {mapState} from 'vuex'

export default {

  props: [
    'song'
  ],
  data () {
    return {
      bookmark: null
    }
  },
  watch: {
  async song () {
    if (!this.isUserLoggedIn) {
        return
      }
    try {
      const bookmarks = (await BookmarksService.index({
      songId: this.song.id
    })).data
    if (bookmarks.length) {
          this.bookmark = bookmarks[0]
        } 
        // else {
        //   this.bookmark = bookmarks
        // }
        
       
    } catch (error) {
      console.log(error)
    }
    

  }
},
  computed:{
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  methods:{
    async setAsBookmark () {
    try{
      this.bookmark = (await BookmarksService.post({
      songId: this.song.id 
    })).data
    
    } catch (err) {
      console.log(err)
    }

    },
    async unsetAsBookmark(){
      try{
        const bookId = 0
       if(this.bookmark.bookmarkId)
       await BookmarksService.delete(this.bookmark.bookmarkId)
       else 
       await BookmarksService.delete(this.bookmark.id)
      this.bookmark = null
    
    } catch (err) {
      console.log(err)
    }
    }
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size: 30px;
}
.song-artist {
  font-size: 24px;
}
.song-genre {
  font-size: 18px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
