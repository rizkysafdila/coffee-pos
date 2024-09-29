export const useProductStore = defineStore('productStore', {
  state: (): {
    products: IProduct[]
    product: IProduct | null | undefined
    loading: boolean
  } => ({
    products: [],
    product: null,
    loading: false,
  }),
  actions: {
    async fetchAll(): Promise<void> {
      this.loading = true
      try {
        const { data: products } = await useNuxtApp().$axios.get('/products', {
          params: {
            populate: '*',
          },
          headers: {
            Authorization: 'Bearer ed68b9de06307b3cad9967da986210f9b40c12b825f0027f74dccddb25e8626bbe7f064134cd664796d40e4fc3acec3950d8bdde6e3521f7a7c4cb992c3da796b02e26881cbf0b89c7a133b6f5bc028b923f06228fb168afd246ed8a70f574e797954e0a0fbcb1c2cb31d61fcf7ae64ae66ff529ac6128ee19bfdbed302777d2',
          },
        })
        this.products = products.data

        return Promise.resolve(products.data)
      }
      catch (err) {
        return Promise.reject(err)
      }
      finally {
        this.loading = false
      }
    },

    FETCH_SINGLE_PRODUCT(id: number): void {
      this.product = this.products.find(product => product.id === id)
    },
  },
})
