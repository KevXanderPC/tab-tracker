<template>
  <panel title="Youtube Video">
    <!-- <youtube name="youtube"
      :video-id="heroVideoId"
      :player-width="600"
      :player-height="330"
      >
    </youtube> -->
    <!-- <LazyYoutube :src= "heroVideoId" /> -->
  </panel>
</template>

<script>

export default {
  data () {
    return {
      
    } 
  },
  props: [
    'youtubeId'
  ],
  components:{
    
  },
  computed:{
    heroVideoId () {
      var youtubeid =""
      if (this.youtubeId) 
      youtubeid = (this.youtubeId).toString()
      console.log(youtubeid)
      return youtubeid
    }
  }
}
</script>

<style>

</style>