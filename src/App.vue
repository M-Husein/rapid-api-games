<script lang="ts">
import { ref, onMounted } from 'vue'

export default {
  setup(){
    const latestGame = ref<Array<any>>([]);
    const loadingFetch = ref<boolean>(true);
    const errorFetch = ref<any>(null);

    onMounted(async () => {
      try {
        const fetchData = await fetch(
          'https://free-to-play-games-database.p.rapidapi.com/api/games',
          {
            headers: {
              'X-RapidAPI-Key': '6ca948ceb7msh426f11ced47c1b7p13741cjsnf6f65942f5df',
              'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
          }
        );
        const json = await fetchData.json();

        latestGame.value = json;
      } catch(e) {
        errorFetch.value = e;
      } finally {
        loadingFetch.value = false;
      }
    })

    return {
      latestGame,
      loadingFetch,
      errorFetch,
    }
  }
}
</script>

<template>
  <header class="bg-white p-4 sticky top-0 z-10 shadow h-74">
    <nav class="max-w-5xl mx-auto flex">
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="40" height="40" />
      <div class="ml-auto">

      </div>
    </nav>
  </header>

  <main>
    <div class="grid place-content-center text-center text-white bg-gray-500 min-h-[calc(100vh-74px)]">
      <div class="max-w-md">
        <h1 class="mb-4 text-[32px]">Pilih Game Favorite Kalian</h1>
        <p class="mb-4">
          Shortbread cookie tootsie roll sugar plum cheesecake pudding croissant apple pie. Lollipop macaroon lollipop croissant chocolate cake croissant fruitcake brownie jelly-o.
        </p>
        <a href="/" class="bg-blue-500 hover_bg-blue-600 text-white cursor-pointer py-2 px-3 rounded inline-block">
          Sign Up For Free Account
        </a>
      </div>
    </div>

    <div class="max-w-5xl mx-auto">
      <div class="flex justify-between py-8">
        <h2 class="text-2xl font-medium">Game Terbaru</h2>
        <select class="py-1 px-2 block rounded border border-gray-300">
          <option>Semua Genre</option>
        </select>
      </div>

      <section class="flex flex-wrap flex-row gap-6">
        <div v-if="errorFetch" class="bg-red-100 text-center p-4 rounded">
          Something when wrong.
        </div>

        <div v-if="loadingFetch">
          Loading
        </div>
        <article
          v-else
          v-for="game in latestGame"
          :key="game.id"
          class="bg-white shadow-sm rounded-md p-2 pb-3 lg_w-[calc(100%/3-1rem)]"
        >
          <img
            loading="lazy"
            decoding="async"
            draggable="false"
            class="aspect-video w-full object-cover rounded-md"
            :src="game.thumbnail"
            :alt="game.title"
          />
          <h1 class="my-4 text-xl">{{ game.title }}</h1>
          <p class="line-clamp-2" :title="game.short_description">{{ game.short_description }}</p>
          <hr class="border-gray-200 my-4">
          <div class="flex flex-row">
            <div class="grow">
              <h2 class="text-gray-400 text-sm">Platform</h2>
              <p>{{ game.platform }}</p>
            </div>
            <div class="grow">
              <h2 class="text-gray-400 text-sm">Release Date</h2>
              <p>{{ game.release_date }}</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  </main>
</template>
