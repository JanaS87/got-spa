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
                <li v-for="(quote, index) in quotes" :key="index">
                    {{ quote }}
                </li>
            </ul>
            <button type="button" id="crown" @click="fetchRandomQuotes" >Load Random Quotes</button>
          </div>
          </div>
        </div>
        <div v-else>
            <p>Person not found</p>
        </div>  
    </div>
    <button type="button" id="crown" @click="$router.go(-1)">Back</button>
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
}

.house {
  width: 30%;
}

.quotes {
  width: 60%;
text-align: right;
}

.quotes h2 {
  text-align: right;
  margin-right: 5%;
}

.quotes ul {
  list-style: none;
  padding: 0;
}

.quotes li {
  border-right: 3px solid #ccc; /* Ein vertikaler Balken auf der linken Seite für Stil */
  margin: 0.5em 0; /* Fügt oben und unten einen Rand hinzu */
  padding: 0.5em; /* Fügt innen etwas Abstand hinzu */
  text-align: right; /* Stellt den Text innerhalb des Zitat-Blocks linksbündig dar */
  max-width: 90%; /* Begrenzt die maximale Breite des Zitat-Blocks */
  margin-left: auto; /* Zentriert den Block innerhalb des Elternelements */
  margin-right: auto; /* Zentriert den Block innerhalb des Elternelements */
}

#crown {
  cursor: url("/krone.png"), pointer;
}
</style>