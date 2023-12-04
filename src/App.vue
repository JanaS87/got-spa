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
  font-size: 4rem;
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

.content {
  padding-top: 1rem;	 
}

nav {
  width: 100%;
  font-size: 20px;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-family:Arial, Helvetica, sans-serif
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  color: #D4AF37;
  text-decoration: none;
  font-size: 1.6rem;
  position: relative;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #EEF5FF;
}

nav a.router-link-active {
  color: #EEF5FF;
  text-decoration: underline;
}

</style>
