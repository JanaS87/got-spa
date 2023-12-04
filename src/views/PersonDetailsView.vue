<script lang="ts">
import axios from 'axios';

interface Person {
  slug: string;
  name: string;
  house: House;
  quotes: Quote;
}

interface House {
  slug: string;
  name: string;
}

interface Quote {
  sentence: string;
  character: string;
}

export default {
    name: 'PersonDetailsView',
    data() {
      return {
        person: null as Person | null,
        quotes: [] as string[],
        house: null as House | null,
      };
    },
    async created() {
      const personId = this.$route.params.personId;
      try {
        const response = await axios.get(`https://api.gameofthronesquotes.xyz/v1/character/${personId}`);
        console.log("data: ", response.data);
        this.person = Array.isArray(response.data) ? response.data[0] : response.data;
       // this.quotes = Array.isArray(response.data) ? response.data[0].quotes : response.data.quotes;
       this.quotes = this.person?.quotes.slice(0, 5);
        this.house = Array.isArray(response.data) ? response.data[0].house : response.data.house;
        
      } catch (error) {
        console.error('Error fetching person details:', error);
      }
    },
    methods: {
      async fetchRandomQuotes() {
        if(this.person) {
          try {
            const response = await axios.get(`https://api.gameofthronesquotes.xyz/v1/random/character/${this.person.slug}`);
            console.log("data: ", response.data);
            this.quotes = response.data.slice(0, 5);
            
          } catch (error) {
            console.error('Error fetching random quotes:', error);
          
        }
      }
    }
}

}
</script>

<template>
    <div class="person-details">
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
            <button type="button" @click="fetchRandomQuotes" >Load Random Quotes</button>
          </div>
          </div>
        </div>
        <div v-else>
            <p>Person not found</p>
        </div>  
    </div>
    <button type="button" @click="$router.go(-1)">Back</button>
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
</style>