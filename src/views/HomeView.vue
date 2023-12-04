<script setup lang="ts">
</script>

<template>
  <main>
    <h3>Here you will find all information about GOT.
Take a look at the houses, learn about each character or browse through all the quotes that exist.</h3>
    <p class="fun">Have fun!</p>
    <br><hr><br>

    <p class="explanation">
      This is my final version for the skill test.

      I hope you like my attempt so far.

      Since Vue is still completely new to me, I had to browse the internet a bit more, but I'm happy with the result and with myself.
    </p>

  </main>
</template>

<style>

main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-family: Arial, Helvetica, sans-serif;
}

.fun {
  font-size: 1.4rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  text-align: center;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

hr {
  border: 1px solid #D4AF37;
  width: 70%;
  margin-top: 2rem;
  margin-bottom: 2rem;
  opacity: 0.3;
}

.explanation {
  font-size: 1.2rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 400;
  text-align: center;
  max-width: 30%;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>