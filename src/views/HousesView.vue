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
      searchTerm: '',
    };
  },
  computed: {
    filteredHouses() {
      return this.houses.filter((house) => {
        return house.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    },
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
  watch: {
    searchTerm(newTerm) {
      this.searchTerm = newTerm.replace(/[^a-zA-Z ]/g, '');
    }
  }
};
</script>

<template>
  <div class="searchbar-container">
    <input type="text" maxlength="30" class="searchbar" v-model="searchTerm" placeholder="Search house..">
  </div>
  <div class="houses">
    <ul>
      <li class="house-card" id="crown"  v-for="house in filteredHouses" :key="house.slug">
        <RouterLink id="crown" :to="'/housedetails/' + house.slug">
  {{ house.name }}
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
  width: 30%;
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

.houses {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0;
  margin-bottom: 2rem;
  width: 100%;
}

.houses ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 4%;
}

.house-card {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px); 
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease-in-out;
  text-align: center;
  color: black; 
  position: relative;
  overflow: hidden; 
  width: 32.7%;
  margin: 10px;
  
}

/* Pseudo-Element für den Hover-Effekt */
.house-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #952323; 
  transform: scale(0);
  transition: transform 0.3s ease-in-out;
  z-index: -1;
}

/* Hover-Effekt */
.house-card:hover::before {
  transform: scale(1);
}

.house-card:hover {
  color: white; 
}

.house-card a {
  color: inherit;
  text-decoration: none;
} 

#crown {
  cursor: url("/krone.png"), pointer;
}

</style>
