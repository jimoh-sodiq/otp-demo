export default {
  name: "TabContainer",
  props: {
    modelValue: {
      type: String,
    },
    activeTabId: String,
  },
  emits: ["update:modelValue"],

  setup(props: any, { slots, emit }: any) {
    function updateTabId() {
      alert("update tab Id called" + props.modelValue + slots.type);
    }

    return () =>
      h(
        "div",
        {
          modelValue: props.modelValue,
          "onUpdate:modelValue": (value: string) =>
            emit("update:modelValue", value),
        },
        slots.default({ updateTabId })
      );
  },
};
