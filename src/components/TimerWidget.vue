<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { defineProps } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';

const props = defineProps<{ widget: any }>();

const store = useDashboardStore();
const removeWidget = (id: string) => {
  store.removeWidget(id);
};

const timeRemaining = ref(props.widget.settings.initialTime || 60);
const inputTime = ref(timeRemaining.value);
let timerInterval: number | null = null;
const isRunning = ref(false);

const startTimer = () => {
  if (isRunning.value) return;

  timerInterval = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value -= 1;
    } else {
      clearInterval(timerInterval!);
      isRunning.value = false;
    }
  }, 1000);
  isRunning.value = true;
};

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    isRunning.value = false;
  }
};

watch(inputTime, (newTime) => {
  timeRemaining.value = newTime;
});

onMounted(() => {
  if (isRunning.value) startTimer();
});

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
});

const restartTimer = () => {
  stopTimer();
  timeRemaining.value = inputTime.value;
  startTimer();
};
</script>

<template>
  <div class="widgetTimer">
    <div class="card">
      <h3>Таймер</h3>
      <input v-model.number="inputTime" type="number" min="0" placeholder="Введите время в секундах" />
      <p>Оставшееся время: {{ timeRemaining }} сек.</p>
    </div>
    <div class="action">
      <button @click="removeWidget(widget.id)">Удалить</button>
      <button @click="startTimer" :disabled="isRunning">Старт</button>
      <button @click="stopTimer" :disabled="!isRunning">Стоп</button>
      <button @click="restartTimer">Перезапустить</button>
    </div>
  </div>
</template>

<style scoped>
.widgetTimer {
  width: 100%;
  background: #f0f0f0;
  cursor: move;
  min-height: 100px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

input {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100px;
}

.action {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 5px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4a90e2;
  color: white;
  font-weight: bold;
  margin: 0 5px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #357abd;
}
</style>
