<template>
<div class="goods-info-intro">
    <comment :id="id"></comment>
</div>
</template>
<script>
export default {
    data(){
        return {
            id: this.$route.params.id,
        }
    },
    methods:{
    }
}
</script>
<style lang="scss">
</style>
