<template>
  <div class="card" style="width: 18rem">
    <img
      :src="item.thumbnail.path + '.' + item.thumbnail.extension"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title"><b>Name</b>: {{ item.name }}</h5>
      <p class="card-text">
        <b>Description</b>:
        {{ item.description != "" ? item.description : "No description" }}
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><b>Modified</b>: {{ item.modified }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Contenido",
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.card {
  height: 100%;
}
</style>
