import type { Ref, InjectionKey } from "vue";
import { Fragment } from 'vue'

type StateDefinition = {
  // State
  selectedIndex: Ref<number | null>;
  tabs: Ref<Ref<HTMLElement | null>[]>;
  panels: Ref<Ref<HTMLElement | null>[]>;

  // State mutators
  setSelectedIndex(index: number): void;
  registerTab(tab: Ref<HTMLElement | null>): void;
  unregisterTab(tab: Ref<HTMLElement | null>): void;
  registerPanel(panel: Ref<HTMLElement | null>): void;
  unregisterPanel(panel: Ref<HTMLElement | null>): void;
};

let TabsContext = Symbol("TabsContext") as InjectionKey<StateDefinition>;

function useTabsContext(component: string) {
  let context = inject(TabsContext, null);

  if (context === null) {
    let err = new Error(
      `<${component} /> is missing a parent <TabGroup /> component.`
    );
    if (Error.captureStackTrace) Error.captureStackTrace(err, useTabsContext);
    throw err;
  }

  return context;
}

export const TabGroup = defineComponent({
  name: "TabGroup",
  inheritAttrs: false,
  props: {
    selectedIndex: {
      type: [Number],
      default: null,
    },
    defaultIndex: {
      type: [Number],
      default: null,
    },
  },

  setup(props: any, { slots, emit }: any) {
    let selectedIndex = ref<StateDefinition["selectedIndex"]["value"]>(null);
    let tabs = ref<StateDefinition["tabs"]["value"]>([]);
    let panels = ref<StateDefinition["panels"]["value"]>([]);
    let isControlled = computed(() => props.selectedIndex !== null);
    let realSelectedIndex = computed(() =>
      isControlled.value ? props.selectedIndex : selectedIndex.value
    );

    let api = {
      selectedIndex,
      tabs,
      panels,
      setSelectedIndex(index: number) {
        if (realSelectedIndex.value !== index) {
          emit("change", index);
        }

        if (!isControlled.value) {
          selectedIndex.value = index;
        }
      },
      registerTab(tab: typeof tabs["value"][number]) {
        if (!tabs.value.includes(tab)) tabs.value.push(tab);
      },
      unregisterTab(tab: typeof tabs["value"][number]) {
        let idx = tabs.value.indexOf(tab);
        if (idx !== -1) tabs.value.splice(idx, 1);
      },
      registerPanel(panel: typeof panels["value"][number]) {
        if (!panels.value.includes(panel)) panels.value.push(panel);
      },
      unregisterPanel(panel: typeof panels["value"][number]) {
        let idx = panels.value.indexOf(panel);
        if (idx !== -1) panels.value.splice(idx, 1);
      },
    };
    provide(TabsContext, api);

    watchEffect(() => {
      if (api.tabs.value.length <= 0) return;
      if (props.selectedIndex === null && selectedIndex.value !== null) return;

      let tabs = api.tabs.value
        .map((tab) => dom(tab))
        .filter(Boolean) as HTMLElement[];
      let focusableTabs = tabs.filter((tab) => !tab.hasAttribute("disabled"));

      let indexToSet = props.selectedIndex ?? props.defaultIndex;

      // Underflow
      if (indexToSet < 0) {
        selectedIndex.value = tabs.indexOf(focusableTabs[0]);
      }

      // Overflow
      else if (indexToSet > api.tabs.value.length) {
        selectedIndex.value = tabs.indexOf(
          focusableTabs[focusableTabs.length - 1]
        );
      }

      // Middle
      else {
        let before = tabs.slice(0, indexToSet);
        let after = tabs.slice(indexToSet);

        let next = [...after, ...before].find((tab) =>
          focusableTabs.includes(tab)
        );
        if (!next) return;

        selectedIndex.value = tabs.indexOf(next);
      }
    });

    return () => {
        let normal = {passed: 'passed'}

        return h(Fragment, [h("div", {}, slots.default(normal), 'Come here now and eat with me')])
    };
  },
});

export const Tab = defineComponent({
  name: "Tab",
  setup(props: any, { slots }: any) {
    let tag = props.as;
    return () => h(tag, {}, slots.default());
  },
});
