<template>
    <div class="tab-box">
        <mu-paper :z-depth="1">
            <mu-data-table border :columns="columns" :data="list" @row-click="openDetail">
                <div slot-scope="scope">
                    <td>{{scope.row.Title}}</td>
                    <td>
                        <mu-button @click="del(scope.row.Id)">
                            delete
                            <mu-icon right value="delete"></mu-icon>
                        </mu-button>
                    </td>
                </div>
            </mu-data-table>
        </mu-paper>
    </div>
</template>
<script>
import Axios from 'axios'
export default {
    props:['list'],
    data(){
        return{
            columns:[
                {title:'标题',width:200,name:'title'},
                {title:'操作',wiidth:200,name:'option',align:'center'}
            ],
            reqUrl:this.$store.getters.getReqUrl()
        }
    },
    methods:{
        openDetail:function(index,row,event){
            console.log(index,row,event)
        },
        del:function(param){
            const apiUrl = this.reqUrl + 'Article'
            Axios.delete(apiUrl,param).then(response=>{
                if(response.status == 404 ){
                    this.$alert('文章不存在')
                    return false
                }else if(response.status == 204){
                    this.$alert('删除成功')
                }else{
                    this.$alert('删除失败',response.status)
                }
            }).catch(err=>{
                this.$alert('请求错误')
                console.error(err)
            })
        }
    }
}
</script>
<style scoped>
.tab-box{
    margin-top: 10px;
}
</style>
