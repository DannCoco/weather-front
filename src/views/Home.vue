<template>
  <div class="home">
    <v-row>
      <v-col cols="12" sm="4" md="3">
        <v-card>
          <v-list>
            <v-list-item-group v-model="model">
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click="getWeather(item)"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" md="9">
        <v-card :loading="loading">
          <template slot="progress">
            <v-progress-linear
              color="blue"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-card-title
            >La humedad para {{ nameCity }} es de {{ humidity }}º</v-card-title
          >
          <gmap-map :center="center" :zoom="8" style="width: 100%; height: 400px">
            <gmap-marker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              @click="center = m.position"
            ></gmap-marker>
          </gmap-map>
          <v-card-actions>
            <v-btn color="primary" @click="goToHistory">
              Consulta el Histórico
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    markers: [{position: { lat: 45.508, lng: -73.587 }}],
    center: { lat: 45.508, lng: -73.587 },
    nameCity: "------",
    humidity: "-",
    loading: false,
    items: [
      {
        icon: "mdi-map-clock",
        text: "Miami",
        city: "miami",
      },
      {
        icon: "mdi-map-clock",
        text: "Orlando",
        city: "orlando",
      },
      {
        icon: "mdi-map-clock",
        text: "New York",
        city: "new york",
      },
    ],
    model: 0,
  }),
  methods: {
    getWeather(item) {
      this.humidity = "-";
      this.nameCity = "------";
      this.loading = true;

      axios.get(`http://localhost:8000/api/weather/${item.city}`).then(rs => (
          (rs = rs.data),
          (this.humidity = rs.humidity),
          (this.nameCity = item.text),
          (this.markers = [{position: { lat: rs.lat, lng: rs.long }}]),
          (this.center = { lat: rs.lat, lng: rs.long }),
          (this.loading = false)
        )
      );
    },
    goToHistory() {
      this.$router.push({
        name: "History",
        params: { city: this.items[this.model].city },
      });
    },
  },
  mounted() {
    const firstItem = this.items[this.model];
    this.getWeather(firstItem);
  },
};
</script>
