export default {
  props: {
    tabId: {
        type: String,
        required: true
    },
    as: {
        type: String,
        default: 'div',
    }
  },

  setup(props: any, {slots}: any){
    let tag = props.as
    return () =>  h(tag, slots.default({tag: tag}))
  }
};
