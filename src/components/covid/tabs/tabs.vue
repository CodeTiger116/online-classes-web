<script>
    import Content from "./content"
    export default{
        name:"Tabs",
        data(){
            return{
                pans:[]
            }
        },
        props:{
            currentIndex:{
                type:[String,Number],
                default:"1"
            }
        },
        methods:{
            getIndex(index){    //给Map.vue
                this.$emit("onIndex",index)    
            }
        },
        render(){
            return(
                <div>
                    <ul class="tabs-header">{ this.$slots.default }</ul>
                    <Content pans={ this.pans }/>
                </div>
            )
        }
    }
    </script>
    
    <style>
        .tabs-header{
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            border-bottom: 2px solid #ededed;
            background: #fff;
            border-radius: 5px;
        }
    </style>