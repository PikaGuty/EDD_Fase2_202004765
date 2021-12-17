class nodo{
    constructor(dato){
        this.dato = dato;
        this.siguiente = null;
        this.anterior = null;
    }
}

class listaD{
    constructor(){
        this.primero = null;
        this.dot=''
    }

    insertar(dato){
        let nuevo = new nodo(dato); 

        if(this.primero == null){ //la lista esta vacia
            this.primero = nuevo;
        }else{
            let aux = this.primero;
            let b=true
            while(aux.siguiente != null){
                if (dato==aux.dato){
                    b = false
                }
                aux = aux.siguiente;
            };
            if (b){
                aux.siguiente = nuevo;
                nuevo.anterior = aux;
            }else{
                console.log("El cliente con ID "+dato+" ya existe")
            }
            
        }
    }

    mostrar(){
        let aux = this.primero;
        console.log("********** Mostar Lista **********")
        let list=""
        let l = true
        while(aux != null){
            if (l){
                list+=aux.dato
                l=false
            }else{
                list+="<->"+aux.dato
            }
            
            aux = aux.siguiente;
        }
        console.log(list)
    }
    
    eliminar(valor){
        let aux = this.primero;
        let auxAnt, auxSig

        while(aux != null){
            if (valor==aux.dato){
                auxAnt=aux.anterior
                auxSig=aux.siguiente
            }
            aux = aux.siguiente;
        }
        if (auxAnt==null){ //Eliminar primero
            console.log("Primero")
            auxSig.anterior=null
            this.primero=auxSig
        }else if (auxSig==null){ //Eliminar ultimo
            console.log("Ultimo")
            auxAnt.siguiente=null
        }else{  //Eliminar enmedio
            console.log("Enmedio")
            auxAnt.siguiente=auxSig
            auxSig.anterior=auxAnt
        }
    }
    generar(){
        let aux = this.primero;
        
        let list=""
        let l = true
        this.dot+=this.primero.dato +' [color = green]'
        while(aux != null){
            if (aux.siguiente!=null){
                this.dot +=aux.dato +'->'+aux.siguiente.dato+';'
                this.dot +=aux.siguiente.dato +'->'+aux.dato+';'
            }
            
            aux = aux.siguiente;
        }
    }
}

let lista = new listaD();

lista.insertar(10);
lista.insertar(12);
lista.insertar(7);
lista.insertar(5);
lista.insertar(12);
lista.mostrar();
console.log("Eliminar")
lista.eliminar(12);
lista.mostrar();
//lista.generar();

/*function lista() {
    let lista = new listaD();
    lista.insertar(10);
    lista.insertar(12);
    lista.insertar(7);
    lista.insertar(5);
    lista.insertar(32);
    lista.insertar(65);
    lista.insertar(23);
    lista.insertar(2);

    //console.log("Eliminar")
    //lista.eliminar(12);
    lista.mostrar();
    
    lista.dot += '{'
    lista.generar()

    lista.dot += '}'
    console.log(lista.dot)

    let d ='graph grid    {        layout=dot        labelloc = "t"        node [shape=plaintext]        edge [weight=1000 style=dashed color=dimgrey]        A0 -- A1 -- A2         B0 -- B1 -- B2         C0 -- C1 -- C2   A0 -- B0 -- C0       A1 -- B1 -- C1        A2 -- B2 -- C2   }'

    return d
}*/
