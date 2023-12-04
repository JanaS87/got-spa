<script lang="ts">
import axios from 'axios';

interface Person {
  slug: string;
  name: string;  
}

interface Quote {
  index: string;
  sentence: string;
  character: Person;
}

export default {
  name: 'QuotesView',
  data() {
    return {
      quotes: [] as Quote[],
    };
  },
  async created() {
    try {
      const response = await axios.get<Quote[]>('https://api.gameofthronesquotes.xyz/v1/random/5');
      console.log("data: ", response.data);
    this.quotes = response.data;
      
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<template>
    <div class="quotes">
      <ul>
        <li v-for="(quote, index) in quotes" :key="index">
            {{ quote.sentence }} - {{ quote.character.name }}  
        </li>
      </ul>
    </div>
</template>