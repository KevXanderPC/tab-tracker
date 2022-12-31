<template>
    <panel title="Lyrics">
    <textarea
      readonly
      v-model="song.lirycs"
    ></textarea>
  </panel>
</template>

<script>

export default {
  props: [
    'song'
  ],
  components:{
    
  }
}
</script>

<style>
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