<template>
  <div class="container">
    <div class="mb-3">
      <h2>Registro: {{ dataItem.id }}</h2>
      <b> <label for="nombreEdit" class="form-label">Editar nombre</label></b>
      <input
        type="text"
        class="form-control"
        id="nombreEdit"
        v-model="dataItem.name"
      />
    </div>
    <div class="mb-3">
      <b>
        <label for="descriptionEdit" class="form-label"
          >Editar Description</label
        ></b
      >
      <input
        type="email"
        class="form-control"
        id="descriptionEdit"
        v-model="dataItem.description"
      />
    </div>

    <button class="btn btn-primary m-5" @click="editData">Guardar</button>
    <router-link class="btn btn-primary m-5" to="/">Volver</router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Edit",
  computed: {
    ...mapState(["personajes"]),
  },
  data() {
    return {
      dataItem: {},
    };
  },
  methods: {
    ...mapActions({
      editPersonajeAction: "editPersonajeAction",
    }),
    cargaData() {
      for (let i = 0; i < this.personajes.results.length; i++) {
        if (this.personajes.results[i].id == this.$route.params.id) {
          // console.log("result edit", this.personajes.results[i]);
          return (this.dataItem = this.personajes.results[i]);
        }
      }
    },
    editData() {
      this.editPersonajeAction(this.dataItem);
      this.$router.push({ name: "Home" });
    },
  },
  mounted() {
    this.cargaData();
  },
};
</script>

<style lang="css" scoped>
.container {
  width: 50%;
}
</style>
