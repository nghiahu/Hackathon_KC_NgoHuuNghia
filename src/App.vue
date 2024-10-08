<script setup>

</script>

<template>
  <div>
  <nav class="navber">
            <router-link exact-active-class="active" class="nav_item" to="/admin">Dashboard</router-link>
            <router-link active-class="active" class="nav_item" to="/admin/manager-category">Manager Category</router-link>
            <router-link active-class="active" class="nav_item" to="/admin/manager-product">Manager Product</router-link>
        </nav>
  <router-view></router-view>
</div>
</template>

<style scoped>
.navber{
    background-color: black;
    height: 70px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 10px;
}
.nav_item{
    color: white;
}
.active{
    background-color: rgb(55, 54, 54);
    padding: 10px 20px;
    border-radius: 5%;
}
</style>
