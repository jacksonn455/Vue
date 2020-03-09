
<!-- Single file template que tmb é um módulo-->

<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <input
      type="search"
      class="filtro"
      v-on:input="filtro = $event.target.value"
      placeholder="filtre por parte do titulo"
    />
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="(foto, i) of fotosComFiltro" :key="i">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo" />
            <meu-botao 
            rotulo="remover" 
            tipo="button" 
            @botaoAtivado="remove(foto)"
            :confirmacao="true"
          
            />  <!--vbind-->
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<!-- Script - comportamento e o dado-->
<script>

import Painel from "../shared/painel/Painel.vue";
import ImageResponsiva from "../shared/imagem-responsiva/ImagemResponsiva";
import Botao from "../shared/botao/Botao.vue";
export default {
  components: {
    // chave com nome do compotenente
    "meu-painel": Painel // dando um seletor para um componente
  },

  data() {
    // fornece os dados que o template precisa, sempre retorna um objeto javascript

    return {
      titulo: "Alurapic",
      fotos: [],
      filtro: ""
    };
  },

  methods: {

    remove(foto) {
      alert('Remover a foto: ' + foto.titulo);
    }
  },

  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImageResponsiva,
    "meu-botao" : Botao
  },

  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        // é uma atalho para acessar o objeto da propriedade data
        let exp = new RegExp(this.filtro.trim(), "i"); // pega as letras do input (i == tanto faz se esta maiusculo ou minusculo)
        return this.fotos.filter(foto => exp.test(foto.titulo)); // retorna o array filtrado
      } else {
        return this.fotos;
      }
    }
  },

  created() {
    this.$http
      .get("http://localhost:3000/v1/fotos") // metodo get
      .then(res => res.json()) // quando os dados chegarem do servidor, eu pego os dados e converto pra json
      .then(
        fotos => (this.fotos = fotos),
        err => console.log(err)
      ); // quando acaba a converção, eu pego e vou jogar na propriedade fotos do objeto
  }
};
</script>


<!-- Style - estilo do template-->
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
