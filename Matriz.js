class nodo_interno{
    constructor(valor,x,y){
        this.valor = valor;
        this.x = x;
        this.y = y;
        //apuntadores
        this.sig = null;
        this.ant = null;

        this.arriba = null;
        this.abajo = null;
    }
}

class lista_interna{
    constructor(){
        this.primero = null;
    }

    insertar_x(valor, x,y){ //para las X usamos sig y ant, y el valor para compara y ordenar es Y
        let nuevo = new nodo_interno(valor,x,y);

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.y < this.primero.y){
                nuevo.sig = this.primero;
                this.primero.ant = nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.y < aux.y){
                        nuevo.sig = aux;
                        nuevo.ant = aux.ant;
                        aux.ant.sig = nuevo;
                        aux.ant= nuevo;
                        break;
                    }else if(nuevo.x == aux.x && nuevo.y == aux.y){
                        console.log("La posicion ya esta ocupada-> "+nuevo.x+","+nuevo.y);
                        break;
                    }else{
                        if(aux.sig ==null){
                            aux.sig=nuevo;
                            nuevo.ant = aux;
                            break;
                        }else{
                            aux = aux.sig;
                        }
                    }
                }
            }
        }
    }

    insertar_y(valor, x,y){ //para las Y usamos arriba y abajo, y el valor para compara y ordenar es X
        let nuevo = new nodo_interno(valor,x,y);

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.x < this.primero.x){
                nuevo.abajo = this.primero;
                this.primero.arriba = nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.x < aux.x){
                        nuevo.abajo = aux;
                        nuevo.arriba = aux.arriba;
                        aux.arriba.abajo = nuevo;
                        aux.arriba= nuevo;
                        break;
                    }else if(nuevo.x == aux.x && nuevo.y == aux.y){
                        console.log("La posicion ya esta ocupada-> "+nuevo.x+","+nuevo.y);
                        break;
                    }else{
                        if(aux.abajo ==null){
                            aux.abajo=nuevo;
                            nuevo.arriba = aux;
                            break;
                        }else{
                            aux = aux.abajo;
                        }
                    }
                }
            }
        }
    }

    recorrer_x(){
        let aux = this.primero;
        while(aux != null){
            console.log("valor =",aux.valor," - x = ",aux.x , " y = ",aux.y);
            aux = aux.sig;
        }
    }
    recorrer_y(){
        let aux = this.primero;
        while(aux != null){
            console.log("valor =",aux.valor," - x = ",aux.x , " y = ",aux.y);
            aux = aux.abajo;
        }
    }
}

//**************************** CABECERAS ************************/
class nodo_cabecera{
    constructor(dato){
        this.dato = dato;
        this.sig= null;
        this.ant = null;
        this.lista_interna = new lista_interna();
    }
}

class lista_cabecera{
    constructor(){
        this.primero = null;
    }

    insertar_cabecera(nuevo){

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.dato<this.primero.dato){
                nuevo.sig = this.primero;
                this.primero.ant=nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.dato < aux.dato){
                        nuevo.sig = aux;
                        nuevo.ant = aux.ant;
                        aux.ant.sig = nuevo;
                        aux.ant = nuevo;
                        break;
                    }else{
                        if(aux.sig == null){
                            aux.sig = nuevo;
                            nuevo.ant = aux;
                            break;
                        }else{
                            aux = aux.sig;
                        }
                    }
                }
            }
        }
    }

    buscar_cabecera(dato){
        let aux = this.primero;
        while(aux != null){
            if(aux.dato == dato){
                return aux;
            }else{
                aux = aux.sig;
            }
        }
        return null;
    }

    recorrer(){
        let aux = this.primero;
        while(aux != null){
            console.log("dato =",aux.dato);
            aux = aux.sig;
        }
    }
}

//**************************** Matriz ************************/
class matriz{
    constructor(){
        this.cabecetas_x = new lista_cabecera();
        this.cabecetas_y = new lista_cabecera();
    }

    insertar(valor,x,y){
        let nodo_cabecera_X = this.cabecetas_x.buscar_cabecera(x);
        let nodo_cabecera_y = this.cabecetas_y.buscar_cabecera(y);

        if(nodo_cabecera_X == null){
            nodo_cabecera_X =  new nodo_cabecera(x);
            this.cabecetas_x.insertar_cabecera(nodo_cabecera_X);
        }

        if(nodo_cabecera_y == null){
            nodo_cabecera_y =  new nodo_cabecera(y);
            this.cabecetas_y.insertar_cabecera(nodo_cabecera_y);
        }

        //insertar en cabecera X
        nodo_cabecera_X.lista_interna.insertar_x(valor,x,y);
        //insertar en cabecera Y
        nodo_cabecera_y.lista_interna.insertar_y(valor,x,y);
    }

    recorrer_matriz(){
        console.log("cabeceras en X");
        let aux = this.cabecetas_x.primero;
        while(aux != null){
            console.log("   pos->"+aux.dato);
            let aux2 = aux.lista_interna.primero;
            while(aux2!= null){
                console.log("       -"+aux2.valor);
                aux2 = aux2.sig;
            }
            aux = aux.sig;
        }

        console.log("cabeceras en Y");
        aux = this.cabecetas_y.primero;
        while(aux != null){
            console.log("   pos->"+aux.dato);
            let aux2 = aux.lista_interna.primero;
            while(aux2!= null){
                console.log("       -"+aux2.valor);
                aux2 = aux2.abajo;
            }
            aux = aux.sig;
        }
    }

    graficar_matriz(){
        let cadena="";
        cadena+= 'digraph Matriz{ \n';
        cadena+= 'node [shape=box];\n';
        //Nodo matriz
        cadena+='Mt[ label = "Matriz", width = 1.5, group = 1 ];\n'
        //Y
        let aux_y = this.cabecetas_y.primero;
        while(aux_y!=null){
            cadena+='U'+aux_y.dato.replace(':',"")+' [label = "'+aux_y.dato+'"    width = 1.5  group = 1 ];\n'
            aux_y = aux_y.sig;
        }
        aux_y = this.cabecetas_y.primero;
        while(aux_y.sig != null){
            cadena+='U'+aux_y.dato.replace(':',"")+'->'+'U'+aux_y.sig.dato.replace(':',"")+';\n'
            cadena+='U'+aux_y.sig.dato.replace(':',"")+'->'+'U'+aux_y.dato.replace(':',"")+';\n'
            aux_y = aux_y.sig;
        }

        if(this.cabecetas_x.primero!= null){
            cadena+='Mt->U'+this.cabecetas_y.primero.dato.replace(":","")+';\n';
        }

        //X
        let aux_x = this.cabecetas_x.primero;
        while(aux_x!=null){ 
            cadena+='A'+aux_x.dato+' [label = '+aux_x.dato+'   width = 1.5  group = '+aux_x.dato+' ];\n'
            aux_x = aux_x.sig;
        }
        aux_x = this.cabecetas_x.primero;
        while(aux_x.sig != null){
            cadena+='A'+aux_x.dato+'->'+'A'+aux_x.sig.dato+';\n'
            cadena+='A'+aux_x.sig.dato+'->'+'A'+aux_x.dato+';\n'
            aux_x = aux_x.sig;
        }

        if(this.cabecetas_x.primero!= null){
            cadena+='Mt->A'+this.cabecetas_x.primero.dato+';\n';
        }

        cadena+='{ rank = same; Mt;'
        aux_x = this.cabecetas_x.primero;
        while(aux_x != null){
            cadena+='A'+aux_x.dato+'; '
            aux_x = aux_x.sig;
        }
        cadena+='}\n'
        
        aux_x = this.cabecetas_x.primero;
        while(aux_x!=null){ 
            let aux = aux_x.lista_interna.primero;
            while(aux!=null){
                cadena+='A'+aux.x+'_U'+aux.y.replace(':',"")+' [label = "'+aux.valor+'" width = 1.5, group = '+aux.x+' ];\n'
                aux = aux.sig;
            }

            
            aux = aux_x.lista_interna.primero;
            while(aux.sig!= null){
                cadena+='A'+aux.x+'_U'+aux.y.replace(':',"")+'->A'+aux.sig.x+'_U'+aux.sig.y.replace(':',"")+';\n';
                cadena+='A'+aux.sig.x+'_U'+aux.sig.y.replace(':',"")+'->A'+aux.x+'_U'+aux.y.replace(':',"")+';\n';
                aux= aux.sig;
            }
            if(aux_x.lista_interna.primero!= null){
                cadena+='A'+aux_x.dato+'->'+'A'+aux_x.lista_interna.primero.x+'_U'+aux_x.lista_interna.primero.y.replace(':',"")+';\n';
            }

            aux_x = aux_x.sig;
        }

        aux_y = this.cabecetas_y.primero;
        while(aux_y!=null){ 
            let aux = aux_y.lista_interna.primero;
            let nodos = ''
            let nfila = ''
            while(aux.abajo!= null){
                cadena+='A'+aux.x+'_U'+aux.y.replace(':',"")+'->A'+aux.abajo.x+'_U'+aux.abajo.y.replace(':',"")+';\n';
                cadena+='A'+aux.abajo.x+'_U'+aux.abajo.y.replace(':',"")+'->A'+aux.x+'_U'+aux.y.replace(':',"")+';\n';
                nodos+='A'+aux.x+'_U'+aux.y.replace(':','')+';'
                aux= aux.abajo;
            }
            if(aux_y.lista_interna.primero!= null){
                nfila = 'U'+aux_y.dato.replace(':',"")+';'
                nodos+='A'+aux.x+'_U'+aux.y.replace(':','')+'; '
                cadena+='U'+aux_y.dato.replace(':',"")+'->'+'A'+aux_y.lista_interna.primero.x+'_U'+aux_y.lista_interna.primero.y.replace(':',"")+';\n';
            }
            aux_y = aux_y.sig;

            cadena+='{ rank = same; '+nfila+' '+nodos+'}\n'

        }

        cadena+="}"
        console.log(cadena);
    }
}


/*let matriz1 = new matriz();

matriz1.insertar("Comida",3,"12:00");
matriz1.insertar("Comida",3,"11:00");
matriz1.insertar("Comida",4,"15:00");
matriz1.insertar("Comida",5,"13:00");
matriz1.insertar("Comida",4,"11:00");
matriz1.insertar("Comida",5,"15:00");
matriz1.insertar("Comida",3,"13:00");
matriz1.insertar("Comida",10,"13:00");


matriz1.recorrer_matriz();
matriz1.graficar_matriz();*/


