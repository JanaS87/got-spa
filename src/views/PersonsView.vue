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
    };
  },
  async created() {
    try {
      const response = await axios.get<Person[]>('https://api.gameofthronesquotes.xyz/v1/characters');
      console.log("data: ", response.data);
    this.persons = response.data;
      
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<template>
  <div class="persons">
    <ul>
      <li class="person-card" id="crown" v-for="person in persons" :key="person.slug">
        <RouterLink id="crown" :to="'/persondetails/' + person.slug">
          {{ person.name }} - {{ person.house ? person.house.name : 'unknown' }} 
        </RouterLink> 
      </li>
    </ul>

  </div>
</template>

<style>

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