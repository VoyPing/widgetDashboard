<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="app">
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif; 
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #007bff; 
  color: white;
}

.logo {
  display: block;
  margin: 0;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s; 
}

nav a.router-link-exact-active {
  background-color: #0056b3; 
}

nav a:hover {
  background-color: #0056b3; 
}

main {
  flex: 1;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
}
</style>
