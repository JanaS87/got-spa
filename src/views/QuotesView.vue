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
    await this.fetchRandomQuotes();
  },
  methods: {
    async fetchRandomQuotes() {
    try {
      const response = await axios.get<Quote[]>('https://api.gameofthronesquotes.xyz/v1/random/5');
      console.log("data: ", response.data);
      this.quotes = response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
};
</script>

<template>
    <div class="quotes">
      <ul>
        <li class="quote" v-for="(quote, index) in quotes" :key="index">
          <blockquote>
            {{ quote.sentence }}
          </blockquote>
            <footer> -
              {{ quote.character.name }}  
            </footer>
          
          
        </li>
      </ul>
      <button @click="fetchRandomQuotes">Random Quotes</button>
    </div>
</template>

<style scoped>
.quotes ul {
  list-style: none;
  padding: 0;
}

.quote blockquote {
  font-style: italic;
  position: relative;
  overflow: hidden;
  padding: 0 0 0 2em;
  quotes: "“" "”" "‘" "’";
}

.quote blockquote:before {
  content: open-quote;
}

.quote blockquote:after {
  content: close-quote;
}

.quote footer {
  text-align: right;
  margin-top: 0.5em;
  font-style: normal;
  font-weight: bold;
  margin-bottom: 5%;
  margin-top: 0;
}
</style>