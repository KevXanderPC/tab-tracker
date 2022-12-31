<template>
    <panel title="Songs" >
        <v-btn slot="action" :to="{
            name: 'songs-create'
        }" class="cyan accent-2" light medium absolute right middle fab>
            <v-icon>add</v-icon>
        </v-btn>
        <div v-for="song in songs" class="song" :key="song.id">
            <v-layout>
                <v-flex xs6>
                    <div class="song-title">
                        {{ song.title }}
                    </div>
                    <div class="song-artist">
                        {{ song.artist }}
                    </div>
                    <div class="song-genre">
                        {{ song.genre }}
                    </div>

                    <v-btn dark class="cyan" :to="{
                        name: 'song',
                        params: {
                            songId: song.id
                        }
                    }">
                        View
                    </v-btn>
                </v-flex>

                <v-flex xs6>
                    <img class="album-image" :src="song.albumImageUrl" />
                </v-flex>
            </v-layout>
        </div>
    </panel>
</template>

<script>

import SongService from '@/services/SongService'
export default {
  components:{

  },
    data () {
        return{
        songs: null
        }
    },
    watch:{
        '$route.query.search':{
            inmediate: true,
            async handler (value) {
                this.songs = (await SongService.index(value)).data
            }
        }
    },
    async mounted () {
        //do a request to backend for all the songs
        this.songs = (await SongService.index()).data
    }
}
</script>

<style scoped>
.ly{
  margin-right: 220px;
} 
</style>