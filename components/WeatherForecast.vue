<script setup lang="ts">
// Reactive variables
const lokasi = ref({
  provinsi: '',
  kota: '',
  kecamatan: '',
  desa: '',
})
const weatherData = ref<any[]>([])
const loading = ref(true)

// Function to fetch weather data
async function fetchWeatherData() {
  try {
    const response = await useNuxtApp().$axios.get('https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=11.73.01.2011') // Replace with your actual endpoint
    lokasi.value = response.data.lokasi
    weatherData.value = response.data.data.map((item: any) => item.cuaca)
  }
  catch (error) {
    console.error('Error fetching weather data:', error)
  }
  finally {
    loading.value = false
  }
}

// Fetch weather data on component mount
onMounted(() => {
  fetchWeatherData()
})
</script>

<template>
  <div>
    <!-- <pre>{{ weatherData[0] }}</pre> -->
    <h1>Weather Forecast</h1>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <h2 class="font-bold text-lg">
        {{ lokasi.provinsi }}, {{ lokasi.kota }}
      </h2>
      <h3 class="font-bold text-lg">
        {{ lokasi.kecamatan }}, {{ lokasi.desa }}
      </h3>
      <div v-for="(dataGroup, index) in weatherData[0]" :key="index" class="mt-5">
        <h4>Forecast for Time Slot {{ index + 1 }}</h4>
        <div v-for="(forecast, i) in dataGroup" :key="i" class="forecast">
          <p><strong>Date:</strong> {{ forecast.datetime }}</p>
          <p><strong>Temperature:</strong> {{ forecast.t }} °C</p>
          <p><strong>Weather:</strong> {{ forecast.weather_desc }}</p>
          <NuxtImg :src="forecast.image" alt="Weather Icon" />
          <p><strong>Wind Direction:</strong> {{ forecast.wd }} ({{ forecast.wd_deg }}°)</p>
          <p><strong>Wind Speed:</strong> {{ forecast.ws }} m/s</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.forecast {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
