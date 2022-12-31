<template>
  <panel title="Recently Viewed Songs">
    <v-data-table
    :headers="headers"
    :options.sync="options"
    :items="histories">
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
import SongHistoryService from '@/services/SongHistoryServices'
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
        histories: [  ]
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
        this.histories = (await SongHistoryService.index({
            userId: this.user.id
        })).data
    }
}
}
</script>

<style>

</style>