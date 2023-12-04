<script lang="ts">
import axios from 'axios';

interface House {
  slug: string;
  name: string;
}

export default {
  name: 'HousesView',
  data() {
    return {
      houses: [] as House[],
    };
  },
  async created() {
    try {
      const response = await axios.get<House[]>('https://api.gameofthronesquotes.xyz/v1/houses');
      console.log("data: ", response.data);
    this.houses = response.data;
      
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<template>
  <div class="houses">
    <ul>
      <li class="house-card" v-for="house in houses" :key="house.slug">
        <RouterLink :to="'/housedetails/' + house.slug">
  {{ house.name }}
</RouterLink>
        
      </li>
    </ul>
  </div>
</template>

<style>

.houses {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  justify-content: space-between;
}

.houses ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
}

.house-card {
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

.house-card a {
  color: #000;
  text-decoration: none;
}

.house-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
}

</style>
