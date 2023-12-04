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
        <h1>{{ house.name }}</h1>
        <h2>Members</h2>
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
    <button type="button" @click="$router.go(-1)">Back</button>
</template>