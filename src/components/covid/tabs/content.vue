<script>
    export default{
        name:"Content",
        props:{
            pans:{
                type:Array,
                default:function(){
                    return []
                }
            }
        },
        render(){
            return(
                <div>
                {
                    this.pans.map((ele,index)=>{
                        //另一种方式来渲染，基于css而不是元素的添加与删除
                        // return ele.isActive ? ele.$slots.default : ""
                        return <div style={{ display:ele.isActive?'block':'none' }}>{ele.$slots.default}</div>
                    })
                }
                </div>
            )
        }
    }
    </script>