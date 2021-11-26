<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div
          class="col-md-6 col-lg-4 col-xl-3 mb-5"
          v-for="item in personajes.results"
          :key="item.id"
        >
          <Card :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "Home",
  components: {
    Card,
  },
  computed: {
    ...mapState(["personajes"]),
  },
  methods: {
    ...mapActions({
      personajesAction: "personajesAction",
    }),
  },
  mounted() {
    this.personajesAction();
  },
};
</script>
