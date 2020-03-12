import Home from './components/home/Home.vue';
import Cadastro from './components/cadastro/Cadastro.vue';

export const routes = [

    { path: '', name: 'home' ,component: Home, titulo: 'Home', menu: true }, // path em branco equivale a ( localhost:3000/#/)
    { path: '/cadastro', name: 'cadastro', component: Cadastro, titulo: 'Cadastro', menu: true },// uma rota é um objeto javascript com duas propriedades
    { path: '/cadastro/:id', name: 'altera', component: Cadastro, titulo: 'Cadastro', menu: false },// uma rota é um objeto javascript com duas propriedades
    { path: '*', component: Home, menu: false}
];