import { defineStore } from 'pinia';
import { WidgetSettings} from '@/types/WidgetSettings';

export interface Widget {
  id: string;
  type: 'text' | 'weather' | 'timer';
  settings: WidgetSettings;
  position: { x: number; y: number };
}

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    widgets: [] as Widget[],
  }),
  actions: {
    addWidget(widget: Widget) {
      this.widgets.push(widget);
    },
    removeWidget(id: string) {
      this.widgets = this.widgets.filter(widget => widget.id !== id);
    },
    updateWidget(id: string, newSettings: WidgetSettings) {
      const widget = this.widgets.find(widget => widget.id === id);
      if (widget) {
        widget.settings = newSettings;
      }
    },
  },
});
