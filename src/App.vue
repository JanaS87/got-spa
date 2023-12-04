<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div>
      <h1>Game of Thrones</h1>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/houses">Houses</RouterLink>
        <RouterLink to="/persons">Persons</RouterLink>
        <RouterLink to="/quotes">Quotes</RouterLink>
      </nav>

    </div>
  </header>

  <main class="content">
    <RouterView />
  </main>
</template>

<style>

header {
  line-height: 1.5;
  font-size: 4.4rem;
  font-weight: 400;
  text-align: center;
  top: 0;
  width: 100%;
  padding: 1rem;
  z-index: 100;
}

header h1 {
  font-family: 'GOT';
  color: #952323;
}

@media screen and (max-width: 1920px) {
  header {
    font-size: 3.2rem;
  }
  
}


.content {
  padding-top: 1rem;	 
}

</style>
