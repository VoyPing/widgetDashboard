<script setup lang="ts">
import {computed, defineProps, onMounted, ref, watchEffect} from 'vue';
import {useDashboardStore} from "@/stores/dashboard";
import axios from "axios";
import { useRouter } from 'vue-router';

const props = defineProps<{ widget: any }>();
const router = useRouter()
const store = useDashboardStore();
const latitude = computed(() => props.widget.settings.latitude);
const longitude = computed(() => props.widget.settings.longitude);
const isReady = computed(() => !!latitude.value && !!longitude.value);
const current = ref({
  temperature: undefined,
  windSpeed: undefined,
  precipitation: undefined,
});

const getWeather = async () => {
  try {
    if (isReady.value) {
      const { data } = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude.value}&longitude=${longitude.value}&current=temperature_2m,precipitation,wind_speed_10m`);
      console.log(data);
      current.value = {
        temperature: data.current.temperature_2m,
        windSpeed: data.current.wind_speed_10m,
        precipitation: data.current.precipitation,
      };
    }
  } catch (e) {
    console.error(e);
  }
};

watchEffect(() => {
  if (isReady.value) {
    getWeather();
  }
});

onMounted(() => {
  startLoadWeather();
});

function startLoadWeather() {
  setInterval(getWeather, 60000);
}

const removeWidget = (id: string) => {
  store.removeWidget(id);
};

const navigateToSettings = (id: string) => {
  router.push({ name: 'WidgetSettings', params: { id } });
};
</script>

<template>
  <div class="widgetWeather">
    <div class="card">
      <h3>Виджет погоды</h3>
      <p v-if="current.temperature">Температура: {{ current.temperature }} °C</p>
      <p v-if="current.windSpeed">Скорость ветра: {{ current.windSpeed }} km/h</p>
      <p v-if="current.precipitation">Вероятность осадков: {{ current.precipitation }} mm</p>
    </div>
    <div class="action">
      <button @click="removeWidget(widget.id)">Удалить</button>
      <button @click="navigateToSettings(widget.id)">Настроить</button>
    </div>
  </div>
</template>

<style scoped>
.widgetWeather {
  width: 100%;
  background: linear-gradient(135deg, #3a7bd5, #3a6073);
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

.widgetWeather:hover {
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

router-link {
  color: #4caf50;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

router-link:hover {
  color: #66bb6a;
}
</style>
