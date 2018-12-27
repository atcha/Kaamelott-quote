<template>
  <q-page class="flex flex-center">
    <div class="container" v-if="quote">
      <div class="loader" v-if="isLoading">
        <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle class="length" fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="28"></circle>
        </svg>
      </div>
      <div class="quote-container" v-if="!isLoading">
        <h2>{{author}}</h2>
        <p><i>{{quote}}</i></p>
        <img :src="picture">
      </div>
      <q-input
        class="input-author"
        v-model="authorName"
        stack-label="Nom d'un personnage"
      />
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
      authorName: '',
      author: '',
      quote: '',
      picture: '',
      isLoading: true,
      error: ''
    }
  },
  mounted () {
    this.loadQuote()
  },
  methods: {
    loadQuote () {
      this.isLoading = true
      if (this.authorName.length > 0) {
        this.$axios
          .get('/api/getquote/author/' + this.authorName)
          .then((response) => {
            console.log(response)
            if (response.data.status === 404) {
              this.$q.notify({
                message: 'Personnage non trouvé',
                type: 'negative'
              })
            } else {
              this.author = response.data.author.name
              this.quote = response.data.quote.text
              this.picture = response.data.author.iconUrl
            }
            this.isLoading = false
          })
      } else {
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
}
</script>
<style scoped>
  h2 {
    margin-top: 15px;
    margin-bottom: 10px;
  }
  .container {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .quote-container img {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
  }
  .btn-quote, input-author { margin-top: 15px; }

  /**
   * Loader SVG
   */
  .loader {
    margin: auto;
    width: 66px;
    height: 66px;
    -webkit-animation: contanim 2s linear infinite;
    animation: contanim 2s linear infinite;
  }
  svg {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    -webkit-transform: rotate(-90deg);
    transform: rotate(-90deg);
  }
  svg:nth-child(1) circle {
    stroke: #333841;
    stroke-dasharray: 1, 300;
    stroke-dashoffset: 0;
    -webkit-animation: strokeanim 3s calc(.2s * (1)) ease infinite;
    animation: strokeanim 3s calc(.2s * (1)) ease infinite;
    -webkit-transform-origin: center center;
    transform-origin: center center;
  }

  @-webkit-keyframes strokeanim {
    0% {
      stroke-dasharray: 1, 300;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 120, 300;
      stroke-dashoffset: -58.548324585;
    }
    100% {
      stroke-dasharray: 120, 300;
      stroke-dashoffset: -175.6449737549;
    }
  }

  @keyframes strokeanim {
    0% {
      stroke-dasharray: 1, 300;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 120, 300;
      stroke-dashoffset: -58.548324585;
    }
    100% {
      stroke-dasharray: 120, 300;
      stroke-dashoffset: -175.6449737549;
    }
  }
  @-webkit-keyframes contanim {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes contanim {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
