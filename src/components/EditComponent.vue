<template>
    <div class="modal">
      <div class="modal-content">
        <h3>Edit Product</h3>
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
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const props = defineProps(["productToEdit", "propsProduct"]);
  const emit = defineEmits(["closeStatusEdit"]);
  const newProduct = ref({ ...props.productToEdit });
  const errors = ref({
    name: '',
    image: '',
    price: '',
    quantity: '',
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
    } else if (props.propsProduct.some(product => product.name === newProduct.value.name && product.id !== newProduct.value.id)) {
      errors.value.name = 'Tên trùng lặp';
      valid = false;
    }
  
    if (!newProduct.value.image) {
      errors.value.image = 'Ảnh không được để trống';
      valid = false;
    }
  
    if (newProduct.value.price === null || newProduct.value.price < 10000) {
      errors.value.price = 'Giá không được thấp hơn 10,000 đ';
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
      const index = props.propsProduct.findIndex(product => product.id === newProduct.value.id);
      if (index !== -1) {
        props.propsProduct[index] = { ...newProduct.value };
        localStorage.setItem('products', JSON.stringify(props.propsProduct));
        closeShowFrom();
      }
    }
  };
  function closeShowFrom() {
    emit("closeStatusEdit");
  }
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
  