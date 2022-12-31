<template>
        <div>
            <v-layout>
                <v-flex xs6>
                    <song-metadata :song="song" />
                </v-flex>
            
                <v-flex xs6 class="ml-2">
                    <youtube :youtubeId="song.youtubeId" />
                </v-flex>
            </v-layout>
                <v-layout class="mt-2">
                    <v-flex xs6>
                        <tab :song="song" />
                    </v-flex>
                
                    <v-flex xs6 class="ml-2">
                        <lyrics :song="song" />
                    </v-flex>
                </v-layout>
        </div>
</template>

<script>
 import SongService from '@/services/SongService'
 import SongMetadata from './SongMetadata'
 import Youtube from './Youtube'
 import Tab from './Tab'
 import Lyrics from './Lyrics'
 import SongHistoryServices from '@/services/SongHistoryServices'

 import {mapState} from 'vuex'

export default {
    components:{
        SongMetadata,
        Youtube  ,
        Lyrics ,
        Tab,
        SongHistoryServices
    },
    data () {
        return {
            song: {}
        }
    },
    computed:{
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
    async mounted () {
        const songId = this.route.params.songId
        this.song = (await SongService.show(songId)).data
        if(this.isUserLoggedIn){
            SongHistoryServices.post({
            songId: songId
        })
        }
        
    }
}
</script>

<style scoped>


</style>