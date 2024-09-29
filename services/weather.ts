const BASE_URL = 'https://api.bmkg.go.id/publik/prakiraan-cuaca'

export async function fetchWeather(adm4: string) {
  try {
    const response = await useNuxtApp().$axios.get(BASE_URL, {
      params: {
        adm4,
      },
    })
    return response.data // Return the entire data object or modify based on your needs
  }
  catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}
