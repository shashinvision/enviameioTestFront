import { createStore } from "vuex";

export default createStore({
  state: {
    API: {
      baseURL: "https://gateway.marvel.com/v1/public/",
      ts: "ts=1000&",
      apikey: "apikey=dd68f89f37de666df8c69de23aabb6c8&",
      offset: 0,
      hash: "hash=3b750f471b1078e17963021a9937e915",
    },
    personajes: {},
  },
  mutations: {
    personajesMutation(state, payload) {
      console.log("respuesta Mutation Personajes", payload.data);

      state.personajes = payload.data;
    },
    personajesPaginationMutation(state, payload) {
      console.log("respuesta personajesPaginationMutation", payload.data);

      state.personajes = payload.data;
    },
  },
  actions: {
    async personajesAction({ commit, state }, dataLoad) {
      console.log("Data load", dataLoad);
      await fetch(
        state.API.baseURL +
          "characters?" +
          "limit=" +
          dataLoad.paginationData +
          "&" +
          dataLoad.search +
          state.API.ts +
          state.API.apikey +
          state.API.hash,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((payload) => {
          console.log("respuesta Action Personajes", payload);

          // Carga inicial
          if (dataLoad.paginationData == 0) {
            commit("personajesMutation", payload);
          } else {
            /* Caga con paginación
             Al usar el cache de computed uso el mismo
             llamado agregando al Front solo lo nuevo de la consulta
             */
            commit("personajesPaginationMutation", payload);
          }
        })
        .catch(function (err) {
          console.error("Error al intentar ingresar", err);
        });
    },
  },
  modules: {},
});
