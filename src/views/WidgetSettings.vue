<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDashboardStore } from '@/stores/dashboard';

const store = useDashboardStore();
const route = useRoute();
const router = useRouter();
const widget = store.widgets.find(w => w.id === route.params.id);

const localSettings = ref({ ...widget?.settings });

const saveSettings = () => {
  store.updateWidget(widget!.id, localSettings.value);
  router.push('/');
};
</script>

<template>
  <div class="settings-container">
    <h1>Настройка виджета</h1>
    <div v-if="widget" class="widget-settings">
      <div v-if="widget.type === 'text'" class="form-group">
        <label for="text-input">Текст:</label>
        <input id="text-input" v-model="localSettings.text" type="text" class="form-control"/>
      </div>
      <div v-else-if="widget.type === 'weather'" class="form-group">
        <label for="latitude-input">Широта:</label>
        <input id="latitude-input" v-model="localSettings.latitude" type="number" class="form-control" />
        <label for="longitude-input">Долгота:</label>
        <input id="longitude-input" v-model="localSettings.longitude" type="number" class="form-control" />
      </div>
      <button @click="saveSettings" class="save-button">Сохранить</button>
    </div>
  </div>
</template>

<style scoped>
.settings-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.widget-settings {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
  color: #555;
}

.form-control {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.save-button {
  padding: 12px 20px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;
  text-align: center;
}

.save-button:hover {
  background-color: #357abd;
}
</style>
