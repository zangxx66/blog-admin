<template>
    <mu-container>

    </mu-container>
</template>
<script>
    import Breadcrumb from '../components/Home/Breadcrumb.vue'
    export default {
        data(){
            return{
                bar:[
                    {
                        text:'主页',
                        disabled:true
                    }
                ],
                articleItems:[],
                total:0,
                current:1,
                reqUrl:this.$store.getters.getReqUrl()
            }
        },
        mounted(){},
        methods:{
            init:function(){

            }
        }
    }
</script>