<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title
        ><router-link to="/">Weather</router-link>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer padless app>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Daniel Ortegón</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>
