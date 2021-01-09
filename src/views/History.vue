<template>
  <div class="history">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Día</th>
            <th class="text-left">Baja</th>
            <th class="text-left">Alta</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in history" :key="item.name">
            <td>{{ item.day }}</td>
            <td>{{ item.low }}</td>
            <td>{{ item.high }}</td>
            <td>{{ item.text }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      history: [],
    };
  },
  mounted() {
    axios
      .get(`http://localhost:8000/api/history/${this.$route.params.city}`)
      .then(rs => (
          (rs = rs.data),
          (this.history = rs)
        )
      );
  },
};
</script>