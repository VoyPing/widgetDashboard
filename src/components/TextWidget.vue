<script setup lang="ts">
import {defineProps} from 'vue';
import {useDashboardStore} from "@/stores/dashboard";
import { useRouter } from 'vue-router';

const props = defineProps<{ widget: any }>();
const store = useDashboardStore();
const router = useRouter();

const removeWidget = (id: string) => {
  store.removeWidget(id);
};

const navigateToSettings = (id: string) => {
  router.push({ name: 'WidgetSettings', params: { id } });
};
</script>

<template>
  <div class="widgetText">
    <div class="card">
      <h3>Текстовый виджет</h3>
      <p>{{ widget.settings.text }}</p>
    </div>
    <div class="action">
      <button @click="removeWidget(widget.id)">Удалить</button>
      <button @click="navigateToSettings(widget.id)">Настроить</button>
    </div>
  </div>
</template>

<style scoped>
.widgetText {
  width: 100%;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  border-radius: 12px;
  color: #fff;
  cursor: move;
  min-height: 150px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
}

.widgetText:hover {
  transform: scale(1.02);
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.card h3 {
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #fff;
}

.card p {
  margin: 5px 0;
  font-size: 1.2rem;
}

.action {
  display: flex;
  justify-content: space-around;
  padding: 10px;
}

button {
  background-color: #ff4c4c;
  border: none;
  border-radius: 8px;
  color: #fff;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ff6666;
}
</style>
