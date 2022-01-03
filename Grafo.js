class nodoGrafo{
    constructor(id,nombre){
        this.id = id;
        this.nombre = nombre
        this.siguiente = null;
        this.anterior = null;
        this.ponderacion=0;
        this.adyasentes = new lista_adyasentes();
        this.etiqueta = null;
    }
}

class lista_adyasentes{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    insertar(id,nombre,p){
        let nuevo = new nodoGrafo(id,nombre);
        nuevo.ponderacion = p;
        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
        }else{
            if(this.primero == this.ultimo){
                this.primero.siguiente = nuevo;
                nuevo.anterior = this.primero;
                this.ultimo = nuevo;
            }else{
                nuevo.anterior = this.ultimo;
                this.ultimo.siguiente = nuevo;
                this.ultimo= nuevo;
            }
        }
    }
}

class grafo{
    constructor(){
        this.primero= null;
        this.ultimo = null;
    }

    insertar(id,nombre){
        let nuevo = new nodoGrafo(id,nombre);

        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
        }else{
            if (this.buscar(id)==null){
                if(this.primero == this.ultimo){
                    this.primero.siguiente = nuevo;
                    nuevo.anterior = this.primero;
                    this.ultimo = nuevo;
                }else{
                    nuevo.anterior = this.ultimo;
                    this.ultimo.siguiente = nuevo;
                    this.ultimo= nuevo;
                }
            }
            
        }
    }

    buscar(id){
        let aux = this.primero;
        while(aux != null){
            if(aux.id == id){
                return aux;
            }else{
                aux = aux.siguiente;
            }
        }
        console.log("No se encontro")
        return null;
    }

    agregar_adyacente(id,id_adyacente,nombre,ponderacion){
        let principal = this.buscar(id);
        console.log(principal)
        let auxx = principal.adyasentes
        //********* Recuperando Objeto **************
        principal.adyasentes = new lista_adyasentes()
        Object.assign(principal.adyasentes,auxx)
        //*******************************************


        if(principal != null){
            principal.adyasentes.insertar(id_adyacente,nombre,ponderacion);
        }else{
            console.log("no existe el nodo origen")
        }
    }

    Cruta(nodo_Inicial,NodoFinal){
        let NodoI=this.buscar(nodo_Inicial)
        
        let auxx = NodoI
        while(auxx != null){
            auxx.etiqueta = null
            auxx = auxx.siguiente;
        }
        console.log("NodoI "+NodoI.id+' '+NodoI.nombre+' '+NodoI.adyasentes)
        NodoI.etiqueta = {"dis":0,"ant":null,"iter":0}
        let aux = NodoI
        let recorridos= []
        while(aux != null){
            let aux2 = aux.adyasentes.primero; 
            recorridos.push(aux.id)
            while(aux2 != null){
                if (!recorridos.includes(aux2.id)){
                    let ac = this.buscar(aux2.id)
                    console.log(ac.etiqueta+">"+(aux2.ponderacion+aux.etiqueta.dis))
                    if (ac.etiqueta==null){
                        ac.etiqueta = {"dis":(aux2.ponderacion+aux.etiqueta.dis),"ant":aux.id,"iter":aux.etiqueta.iter+1}
                    }else if (ac.etiqueta.dis>(aux2.ponderacion+aux.etiqueta.dis)){
                        ac.etiqueta = {"dis":(aux2.ponderacion+aux.etiqueta.dis),"ant":aux.id,"iter":aux.etiqueta.iter+1}
                    }
                }
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }

        let NFinal = this.buscar(NodoFinal)
        let reco = []
        while (NFinal.etiqueta.ant != null){
            reco.unshift(NFinal.id)
            NFinal = this.buscar(NFinal.etiqueta.ant)
        }
        reco.unshift(NodoI.id)
        console.log(reco)
        return reco
    }

    mostrar(){
        let aux = this.primero;
        while(aux != null){
            console.log(aux.id+" -> "+aux.etiqueta.dis+' '+aux.etiqueta.ant+' '+aux.etiqueta.iter);
            /*let aux2 = aux.adyasentes.primero;
            while(aux2 != null){
                console.log("   -"+aux2.id);
                aux2 = aux2.siguiente;
            }*/
            aux = aux.siguiente;
        }
    }

    
    obtener(){
        let aux = this.primero;
        let options = ''
        while(aux != null){
            options += "<option value=\""+aux.id+"\">"+aux.nombre+"</option>"
            console.log("-> "+aux.id);
            aux = aux.siguiente;
        }
        return options
    }

    graficar(){
        let cadena= "digraph Rutas {\nrankdir=\"LR\" \n"
        cadena += "node[shape = box];\n";
        let aux = this.primero;
        while(aux != null){
            cadena+="n"+aux.id+"[label= \""+aux.id+"\\n"+aux.nombre+"\"];\n"
            aux = aux.siguiente;
        }
        
        aux = this.primero;
        while(aux != null){
            let aux2 = aux.adyasentes.primero;
            while(aux2 != null){
                cadena+= "n"+aux.id+" -> n"+aux2.id+" [label=\""+aux2.ponderacion+"km\"]; \n";
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
        cadena += "}"
        return cadena;
    }

    graficarL(l){
        let cadena= "digraph Rutas {\nrankdir=\"LR\" \n"
        cadena += "node[shape = box];\n";
        let aux = this.primero;
        while(aux != null){
            if(l.includes(aux.id)){
                cadena+="n"+aux.id+"[label= \""+aux.id+"\\n"+aux.nombre+"\" color=\"red\"];\n"
            }else{
                cadena+="n"+aux.id+"[label= \""+aux.id+"\\n"+aux.nombre+"\"];\n"
            }
            
            aux = aux.siguiente;
        }
        
        aux = this.primero;
        while(aux != null){
            let aux2 = aux.adyasentes.primero;
            while(aux2 != null){
                if(l.includes(aux.id)&&l.includes(aux2.id)){
                    cadena+= "n"+aux.id+" -> n"+aux2.id+" [label=\""+aux2.ponderacion+"km\" color=\"red\"]; \n";
                }else
                    cadena+= "n"+aux.id+" -> n"+aux2.id+" [label=\""+aux2.ponderacion+"km\"]; \n";
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
        cadena += "}"
        return cadena;
    }
}

/*let grafoo = new grafo();
grafoo.insertar(4,"Bodega1");
grafoo.insertar(6,"Bodega2");
grafoo.insertar(9,"Bodega3");
grafoo.insertar(11,"Bodega4");
grafoo.insertar(7,"Bodega5");
grafoo.insertar(10,"Bodega6");

grafoo.agregar_adyacente(4,6,"Bodega2",5);

grafoo.agregar_adyacente(6,9,"Bodega3",2);
grafoo.agregar_adyacente(9,6,"Bodega2",2);

grafoo.agregar_adyacente(7,9,"Bodega3",4);
grafoo.agregar_adyacente(9,7,"Bodega5",4);

grafoo.agregar_adyacente(4,10,"Bodega6",4);
grafoo.agregar_adyacente(10,4,"Bodega1",4);

grafoo.agregar_adyacente(9,11,"Bodega4",9);
grafoo.agregar_adyacente(11,9,"Bodega3",9);

grafoo.agregar_adyacente(10,11,"Bodega4",1);
grafoo.agregar_adyacente(11,10,"Bodega6",1);

grafoo.agregar_adyacente(7,10,"Bodega6",8);
grafoo.agregar_adyacente(10,7,"Bodega5",8);

grafoo.agregar_adyacente(6,11,"Bodega4",6);
grafoo.agregar_adyacente(11,6,"Bodega2",6);

grafoo.graficar();*/