<script lang="ts">
import axios from 'axios';

interface House {
  slug: string;
  name: string;
}

interface Person {
  slug: string;
  name: string;
  house?: House;
  
}

export default {
  name: 'PersonsView',
  data() {
    return {
      persons: [] as Person[],
      searchTerm: '',
    };
  },
  computed: {
    filteredPersons() {
      return this.persons.filter((person) => {
        return person.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    },
  },
  async created() {
    try {
      const response = await axios.get<Person[]>('https://api.gameofthronesquotes.xyz/v1/characters');
      console.log("data: ", response.data);
    this.persons = response.data;
      
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    searchTerm(newTerm) {
      this.searchTerm = newTerm.replace(/[^a-zA-Z ]/g, '');
    }
  }
};
</script>

<template>
  <div class="searchbar-container">
    <input type="text" maxlength="30" class="searchbar" v-model="searchTerm" placeholder="Search person..">
  </div>
  <div class="persons">
    <ul>
      <li class="person-card" id="crown" v-for="person in filteredPersons" :key="person.slug">
        <RouterLink id="crown" :to="'/persondetails/' + person.slug">
          {{ person.name }} - {{ person.house ? person.house.name : 'unknown' }} 
        </RouterLink> 
      </li>
    </ul>
  </div>
</template>

<style>

.searchbar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.searchbar {
  width: 35%;
  height: 30px;
  border-radius: 4px;
  border: none;
  outline: none;
  padding: 0 1rem;
  font-size: 1.6rem;
  font-family: Arial, Helvetica, sans-serif;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px); 
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

.persons {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  justify-content: space-between;
}

.persons ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
}

.person-card {
  background-color: #ccc;
  color: #000;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
  transition: transform 0.2s ease-in-out;
  text-align: center;
  flex: 1 1 48%;
  max-width: 38%;
  margin-bottom: 1rem;
}

.person-card a {
  color: #000;
  text-decoration: none;
}

.person-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
}

#crown {
  cursor: url("/krone.png"), pointer;
}

</style>