<template>
    <header id="header">
        <h1 class="logo">
            <router-link
                to="/">Logo</router-link>
        </h1>
    </header>
</template>

<script setup>

</script>

<style lang="scss" scoped>
#header{
    padding:8px 20px;
    .logo{
        width:60px;
        height:30px;
        text-indent:-9999px;
        overflow:hidden;
        background:url('./../../../public/logo.png') center no-repeat;
        background-size:80%;
    }
}
</style>