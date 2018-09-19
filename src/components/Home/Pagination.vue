<template>
    <mu-flex justify-content="center" class="page-box">
        <mu-pagination raised circle :total="total" :current.sync="current" @change="page"></mu-pagination>
    </mu-flex>
</template>
<script>
export default {
    props:['total','current'],
    methods:{
        page:function(){
            this.$emit('changePage',this.current)
        }
    }
}
</script>
<style scoped>
.page-box{
    margin-top: 10px;
}
</style>
