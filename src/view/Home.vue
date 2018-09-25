<template>
    <mu-container>
        <Breadcrumb :items="bar"></Breadcrumb>
        <div class="addBtn">
            <div class="button-wrapper">
                <mu-button color="secondary" to="/CreateArticle.html">
                    <mu-icon left value="add">新建</mu-icon>
                </mu-button>
            </div>
        </div>
        <Table ref="table"></Table>
        <Pagination :total="total" :current="current" v-on:changePage="init"></Pagination>
    </mu-container>
</template>
<script>
    import Breadcrumb from '../components/Home/Breadcrumb.vue'
    import Pagination from '../components/Home/Pagination.vue'
    import Table from '../components/Home/Table.vue'
    import Axios from 'axios'

    export default {
        data(){
            return{
                bar:[
                    {
                        text:'主页',
                        path:'/',
                        disabled:true
                    }
                ],
                articleItems:[],
                total:0,
                current:1,
                reqUrl:this.$store.getters.getReqUrl()
            }
        },
        mounted(){
            this.init(1)
        },
        methods:{
            init:function(page){
                const apiUrl = this.reqUrl + 'Article/Get'
                Axios.get(apiUrl,{Page:page}).then(response=>{
                    if(response.status == 200){
                        const callback = response.data
                        this.total = callback.total
                        this.current = callback.current
                        this.articleItems = callback.data
                        this.$refs.table.init(this.articleItems)
                    }else{
                        this.$alert('获取列表失败')
                    }
                }).catch(err=>{
                    this.$alert('获取列表异常')
                    console.error(err)
                })
            }
        },
        components:{
            Breadcrumb,
            Pagination,
            Table
        }
    }
</script>
<style scoped>
.addBtn{
    margin-top: 10px;
}
</style>
