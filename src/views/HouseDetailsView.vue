<script lang="ts">
import axios from 'axios';

interface Member {
  slug: string;
  name: string;
}

interface House {
  slug: string;
  name: string;
  members: Member[];
}

export default {
  name: 'HouseDetailsView',
  data() {
    return {
      house: null as House | null,
    };
  },
  async created() {
    const houseId = this.$route.params.houseId;
    try {
      const response = await axios.get(`https://api.gameofthronesquotes.xyz/v1/house/${houseId}`);
      console.log("data: ", response.data);
      this.house = Array.isArray(response.data) ? response.data[0] : response.data;
      
    } catch (error) {
      console.error('Error fetching house details:', error);
    }
  },
};
</script>

<template>
    <div class="house-details">
      <div v-if="house">
        <h2>{{ house.name }}</h2>
        <h3>Members</h3>
        <ul>
          <li v-for="member in house.members" :key="member.slug">
            {{ member.name }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>House not found</p>
      </div>
    </div>
    <button class="btn" id="crown" type="button" @click="$router.go(-1)">Back</button>
</template>

<style scoped>
.house-details {
  margin: 2rem;
}

.house-details h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.house-details h3 {
  font-size: 1.8rem;
  margin-bottom: 0.9rem;
  text-align: center;
}

.house-details ul {
  list-style: none;
  padding-left: 0;
  text-align: center;
}

.house-details li {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

#crown {
  cursor: url("/krone.png"), pointer;
}

</style>