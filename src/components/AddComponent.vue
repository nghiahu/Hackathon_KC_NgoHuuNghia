<template>
    <div class="modal">
      <div class="modal-content">
        <h3>Add New Product</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Name</label>
            <input v-model="newProduct.name" type="text" />
            <span v-if="errors.name" class="error">{{ errors.name }}</span>
          </div>
          <div class="form-group">
            <label>Image</label>
            <input v-model="newProduct.image" type="text" />
            <span v-if="errors.image" class="error">{{ errors.image }}</span>
          </div>
          <div class="form-group">
            <label>Price</label>
            <input v-model.number="newProduct.price" type="number" />
            <span v-if="errors.price" class="error">{{ errors.price }}</span>
          </div>
          <div class="form-group">
            <label>Quantity</label>
            <input v-model.number="newProduct.quantity" type="number" />
            <span v-if="errors.quantity" class="error">{{ errors.quantity }}</span>
          </div>
          <div class="actions">
            <button type="button" @click="closeShowFrom">Close</button>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  const emit = defineEmits(["closeStatus"])  
  const {propsProduct} = defineProps(["propsProduct"])
  function closeShowFrom(){
        emit("closeStatus")
    };
  const newProduct = ref({
    id: Math.floor(Math.random()*1000000000),
    name: '',
    image: '',
    price: null,
    quantity: null,
  });
  
  const products = ref([]); 
  const errors = ref({
    name: '',
    image: '',
    price: '',
    quantity: '',
  });
  
  onMounted(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      products.value = JSON.parse(storedProducts);
    }
  });
  
  const validateForm = () => {
    errors.value = {
      name: '',
      image: '',
      price: '',
      quantity: '',
    };
  
    let valid = true;
  
    if (!newProduct.value.name) {
      errors.value.name = 'Tên không được để trống';
      valid = false;
    } else if (products.value.some(product => product.name === newProduct.value.name)) {
      errors.value.name = 'Tên không được trùng';
      valid = false;
    }
  
    if (!newProduct.value.image) {
      errors.value.image = 'Ảnh không được để trống';
      valid = false;
    }
  
    if (newProduct.value.price === null || newProduct.value.price < 10000) {
      errors.value.price = 'Giá không thấp hơn 10,000 đ';
      valid = false;
    }
  
    if (newProduct.value.quantity === null || newProduct.value.quantity < 1 || newProduct.value.quantity > 100) {
      errors.value.quantity = 'Số lượng tối thiểu là 1 và tối đa là 100';
      valid = false;
    }
  
    return valid;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
        propsProduct.push({ ...newProduct.value });
  
      localStorage.setItem('products', JSON.stringify(propsProduct));
  
      closeShowFrom();
    }
  };
  
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
  }
  
  button[type="button"] {
    background-color: #ccc;
  }
  
  button[type="submit"] {
    background-color: #1b79c6;
    color: white;
  }
  
  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
  </style>
  