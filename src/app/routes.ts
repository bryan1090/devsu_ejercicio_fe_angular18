import {Route, Routes} from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoAgregarComponent } from './components/producto/producto-agregar/producto-agregar.component';

const routeConfig:Routes=[
{
    path:'',
    pathMatch:'full',
    redirectTo:'listar'
    
},
{
    path:'listar',
    component:ProductoComponent,
    title:'Banco'
},
{
    path:'agregar',
    component:ProductoAgregarComponent,
    title:'Agregar'
},
{
    path:'editar/:id',
    component:ProductoAgregarComponent,
    title:'Editar'
}
];

export default routeConfig;
