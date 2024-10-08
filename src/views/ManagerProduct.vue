<template>
    <div>
      <div class="ti_bar">
        <div class="title">Manager Product</div>
        <div class="AddProduct" @click="openFrom">Add New Product</div>
      </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <img :src="product.image" alt="Product Image" class="product-image" />
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.price.toLocaleString() }} đ</td>
            <td>{{ product.quantity }}</td>
            <td class="td_option">
              <button class="edit-btn" @click="handelEdit(product)">Edit</button>
              <button class="delete-btn" @click="handelDel(product.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <AddComponent v-if="isShowFrom" @closeStatus="handleClose" :propsProduct="products"/>
      <DeleteComponentVue v-if="isShowDel" @closeStatusDel="handelDelClose" @delProduct="deleteProduct"/>
      <EditComponent v-if="isShowEdit" @closeStatusEdit="handleCloseEdit" :productToEdit="productToEdit" :propsProduct="products"/>
    </div>
  </template>
  
  <script setup>
  import AddComponent from '@/components/AddComponent.vue';
  import DeleteComponentVue from '../components/DeleteComponent.vue';
  import EditComponent from '@/components/EditComponent.vue';
  import { reactive, ref } from 'vue';
  
  const isShowFrom = ref(false)
  const isShowDel = ref(false)
  const isShowEdit = ref(false)
  const products = reactive(JSON.parse(localStorage.getItem("products") || "[]"));
  let productToDeletId = ref(null);
  let productToEdit = ref(null); 
  
  function openFrom(){
    isShowFrom.value = true
  }
  
  function handleClose(){
    isShowFrom.value = false
  }
  
  function handelDel(id) {
    productToDeletId.value = id;
    isShowDel.value = true;
  }
  
  function handelDelClose() {
    isShowDel.value = false;
  }
  
  function deleteProduct() {
    if (productToDeletId.value !== null) {
      const index = products.findIndex(product => product.id === productToDeletId.value);
      if (index !== -1) {
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
      }
      handelDelClose();
    }
  }
  
  function handelEdit(product) {
    productToEdit.value = { ...product };  
    isShowEdit.value = true;
  }
  
  function handleCloseEdit(updatedProduct) {
    if (updatedProduct) {
      const index = products.findIndex(product => product.id === updatedProduct.id);
      if (index !== -1) {
        products[index] = updatedProduct;
        localStorage.setItem("products", JSON.stringify(products));
      }
    }
    isShowEdit.value = false;
  }
  </script>
  
  <style scoped>
  .ti_bar {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding: 10px 20px;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
  }
  
  .AddProduct {
    padding: 10px 20px;
    background-color: #1b79c6;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }
  
  table {
    width: 95%;
    border-collapse: collapse;
    margin-top: 20px;
    margin-left: 2%;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
  
  .product-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .edit-btn, .delete-btn {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    color: white;
  }
  
  .edit-btn {
    background-color: #ff9800;
    margin-right: 5px;
  }
  
  .delete-btn {
    background-color: #f44336;
  }
  
  .td_option {
    text-align: center;
  }
  </style>
  