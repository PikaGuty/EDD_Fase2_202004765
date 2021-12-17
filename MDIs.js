class nodoC{
    constructor(dato){
        this.dato = dato;
        this.siguiente = null;
        this.anterior = null;
        this.listaInterna= new listaDatos();
    }
}

class NodoI{
    constructor(dato,valorF){
        this.dato=dato;
        this.valorF=valorF;
        this.siguiente=null;
        this.anterior=null;
    }
}

class Matriz{
    constructor(){
        this.Columnas=new ListaC();
    }

    insertar(Columna,Fila,Valor){
        let cabecera = this.Columnas.buscar(Columna)
        if (cabecera==null){
            cabecera=this.Columnas.insertar(Columna)
        }
        cabecera.listaInterna.insertar_datos(Valor,Fila)
        return null
    }

    mostrar(){
        this.Columnas.mostrar()
    }

    graficar(){
        this.Columnas.graficar()
    }

}

class ListaC{
    constructor(){
        this.primero=null
    }

    insertar(dato){
        let nuevo= new nodoC(dato)
        if (this.primero==null){
            this.primero=nuevo
            return nuevo
        }else{
            if (nuevo.dato<this.primero.dato){
                nuevo.siguiente=this.primero
                this.primero.anterior=nuevo
                this.primero=nuevo
                return nuevo
            }else{
                let aux=this.primero
                while(aux!=null){
                    if (nuevo.dato<aux.dato){
                        nuevo.siguiente=aux
                        nuevo.anterior=aux.anterior
                        aux.anterior.siguiente=nuevo
                        aux.anterior=nuevo
                        return nuevo
                    }else{
                        aux =aux.siguiente
                    }
                }
            }
            return null
        }
    }

    buscar(dato){
        let aux=this.primero
        while(aux!=null){
            if (aux.dato==dato){
                return aux
            }else{
                aux=aux.siguiente
            }
        }
        return null
    }

    mostrar(){
        let aux=this.primero
        
        while (aux!=null){
            
            console.log("Columna "+aux.dato)
            aux.listaInterna.mostrar_datos()
            aux=aux.siguiente
        }
        return null
    }
    graficar(){
        let aux=this.primero
        
        while (aux!=null){
            
            //console.log("Columna "+aux.dato)
            aux.listaInterna.graficar_datos(aux.dato)
            aux=aux.siguiente
        }
        return null
    }
}

class listaDatos{
    constructor(){
        this.primero=null;
    }

    insertar_datos(dato,fila){
        let nuevo= new NodoI(dato,fila)
        if (this.primero==null){
            this.primero=nuevo
        }else{
            if (nuevo.valorF<this.primero.valorF){
                nuevo.siguiente=this.primero
                this.primero.anterior=nuevo
                this.primero=nuevo
            }else{
                if(this.primero.siguiente==null){
                    nuevo.anterior=this.primero
                    this.primero.siguiente=nuevo
                    return nuevo
                }else{
                    let aux=this.primero
                    while(aux!=null){
                        if (nuevo.valorF<aux.valorF){
                            nuevo.siguiente=aux
                            nuevo.anterior=aux.anterior
                            aux.anterior.siguiente=nuevo
                            aux.anterior=nuevo
                            break
                        }else{
                            aux=aux.siguiente
                        }
                    }
                }
                return null
            }
        }
    }

    mostrar_datos(){
        let aux=this.primero
        while(aux!=null){
            console.log("   dato= "+aux.dato+", fila: "+aux.valorF)
            aux=aux.siguiente
        }
        return null
    }
    graficar_datos(Columna){
        let aux=this.primero
        while(aux!=null){
            console.log("\""+Columna+"c\"->"+aux.dato+";")
            console.log(aux.dato+"->\""+Columna+"c\";")
            console.log("\""+aux.valorF+"f\"->"+aux.dato+";")
            console.log(aux.dato+"->\""+aux.valorF+"f\";")
            aux=aux.siguiente
        }
        return null
    }
}

let m = new Matriz();

m.insertar(5,5,3)
m.insertar(1,5,7)
m.insertar(3,2,8)
m.insertar(1,1,9)
m.graficar()