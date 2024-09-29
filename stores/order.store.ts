export const useOrderStore = defineStore('orderStore', {
  state: (): {
    orders: IOrder[]
    loading: boolean
  } => ({
    orders: [],
    loading: false,
  }),
  actions: {
    async fetchAll(): Promise<void> {
      this.loading = true
      try {
        const { data: orders } = await useNuxtApp().$axios.get('/orders', {
          params: {
            populate: '*',
          },
          headers: {
            Authorization: 'Bearer ed68b9de06307b3cad9967da986210f9b40c12b825f0027f74dccddb25e8626bbe7f064134cd664796d40e4fc3acec3950d8bdde6e3521f7a7c4cb992c3da796b02e26881cbf0b89c7a133b6f5bc028b923f06228fb168afd246ed8a70f574e797954e0a0fbcb1c2cb31d61fcf7ae64ae66ff529ac6128ee19bfdbed302777d2',
          },
        })
        this.orders = orders.data

        return Promise.resolve(orders.data)
      }
      catch (err) {
        return Promise.reject(err)
      }
      finally {
        this.loading = false
      }
    },

    async createOrder(data: any): Promise<void> {
      this.loading = true
      try {
        const response = await useNuxtApp().$axios.post('/orders', data, {
          headers: {
            Authorization: 'Bearer ed68b9de06307b3cad9967da986210f9b40c12b825f0027f74dccddb25e8626bbe7f064134cd664796d40e4fc3acec3950d8bdde6e3521f7a7c4cb992c3da796b02e26881cbf0b89c7a133b6f5bc028b923f06228fb168afd246ed8a70f574e797954e0a0fbcb1c2cb31d61fcf7ae64ae66ff529ac6128ee19bfdbed302777d2',
          },
        })

        return Promise.resolve(response.data)
      }
      catch (err) {
        return Promise.reject(err)
      }
      finally {
        this.loading = false
      }
    },

  },

})
