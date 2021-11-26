<template>
  <div class="home">
    <header class="mb-3">
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="container-fluid d-flex justify-content-end">
          <div class="navbar">
            <form action="" class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Busca por nombre"
                aria-label="Search"
                v-model="search"
              />
              <button
                type="input"
                class="btn btn-primary"
                @click.prevent="cargaBusqueda"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
    <div class="container">
      <div class="row">
        <div
          class="col-md-6 col-lg-4 col-xl-3 mb-5"
          v-for="item in personajes.results"
          :key="item.id"
        >
          <Card class="items" :item="item" />
        </div>
      </div>
      <div class="row">
        <div class="col mb-5">
          <button class="btn btn-primary" type="button" v-if="loader" disabled>
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
      loader: false,
      search: "",
    };
  },
  computed: {
    /**
     * Al computed en Vue podemos hacer uso de su cache, esto significa que si hay data igual a la anterior no la carga ni muta, solo lo que se agrego o cambio
     * */
    ...mapState(["personajes"]),
  },

  mounted() {
    this.loader = true;

    this.personajesAction({
      paginationData: this.paginationData,
      offsetData: this.offsetData,
      search: this.search,
    });
    setTimeout(() => {
      this.loader = false;
    }, 5000);
    window.addEventListener("scroll", this.hadleScroll);
  },
  methods: {
    ...mapActions({
      personajesAction: "personajesAction",
    }),
    cargaBusqueda() {
      let searchHere = "";

      if (this.search != "") {
        this.paginationData += 16;
        this.offsetData += this.paginationData;

        searchHere = "nameStartsWith=" + this.search + "&";

        this.personajesAction({
          paginationData: this.paginationData,
          offsetData: this.offsetData,
          search: searchHere,
        });

        setTimeout(() => {
          this.loader = false;
        }, 5000);
      } else {
        // En caso que el campo searchHere este vacío
        this.personajesAction({
          paginationData: this.paginationData,
          offsetData: this.offsetData,
          search: this.search,
        });
        setTimeout(() => {
          this.loader = false;
        }, 5000);
      }
    },
    cargaPagination() {
      if (this.search == "") {
        this.paginationData += 16;
        this.offsetData += this.paginationData;

        let searchHere = "";

        if (this.search != "") {
          searchHere = "nameStartsWith=" + this.search + "&";
        }

        this.personajesAction({
          paginationData: this.paginationData,
          offsetData: this.offsetData,
          search: searchHere,
        });
        setTimeout(() => {
          this.loader = false;
        }, 5000);
      } else {
        this.loader = false;
      }
    },
    // infinite scroll
    hadleScroll() {
      this.loader = true;

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
<style scoped>
.navbar {
  height: auto;
  padding: 3px;
}

@media (max-width: 770px) {
  .items {
    margin-left: auto !important;
    margin-right: auto !important;
  }
}
</style>
