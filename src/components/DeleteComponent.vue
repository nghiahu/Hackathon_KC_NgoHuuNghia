<template>
    <div class="modal">
      <div class="modal-content">
        <h3 class="title">Xác nhận</h3>
        <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
        <div class="modal-buttons">
          <button class="btn cancel" @click="closeDel">Cancel</button>
          <button class="btn delete" @click="DeleteProduct">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(["closeStatusDel", "delProduct"])
  
  function closeDel(){
    emit("closeStatusDel")
  }
  
  function DeleteProduct(){
    emit("delProduct")
  }
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 30px 50px;
    border-radius: 8px;
  }
  
  .title {
    font-size: 21px;
    font-weight: bold;
  }
  
  .modal-buttons {
    display: flex;
    margin-top: 20px;
    margin-left: 100px;
    gap: 10px;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn.cancel {
    background-color: #ccc;
  }
  
  .btn.delete {
    background-color: red;
    color: white;
  }
  </style>
  