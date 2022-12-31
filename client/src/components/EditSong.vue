<template>
    <v-layout>
        <v-flex xs4>
            <div>
                <panel title="Song Metadata">
                    <div >
                        <v-text-field label="Title" required :rules="[required]" v-model="song.title"></v-text-field>
                        <v-text-field label="Artist" required :rules="[required]"  v-model="song.artist"></v-text-field>
                        <v-text-field label="Genre" required :rules="[required]"  v-model="song.genre"></v-text-field>
                        <v-text-field label="Album" required :rules="[required]" v-model="song.album"></v-text-field>
                        <v-text-field label="Album Image Url" required :rules="[required]" v-model="song.albumImageUrl"></v-text-field>
                        <v-text-field label="Youtube ID" required :rules="[required]" v-model="song.youtubeId"></v-text-field>
                    </div>
                </panel>
            </div>
        </v-flex>
        <v-flex xs8>
            <panel title="Song Structure" class="ml-2">
                <div >
                    <textarea label="Lyrics" required :rules="[required]"  v-model="song.lirycs"></textarea>
                    <textarea label="Tab" required :rules="[required]"  v-model="song.tab"></textarea>
                </div>
            </panel>
            <div class="danger-alert" v-if="error">
        {{error}}
      </div>
            <v-btn dark class="cyan" @click="save">
                Save Song
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>

import SongsService from "@/services/SongService"
export default {
    components:{
        
    },
    data (){
      return { 
        song:{
          title: null,
          artist: null,
          genre: null,
          album: null,
          albumImageUrl: null,
          youtubeId: null,
          lirycs: null,
          tab: null
        },
        error: null, 
        required: (value) => !!value || 'Required.'
      }
    },
    methods:{
        async save() {
            //call Api
            this.error = null
            const areAllFieldsFilledIn = Object
                .keys(this.song)
                .every(key => !!this.song[key])
            if (!areAllFieldsFilledIn) {
                this.error = 'Please fill in all the required fields.'
                return
            }      
            
            const songId = this.$store.state.route.params.songId

            try {
                await SongsService.put(this.song)  
                this.$router.push({
                    name:'song',
                    params:{
                        songId: songId
                    }
                })
            } catch (error) {
                error = 'An error occurred trying to update the song'
            } 
              
        }
    },
    async mounted() {
        try {
              const songId = this.$store.state.route.params.songId
              this.song = (await SongsService.show(songId)).data     
            } catch (error) {
                console.log(error)
            }
    }
}
</script>

<style scoped>
textarea{
    width: 100%;
    font-family: monospace;
    border: none;
    height: 1000px;
    border-style: none;
    border-color: transparent;
    overflow: auto;
    padding: 40px;

}
</style>