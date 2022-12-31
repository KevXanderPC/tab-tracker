<template>
    <v-layout>
      <v-flex xs6 v-if="isUserLoggedIn">
        <songs-bookmark/>
        <recently-viewed-songs class="mt-2"/>

      </v-flex >
        <v-flex v-bind:class="isUserLoggedIn?xs6:xs12"
         class="ml-2">
            <song-search-panel />
            <songs-panel class="mt-2"/>
        </v-flex>
    </v-layout>
</template>

<script>
import SongsPanel from './SongsPanel'
import SongSearchPanel from './SongsSearchPanel'
import RecentlyViewedSongs from './RecentlyViewedSongs'
import SongsBookmark from './SongsBookmarks'
import SongService from '@/services/SongService'
import {mapState} from 'vuex'


export default {
  components:{
    SongsPanel,
    SongSearchPanel,
    SongsBookmark,
    SongService,
    RecentlyViewedSongs,
    
  },
    data () {
    return {
      songs: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted(){
    this.songs = (await SongService.index()).data

  }
}


</script>

<style>
.ly{
  margin-right: 220px;
} 

</style>