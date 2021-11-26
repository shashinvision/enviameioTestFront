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
        <button @click="cargaPagination">nuevo</button>
      </div>
      <div class="row">
        <div class="col mb-5">
          <button class="btn btn-primary" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
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
  data() {
    return {
      paginationData: 16,
      offsetData: 0,
    };
  },
  computed: {
    /**
     * Al computed en Vue podemos hacer uso de su cache, esto significa que si hay data igual a la anterior no la carga ni muta, solo lo que se agrego o cambio
     * */
    ...mapState(["personajes"]),
  },
  mounted() {
    this.personajesAction({
      paginationData: this.paginationData,
      offsetData: 0,
    });
    window.addEventListener("scroll", this.hadleScroll);
  },
  methods: {
    ...mapActions({
      personajesAction: "personajesAction",
    }),
    cargaPagination() {
      this.paginationData += 16;
      this.offsetData += this.paginationData;

      this.personajesAction({
        paginationData: this.paginationData,
        offsetData: this.offsetData,
      });
    },
    // infinite scroll
    hadleScroll() {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight
      ) {
        this.cargaPagination();
      }
    },
  },
};
</script>
