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
          <header>
            <h1> -
              <RouterLink class="member-list" :to="'/persondetails/' + quote.character.slug">
              {{ quote.character.name }} -
              </RouterLink>
            </h1> 
            </header>
          <blockquote>
            {{ quote.sentence }}
          </blockquote>
        </li>
      </ul>
      <div class="btn-container">	
      <button class="btn" id="crown" @click="fetchRandomQuotes">Random Quotes</button>
      </div>  
    </div>
</template>

<style scoped>
.quotes ul {
  list-style: none;
  padding: 0;
  margin-top: 2%
}

.quote h1 {
  font-size: 1.4rem;
  margin-top: 0;
  color: var(--vt-c-text-dark-2);
}

.member-list {
  text-decoration: none;
  color: var(--vt-c-text-dark-2);
}

.member-list:hover {
  color: #952323;
}

.quote blockquote {
  font-style: italic;
  text-align: center;
  overflow: hidden;
  padding: 0 0 0 2em;
  font-size: 1.3rem;
  quotes: "“" "”" "‘" "’";
  margin-bottom: 3%;
}

.quote blockquote:before {
  content: open-quote;
}

.quote blockquote:after {
  content: close-quote;
}

.quote header {
  text-align: center;
  margin-top: 0.5em;
  font-style: normal;
  font-weight: bold;
  margin-top: 0;
}

.btn-container {
  display: flex;
  justify-content: flex-end;
}

#crown {
  cursor: url("/krone.png"), pointer;
}
</style>