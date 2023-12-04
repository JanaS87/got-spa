<script lang="ts">
import axios from 'axios';

interface Person {
  slug: string;
  name: string;
  house: House;
  quotes: string[];
}

interface House {
  slug: string;
  name: string;
}


export default {
    name: 'PersonDetailsView',
    data() {
      return {
        person: null as Person | null,
        quotes: [] as string[],
      };
    },
    async created() {
      const personId = this.$route.params.personId;
      try {
        const response = await axios.get(`https://api.gameofthronesquotes.xyz/v1/character/${personId}`);
        const characterData = response.data[0];
        console.log("data: ", response.data);
        this.person = characterData;

       this.quotes = this.shuffleQuotes(characterData.quotes).slice(0, 5); 

      } catch (error) {
        console.error('Error fetching person details:', error);
      }
    },
    methods: {
      // chatgpt
      shuffleQuotes(quotesArray: string[]) {
  if (!quotesArray) return [];

  for (let i = quotesArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quotesArray[i], quotesArray[j]] = [quotesArray[j], quotesArray[i]];
  }
  return quotesArray;
},
      async fetchRandomQuotes() {
        if(this.person && this.person.quotes) {
          try {
            const response = await axios.get(`https://api.gameofthronesquotes.xyz/v1/random/${this.person.slug}`);
            console.log("data: ", response.data);
            this.quotes = this.shuffleQuotes([...this.person.quotes]).slice(0, 5);
              } catch (error) {
            console.error('Error fetching random quotes:', error);
        }  
      }
    }, 
  }
}
</script>

<template>
    <div class="person-details" v-if="person && person.house">
        <div v-if="person">
            <h1>{{ person.name }}</h1>
            <div class="infos">
              <div class="house">
            <h2>House</h2>
            <p>{{ person.house.name }}</p>
          </div>
          <div class="quotes">
            <h2>Quotes</h2>
            <ul>
                <li class="quote" v-for="(quote, index) in quotes" :key="index">
                  <blockquote>
                    {{ quote }}
                  </blockquote>
                </li>
            </ul>
            <button type="button" class="btn loading" id="crown" @click="fetchRandomQuotes" >Load Random Quotes</button>
          </div>
          </div>
        </div>
        <div v-else>
            <p>Person not found</p>
        </div>  
    </div>
    <button type="button" class="btn" id="crown" @click="$router.go(-1)">Back</button>
</template>

<style scoped>
.person-details {
    text-align: center;
}

.person-details h1 {
  text-align: center;
}

.infos {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 3rem;
}

.house {
  width: 30%;
}

.house h2 {
  font-size: 2rem;
  text-decoration: underline;
}

.house p {
  font-size: 1.4rem;
}

.quotes {
  width: 60%;
text-align: right;
}

.quotes h2 {
  text-align: right;
  font-size: 2rem;
  margin-right: 5%;
  text-decoration: underline;
}

.quotes ul {
  list-style: none;
  padding: 0;
}

.quote blockquote {
  font-style: italic;
  position: relative;
  overflow: hidden;
  padding: 0 0 0 2em;
  font-size: 1.4rem;
  quotes: "“" "”" "‘" "’";
}

.quote blockquote:before {
  content: open-quote;
}

.quote blockquote:after {
  content: close-quote;
}

.quotes li { 
  font-size: 1.4rem;
  padding: 0.5em; 
  text-align: right; 
  max-width: 90%; 
  margin-left: auto; 
  margin-right: 3% 
}

.loading {
  margin-top: 2rem;
  margin-right: 5%;
  margin-bottom: 3rem;
}

#crown {
  cursor: url("/krone.png"), pointer;
}
</style>