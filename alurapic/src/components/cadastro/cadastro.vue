<template>

  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <form @submit.prevent="grava()"> <!-- serve para não recarregar a pagina -->
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input v-model.lazy="foto.titulo" id="titulo" autocomplete="off">
        <!-- v-model: os dados são atualizados por padrão a cada entrada de dados
         que realizarmos nos elementos de entrada do formulário.-->
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input v-model.lazy="foto.url" id="url" autocomplete="off"> <!-- lazy serve para carregar quando troca de campo -->
        <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/>
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea v-model.lazy="foto.descricao" id="descricao" autocomplete="off"></textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link to="/"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';
import Foto from '../../domain/foto/Foto';

export default {

  components: {

    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Botao
  },

  data() {
    return {

      foto: new Foto()
    }
  },

  methods: {

    grava() {

      this.$http
        .post('http://localhost:3000/v1/fotos', this.foto) // endereço e objeto
        .then(() => this.foto = new Foto(), err => console.log(err)); // se tudo corre bem
    }
  }
}

</script>
<style scoped>

  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

</style>