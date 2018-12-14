<template>
  <q-page class="flex flex-center">
    <div class="quote-container" v-if="quote">
      <h2>{{author}}</h2>
      <p><i>{{quote}}</i></p>
      <img :src="picture">
      <q-btn
        class="btn-quote"
        color="secondary"
        label="Charger une autre citation"
        @click="loadQuote"
      />
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data: function () {
    return {
      author: '',
      quote: '',
      picture: '',
      isLoading: true
    }
  },
  mounted () {
    this.loadQuote()
  },
  methods: {
    loadQuote () {
      this.isLoading = true
      this.$axios
        .get('/api/getquote')
        .then((response) => {
          console.log(response)
          this.author = response.data.author.name
          this.quote = response.data.quote.text
          this.picture = response.data.author.iconUrl
          this.isLoading = false
        })
    }
  }
}
</script>
<style scoped>
  .quote-container {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .quote-container img {
    width: 100%;
    height: auto;
  }
  .btn-quote { margin-top: 15px; }
</style>
