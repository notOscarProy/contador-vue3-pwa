const app = Vue.createApp({
    data(){
        return{
            title:'Contador VUE 3',
            count: 0
        }
    },
    methods:{
        modCount(val){
            this.count += val
            if(this.count<0)
                this.count++
        }
    }
})