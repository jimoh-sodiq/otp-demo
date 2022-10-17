
export default {
    props: {
        password: {
            type: String
        },
        confirmation: {
            type: String
        }
    },
    setup(props: any, {slots}: any){

        function isMatching(password: any, confirmation: any) {
            if(!password || !confirmation) {return false};
            return password === confirmation
        }

        const matching = computed(() => isMatching(props.password, props.confirmation))
        return () =>  slots.default({
            matching: matching.value
        })
    }
}