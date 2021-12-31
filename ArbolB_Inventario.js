class nodoB{
    constructor(id, nombre, precio, cantidad){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.siguiente = null; 
        this.anterior = null;
        this.der = null;
        this.izq = null;
    }
}

class lista_nodoB{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.size=0;
    }

    insertar(nuevo){
        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
            this.size++;
            return true;
        }else{
            if(this.primero == this.ultimo){ 
                if(nuevo.id < this.primero.id){
                    nuevo.siguiente = this.primero;
                    this.primero.anterior = nuevo;
                    this.primero.izq = nuevo.der;

                    this.primero = nuevo;
                    this.size++;
                    return true;
                }else if(nuevo.id> this.ultimo.id){
                    this.ultimo.siguiente = nuevo;
                    nuevo.anterior = this.ultimo;
                    this.ultimo.der = nuevo.izq;

                    this.ultimo = nuevo;
                    this.size++;
                    return true;
                }else{ 
                    console.log("Ya existe el id: "+nuevo.id+" en la lista");
                    return false;
                }
            }else{ 
                if(nuevo.id < this.primero.id){
                    nuevo.siguiente = this.primero;
                    this.primero.anterior = nuevo;
                    this.primero.izq = nuevo.der;

                    this.primero = nuevo;
                    this.size++;
                    return true;
                }else if(nuevo.id> this.ultimo.id){
                    this.ultimo.siguiente = nuevo;
                    nuevo.anterior = this.ultimo;
                    this.ultimo.der = nuevo.izq;

                    this.ultimo = nuevo;
                    this.size++;
                    return true;
                }else{
                    let aux = this.primero;
                    while(aux != null){
                        if(nuevo.id < aux.id){
                            nuevo.siguiente = aux;
                            nuevo.anterior = aux.anterior;
                            aux.izq= nuevo.der;
                            aux.anterior.der = nuevo.izq;
                            aux.anterior.siguiente = nuevo;
                            aux.anterior = nuevo;
                            this.size++;
                            return true;
                        }else if(nuevo.id == aux.id){
                            console.log("Ya existe el id: "+nuevo.id+" en la lista");
                            return false;
                        }else{
                            aux = aux.siguiente;
                        }
                    }
                }
            }
        }
    }
}

class pagina{
    constructor(){
        this.raiz = false;
        this.claves_max = 4;
        this.claves_min = 2;
        this.size =0;
        this.claves = new lista_nodoB();
    }

    insPag(nodo){
        let auxx = this.claves
        //********* Recuperando Objeto **************
        this.claves = new lista_nodoB();
        Object.assign(this.claves,auxx)
        //*******************************************

        if(this.claves.insertar(nodo)){
            this.size = this.claves.size;
            if(this.size < 5){
                return this;
            }else if(this.size == 5){ 
                return this.dividir_pagina(this);
            }
        }
        return null;
    }

    dividir_pagina(pag){
        let temp = pag.claves.primero;
        for(var i=0; i<2;i++){
            temp = temp.siguiente;
        }

        let primero = pag.claves.primero;
        let segundo = pag.claves.primero.siguiente;
        let tercero = temp.siguiente;
        let cuarto = pag.claves.ultimo;

        primero.siguiente = null;
        primero.anterior = null;

        segundo.siguiente = null;
        segundo.anterior = null;

        tercero.siguiente = null;
        tercero.anterior = null;

        cuarto.siguiente = null;
        cuarto.anterior = null;

        temp.siguiente = null;
        temp.anterior = null;

        let pag_izquierda = new pagina();
        pag_izquierda.insPag(primero);
        pag_izquierda.insPag(segundo);

        let pag_dercha = new pagina();
        pag_dercha.insPag(tercero);
        pag_dercha.insPag(cuarto);

        temp.izq = pag_izquierda;
        temp.der = pag_dercha;

        return temp;
    }
   
}

class Arbol_B{
    constructor(){
        this.raiz = null;
        this.orden =5;
        this.altura =0;
        this.list=''
        this.buscado=0
        this.options=''
    }

    insertarN(id,nombre, precio, cantidad){
        let nuevo = new nodoB(id,nombre, precio, cantidad);
        
        let auxx = this.raiz
        //********* Recuperando Objeto **************
        this.raiz = new pagina()
        Object.assign(this.raiz,auxx)
        //*******************************************

        if(this.raiz == null){
            this.raiz = new pagina();
            this.raiz.raiz = true;
            this.raiz = this.raiz.insPag(nuevo);
        }else{
            if(this.altura==0){
                let respuesta = this.raiz.insPag(nuevo);
                if(respuesta instanceof pagina){
                    this.raiz = respuesta;
                }else{
                    this.altura++;
                    this.raiz = new pagina();
                    this.raiz = this.raiz.insPag(respuesta);
                }
            }else{ 
                if(this.raiz == null){
                    console.log("la raiz es null ")
                    return;
                }   
                let respuesta = this.insRecorrer(nuevo,this.raiz);
                if(respuesta instanceof nodoB){ 
                    this.altura++;
                    this.raiz = new pagina();
                    this.raiz = this.raiz.insPag(respuesta);
                }else if(respuesta instanceof pagina){
                    this.raiz = respuesta;
                }
            }
        }
    }

    insRecorrer(nuevo, pagina_actual){///////////////////////////////////////////////////////////////////////////////////
        let auxx = pagina_actual
        //********* Recuperando Objeto **************
        pagina_actual = new pagina()
        Object.assign(pagina_actual,auxx)
        //*******************************************

        if(pagina_actual.claves.primero.izq==null){
            let respuesta = pagina_actual.insPag(nuevo);
            return respuesta;
        }else{
            if(nuevo.id < pagina_actual.claves.primero.id){ 
                let respuesta = this.insRecorrer(nuevo,pagina_actual.claves.primero.izq);
                if(respuesta instanceof nodoB){
                    return pagina_actual.insPag(respuesta);
                }else if(respuesta instanceof pagina){
                    pagina_actual.claves.primero.izq = respuesta;
                    return pagina_actual;
                }
            }else if(nuevo.id > pagina_actual.claves.ultimo.id){ 
                let respuesta = this.insRecorrer(nuevo,pagina_actual.claves.ultimo.der);
                if(respuesta instanceof nodoB){
                    return pagina_actual.insPag(respuesta);
                }else if(respuesta instanceof pagina){
                    pagina_actual.claves.ultimo.der = respuesta;
                    return pagina_actual;
                }
            }else{ 
                let aux = pagina_actual.claves.primero;

                while(aux != null){
                    if(nuevo.id < aux.id){
                        let respuesta = this.insRecorrer(nuevo, aux.izq);
                        if(respuesta instanceof nodoB){ 
                            return pagina_actual.insPag(respuesta);
                        }else if(respuesta instanceof pagina){
                            aux.izq = respuesta;
                            aux.anterior.der = respuesta;
                            return pagina_actual;
                        }
                    }else if(nuevo.id == aux.id){
                        return pagina_actual;
                    }else{
                        aux = aux.siguiente;
                    }
                }
            }
        }
        return this;
    }

    recorrer(raiz_actual){
        
        let auxx = raiz_actual
        //********* Recuperando Objeto **************
        raiz_actual = new pagina()
        Object.assign(raiz_actual,auxx)
        //*******************************************
        if(raiz_actual.claves.primero.izq==null){
            let aux = raiz_actual.claves.primero;
            while(aux!=null){
                this.list += '<tr>'
                this.list += '<td>'+aux.id+'</td>'
                this.list += '<td>'+aux.nombre+'</td>'
                this.list += '<td>'+aux.precio+'</td>'
                this.list += '<td>'+aux.cantidad+'</td>'
                this.list += '</tr>'
                console.log(aux.id)
                aux= aux.siguiente;
            }
            return 
        }else{
            let aux = raiz_actual.claves.primero;
            while(aux!=null){
                this.list += '<tr>'
                this.list += '<td>'+aux.id+'</td>'
                this.list += '<td>'+aux.nombre+'</td>'
                this.list += '<td>'+aux.precio+'</td>'
                this.list += '<td>'+aux.cantidad+'</td>'
                this.list += '</tr>'
                console.log(aux.id)
                aux= aux.siguiente;
            }
            
            aux = raiz_actual.claves.primero;
            while(aux != null){
                this.recorrer(aux.izq);
                aux = aux.siguiente;
            }

            this.recorrer(raiz_actual.claves.ultimo.der);
            
            return 
        }   
    }

    obPrecio(raiz_actual,idProd){
        
        let auxx = raiz_actual
        //********* Recuperando Objeto **************
        raiz_actual = new pagina()
        Object.assign(raiz_actual,auxx)
        //*******************************************
        if(raiz_actual.claves.primero.izq==null){
            let aux = raiz_actual.claves.primero;
            while(aux!=null){
                if (idProd==aux.id){
                    this.buscado=parseFloat(aux.precio)
                }
                aux= aux.siguiente;
            }
            return 
        }else{
            let aux = raiz_actual.claves.primero;
            while(aux!=null){
                if (idProd==aux.id){
                    this.buscado=parseFloat(aux.precio)
                }
                aux= aux.siguiente;
            }
            
            aux = raiz_actual.claves.primero;
            while(aux != null){
                this.obPrecio(aux.izq,idProd);
                aux = aux.siguiente;
            }

            this.obPrecio(raiz_actual.claves.ultimo.der,idProd);
            
            return 
        }   
    }

    obProductos(raiz_actual){
        
        let auxx = raiz_actual
        //********* Recuperando Objeto **************
        raiz_actual = new pagina()
        Object.assign(raiz_actual,auxx)
        //*******************************************
        if(raiz_actual.claves.primero.izq==null){
            let aux = raiz_actual.claves.primero;
            while(aux!=null){
                this.options+="<option value=\""+aux.id+"\">"+aux.nombre+"</option>"
                aux= aux.siguiente;
            }
            return 
        }else{
            let aux = raiz_actual.claves.primero;
            while(aux!=null){
                this.options+="<option value=\""+aux.id+"\">"+aux.nombre+"</option>"
                aux= aux.siguiente;
            }
            
            aux = raiz_actual.claves.primero;
            while(aux != null){
                this.obProductos(aux.izq);
                aux = aux.siguiente;
            }

            this.obProductos(raiz_actual.claves.ultimo.der);
            
            return 
        }   
    }

    graficar(){
        let cadena="digraph ArbolB_Inventario{\n";
        cadena+="rankr=TB;\n";
        cadena+="node[shape = box, fillcolor=\"white\" color=\"black\" style=\"filled\"];\n";
        cadena+= this.graficar_nodos(this.raiz);
        cadena+=  this.graficar_enlaces(this.raiz);
        cadena+="}\n"

        return cadena;
    }

    graficar_nodos(raiz_actual){
        let cadena="";
        let auxx = raiz_actual
        //********* Recuperando Objeto **************
        raiz_actual = new pagina()
        Object.assign(raiz_actual,auxx)
        //*******************************************

        console.log(raiz_actual.claves)

        if(raiz_actual.claves.primero.izq==null){
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raiz_actual.claves.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+aux.id+"\\n"+aux.nombre+"\\n"+aux.cantidad+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raiz_actual.claves.primero.id+";\n";
            return cadena;
        }else{
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raiz_actual.claves.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+aux.id+"\\n"+aux.nombre+"\\n"+aux.cantidad+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raiz_actual.claves.primero.id+";\n";

            aux = raiz_actual.claves.primero;
            while(aux != null){
                cadena+= this.graficar_nodos(aux.izq);
                aux = aux.siguiente;
            }
            cadena+= this.graficar_nodos(raiz_actual.claves.ultimo.der);
            return cadena;
        }   
    }

    graficar_enlaces(raiz_actual){
        let cadena="";
        let auxx = raiz_actual
        //********* Recuperando Objeto **************
        raiz_actual = new pagina()
        Object.assign(raiz_actual,auxx)
        //*******************************************
        if(raiz_actual.claves.primero.izq==null){
            return ""+raiz_actual.claves.primero.id+";\n";
        }else{
            let aux = raiz_actual.claves.primero;
            let contador =0;
            let raiz_actual_txt = raiz_actual.claves.primero.id;
            while(aux != null){
                cadena+= "\n"+raiz_actual_txt+":p"+contador+"->"+this.graficar_enlaces(aux.izq);
                contador++;
                aux = aux.siguiente;
            }
            cadena+="\n"+raiz_actual_txt+":p"+contador+"->"+this.graficar_enlaces(raiz_actual.claves.ultimo.der);
            return cadena;
        }
    }
}

/*let arbol = new Arbol_B();
arbol.insertarN(5,"Leche", 25.00, 3);
arbol.insertarN(1,"Queso", 35.50, 30);
arbol.insertarN(7,"Tortrix barbacoa", 5.00, 500);
arbol.insertarN(3,"Tortrix picante", 5.00, 400);
arbol.insertarN(13,"Tortrix limon", 5.00, 550);
arbol.insertarN(8,"Doritos verdes", 5.00, 200);
arbol.insertarN(35,"Doritos rojos", 5.00, 230);
arbol.insertarN(14,"Doritos naranjas", 5.00, 430);
arbol.insertarN(10);
arbol.insertarN(9);
arbol.insertarN(12);
arbol.insertarN(17);
arbol.insertarN(22);
arbol.insertarN(25);
arbol.insertarN(11);

console.log(arbol.graficar());*/