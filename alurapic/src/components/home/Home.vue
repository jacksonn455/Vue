<template>
  <div>
    <h1 class="centralizado">Alurapic</h1>

    <!-- novo elemento para exibir mensagens para o usuário -->
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

    <input
      type="search"
      class="filtro"
      @input="filtro = $event.target.value"
      placeholder="filtre pelo título da foto"
    />
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva
            :url="foto.url"
            :titulo="foto.titulo"
            v-meu-transform:scale.animate="1.2"
          />
          <meu-botao
            rotulo="remover"
            tipo="button"
            estilo="perigo"
            :confirmacao="true"
            @botaoAtivado="remove(foto)"
          />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
import FotoService from "../../domain/foto/FotoService";

export default {
  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao
  },

  data() {
    return {
      fotos: [],

      filtro: "",

      mensagem: ""
    };
  },

  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), "i");
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },

  methods: {

    remove(foto) {

      this.service
        .apaga(foto._id)
        .then(
          () => {
            let indice = this.fotos.indexOf(foto);
            this.fotos.splice(indice, 1);
            this.mensagem = 'Foto removida com sucesso'
          }, 
          err => {
            this.mensagem = 'Não foi possível remover a foto';
            console.log(err);
          }
        )
    }

  },

  created() {

    // criando uma instância do nosso serviço que depende de $resource
    this.service = new FotoService(this.$resource);

    this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => console.log(err));
  }
}
</script>
<style>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>