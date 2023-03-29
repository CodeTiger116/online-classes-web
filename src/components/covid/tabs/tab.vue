<script>
    import Content from "./content"
        export default{
            name:"Tab",
            props:{
                label:{
                    type:String,
                    default:"Tab"
                },
                index:{
                    type:[String,Number],
                    default:"1"
                }
            },
            mounted(){
                this.$parent.pans.push(this);   //整个给tabs
            },
            computed:{
                isActive(){    //是否点击，子传父
                    return this.$parent.currentIndex === this.index
                }
            },
            methods:{
                clickItemHandle(){
                    this.$parent.getIndex(this.index)
                }
            },
            render(){
                let className={
                    tab:true,
                    active:this.isActive
                }
                return(
                    <li onClick={ this.clickItemHandle } class={ className }>
                    { this.label }
                    </li>
                )
            }
    
        }
    </script>
    <style scoped>
        .tab{
            flex: 1;
            list-style: none;
            line-height: 40px;
            margin-right: 10px;
            position: relative;
            text-align: center;
            
        }
        .tab.active{
            border-bottom: 2px solid rgb(238, 72, 86);
        }
    </style>