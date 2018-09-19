<template>
    <div class="bar-box">
        <mu-breadcrumbs>
            <mu-icon value="forward" slot="divider"></mu-icon>
            <mu-breadcrumbs-item v-for="item in items" :key="item.text" :disabled="item.disabled">{{item.text}}</mu-breadcrumbs-item>
        </mu-breadcrumbs>
    </div>
</template>
<script>
export default {
    props:['items']
}
</script>
<style scoped>
.bar-box{
    margin-top: 10px;
}
</style>
