import Home from './components/home/Home.vue';
import Cadastro from './components/cadastro/Cadastro.vue';

export const routes = [

    { path: '', component: Home, titulo: 'Home' }, // path em branco equivale a ( localhost:3000/#/)
    { path: '/cadastro', component: Cadastro, titulo: 'Cadastro' }// uma rota é um objeto javascript com duas propriedades

];