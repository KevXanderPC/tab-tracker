<template>
  <panel title="Bookmarks">
    <v-data-table
    :headers="headers"
    :options.sync="options"
    :items="bookmarks">
    <template slot="items" scope="props">
        <td class = "text-xs-right">
            {{ props.item.title }}
        </td>
        <td class = "text-xs-right">
            {{ props.item.artist }}
        </td>
    </template>
    </v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarkService'
export default {
  components: { },
  data () {
    return {
        headers:[
            {
                text:'Title',
                value: 'title'
            },
            {
                text: 'Artist',
                value: 'artist'
            }
        ],
        options: {
            
            sortDesc: true
        },
        bookmarks: [
        
        ]
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if(this.isUserLoggedIn) {
        this.bookmarks = (await BookmarksService.index({
        })).data
    }
  }

}
</script>

<style>

</style>