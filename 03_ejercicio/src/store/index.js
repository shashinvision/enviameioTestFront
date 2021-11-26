import { createStore } from "vuex";

export default createStore({
  state: {
    API: {
      baseURL: "https://gateway.marvel.com/v1/public/",
      ts: "ts=1000&",
      apikey: "apikey=dd68f89f37de666df8c69de23aabb6c8&",
      limit: "limit=10&",
      hash: "hash=3b750f471b1078e17963021a9937e915",
    },
    personajes: {},
  },
  mutations: {
    personajesMutation(state, payload) {
      console.log("respuesta Mutation Personajes", payload.data);

      state.personajes = payload.data;
    },
  },
  actions: {
    async personajesAction({ commit, state }, dataSignIn) {
      // console.log("signInAction", dataSignIn);

      await fetch(
        state.API.baseURL +
          "characters?" +
          state.API.limit +
          state.API.ts +
          state.API.apikey +
          state.API.hash,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(dataSignIn), // body data type must match "Content-Type" header
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((payload) => {
          console.log("respuesta Action Personajes", payload);

          commit("personajesMutation", payload);
        })
        .catch(function (err) {
          console.error("Error al intentar ingresar", err);
        });
    },
  },
  modules: {},
});
