<script setup lang="ts">
import { Widget, useDashboardStore } from '@/stores/dashboard';
import TextWidget from '@/components/TextWidget.vue';
import WeatherWidget from '@/components/WeatherWidget.vue';
import TimerWidget from '@/components/TimerWidget.vue';
import { TextWidgetSettings, WeatherWidgetSettings } from '@/types/WidgetSettings';
import { storeToRefs } from 'pinia';
import draggable from 'vuedraggable';

const store = useDashboardStore();
const { widgets } = storeToRefs(store);

const addWidget = (type: Widget['type']) => {
  let defaultSettings;
  
  if (type === 'text') {
    defaultSettings = { text: '' } as TextWidgetSettings;
  } else if (type === 'weather') {
    defaultSettings = { latitude: undefined, longitude: undefined } as unknown as WeatherWidgetSettings;
  } else if (type === 'timer') {
    defaultSettings = { initialTime: 60 }; 
  }

  store.addWidget({ id: Date.now().toString(), type, settings: defaultSettings, position: { x: 40, y: 40 } });
};
</script>

<template>
  <div class="dashboard">
    <header>Интерактивный дашборд</header>
    <div class="row">
      <aside>
        <ul class="btn">
          <li @click="addWidget('text')">Добавить текстовый виджет</li>
          <li @click="addWidget('weather')">Добавить виджет погоды</li>
          <li @click="addWidget('timer')">Добавить таймер</li>
        </ul>
      </aside>
      <main>
        <div class="widgetWrap" v-if="widgets.length">
          <draggable
            class="widgetList"
            v-model="widgets"
            @start="drag=true"
            @end="drag=false"
            item-key="id"
          >
            <template #item="{element}">
              <div>
                <template v-if="element.type === 'text'">
                  <text-widget :widget="element" />
                </template>
                <template v-if="element.type === 'weather'">
                  <weather-widget :widget="element" />
                </template>
                <template v-if="element.type === 'timer'">
                  <timer-widget :widget="element" />
                </template>
              </div>
            </template>
          </draggable>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f4f8;
}

header {
  padding: 20px;
  background-color: #4a90e2;
  color: white;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.row {
  display: flex;
  gap: 20px;
  padding: 20px;
  height: calc(100% - 72px); /* Учитываем высоту хедера */
}

aside {
  padding: 20px;
  background-color: #ffffff;
  width: 250px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding-top: 0px;
}

main {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

ul.btn {
  list-style-type: none;
  padding: 0;
}

ul li {
  cursor: pointer;
  padding: 10px 15px;
  background-color: #4a90e2;
  color: white;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: background-color 0.3s;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

ul li:hover {
  background-color: #357abd;
}

.widgetWrap {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 500px;
}

.widgetList {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
</style>
