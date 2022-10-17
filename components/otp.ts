import type { Ref, InjectionKey } from "vue";
import { Fragment } from "vue";

export const Otp = defineComponent({
  name: "Otp",
  inheritAttrs: false,
  props: {
    inputNumber: {
      type: [String, Number],
      required: true,
      default: 3,
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: String,
    },
    class: {
      type: String,
      required: false,
    }
  },
  emits: ["update:modelValue"],

  setup(props, { slots, emit }: any) {
    let otp = ref(new Array(props.inputNumber).fill(""));
    let otpString = computed(() => {
      return otp.value.join('')
    })
    let initialOtp = ref<[]>([]);
    let focusedIndex = ref(0);
    let inputRefs = ref(new Array(props.inputNumber).fill(""));
    // let inputRefs = ref([]);
    onMounted(() => {
      // console.log(otp.value);
    });

    let api = {
      otp,
      initialOtp,
      focusedIndex,

      handleFocus(e: KeyboardEvent,index: number): void {
        if (
          (!inputRefs[index]?.value || inputRefs[index]?.value) &&
          inputRefs[index + 1] &&
          e.key === "ArrowRight"
        ) {
          inputRefs[index + 1].focus();
        }
        if (inputRefs[index]?.value && inputRefs[index + 1]) {
          inputRefs[index + 1].focus();
        }
        if (
          (!inputRefs[index]?.value || inputRefs[index]?.value) &&
          inputRefs[index - 1] &&
          e.key === "ArrowLeft"
        ) {
          inputRefs[index - 1].focus();
        }
        if (
          !inputRefs[index]?.value &&
          inputRefs[index - 1] &&
          e.key === "Backspace"
        ) {
          inputRefs[index - 1].focus();
        }
      },

      focusNext(index: number): void {
        if (this.hasNext(index)) {
          inputRefs[index + 1].focus();
        }
        else inputRefs[index].focus()
      },

      focusPrev(index: number): void {
        inputRefs[index - 1].focus();
      },

      handleBlur() {
        focusedIndex.value = null;
      },

      isValidInput(index: number): boolean {
        if (otp.value[index] !== "") return true;
      },

      hasPrev(index: number): boolean {
        if (otp.value[index - 1]) return true;
      },

      hasNext(index: number): boolean {
        if (inputRefs[index + 1]) return true;
      },

      handleChange(event, index: number) {
        let targetValue = event.target.value;
        otp.value[index] = targetValue.substr(-1);
        focusedIndex.value = index;
        this.focusNext();
        // console.log(targetValue.substr(-1));
        console.log(this.focusedIndex.value);
      },

      handleInput(event, index: number): void {
        let targetValue = event.target.value;
        let temporalOtp = [...otp.value]
        temporalOtp[index] = targetValue.substring(targetValue.length - 1)
        otp.value = temporalOtp;
        emit('update:modelValue',otpString.value)
        console.log(otpString.value)
      }

    };
    // provide("controller", api);

    return () =>
      otp.value.map((el, i) => {
        return h("input", {
          ref: (el) => {
            inputRefs[i] = el;
          },
          class: otp.value[i] ? 'filled'+' '+props.class : props.class ,
          type: props.type,
          onKeyup: (event: KeyboardEvent) => api.handleFocus(event,i),
          onInput: (event: InputEvent) => api.handleInput(event, i),
          value: otp.value[i]
        });
      });
  },
});


// tsx
// (
//   <Fragment>
//     {otp.value.map((el, i) => {
//       return (
//         <input ref={inputRefs} onInput={(event) => api.handleChange(event, i)} value={otp.value[i]}></input>
//       );
//     })}
//   </Fragment>
// );

// export const OtpInput = defineComponent({
//     name: 'OtpInput',
// })
