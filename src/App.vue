<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue';
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
    <HomeView />
    <RouterView />
  </main>
</template>

<style>

header {
  line-height: 1.5;
  font-size: 4rem;
  font-weight: 400;
  text-align: center;
  top: 0;
  width: 100%;
  padding: 1rem;
  z-index: 100;
}

.content {
  padding-top: 1rem;	 
}

nav {
  width: 100%;
  font-size: 20px;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}

nav a:first-of-type {
  border: 0;
}



</style>
