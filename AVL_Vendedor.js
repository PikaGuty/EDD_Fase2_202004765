class nodo_avl{
    constructor(id, nombre, edad, correo, pass){
        this.id=id;
        this.nombre=nombre;
        this.edad=edad;
        this.correo=correo;
        this.pass=pass;
        this.clientes=new listaD();
        this.calendario= new listaM();
        this.izq=null;
        this.der=null;
        this.altura=null;
    }
}
class arbol_avl{
    constructor(){
        this.raiz = null;
        this.listaa = null;
    }
    insertar(id, nombre, edad, correo, pass){
        let nuevo = new nodo_avl(id, nombre, edad, correo, pass);
        
        if(this.raiz==null){
            this.raiz=nuevo;
        }else{
            this.raiz=this.insertarNodo(this.raiz,nuevo)
        }
    }

    insertarNodo(raizA,nuevo){
        if (raizA!=null){
            if(raizA.id > nuevo.id){
                raizA.izq = this.insertarNodo(raizA.izq,nuevo)
                if(this.altura(raizA.der)-this.altura(raizA.izq)==-2){ //Rotacion I
                    //console.log("Rotacion Izquierda")
                    if(nuevo.id<raizA.izq.id){
                        //console.log("Rotacion Izquierda Izquierda")
                        raizA=this.RIzq(raizA)
                    }else{
                        //console.log("Rotacion Izquierda Derecha")
                        raizA=this.RIzqD(raizA)
                    }
                }
            }else if(raizA.id < nuevo.id){
                raizA.der = this.insertarNodo(raizA.der,nuevo)
                if(this.altura(raizA.der)-this.altura(raizA.izq)==2){ //Rotacion D
                    //console.log("Rotacion Derecha")
                    if(nuevo.id>raizA.der.id){
                        ///console.log("Rotacion Derecha Derecha")
                        raizA=this.RDer(raizA)
                    }else{
                        //console.log("Rotacion Derecha Izquierda")
                        raizA=this.RDerI(raizA)
                    }
                }
            }else{
                alert("Ya existe un Vendedor con ID = "+nuevo.id);
                console.log("Ya existe un Vendedor con ID = "+nuevo.id);
            }
            raizA.altura = this.alturaM(this.altura(raizA.der),this.altura(raizA.izq))+1;
            return raizA
        }else{
            raizA=nuevo;
            //console.log('Ingresado '+nuevo.id)
            return raizA
        }
    }

    altura(nodo){
        if(nodo != null){
            return nodo.altura;
        }else{
            return -1;
        }
    }

    alturaM(h1,h2){
        if(h2>=h1){ 
            return h2;
        }else{
            return h1;
        }
    }

    RIzq(nodo){
        let aux = nodo.izq;
        nodo.izq= aux.der;
        aux.der = nodo;
        nodo.altura = this.alturaM(this.altura(nodo.der),this.altura(nodo.izq)) +1;
        aux.altura = this.alturaM(nodo.altura.altura,this.altura(nodo.izq))+1;
        return aux;
    }

    RDer(nodo){
        let aux = nodo.der;
        nodo.der= aux.izq;
        aux.izq = nodo;
        nodo.altura = this.alturaM(this.altura(nodo.izq),this.altura(nodo.der)) +1;
        aux.altura = this.alturaM(nodo.altura.altura,this.altura(nodo.der))+1;
        return aux;
    }

    RIzqD(nodo){
        nodo.izq = this.RDer(nodo.izq);
        let aux = this.RIzq(nodo);
        return aux;
    }

    RDerI(nodo){
        nodo.der = this.RIzq(nodo.der);
        let aux = this.RDer(nodo);
        return aux;
    }

    PreOrder(raizA){
        if(raizA != null){
            console.log(raizA.id+' '+raizA.nombre);
            this.PreOrder(raizA.izq);
            this.PreOrder(raizA.der);
        }
    }

    eliminar(id,raizAc,raiz,raizAn){
        if (raizAc!=null){
            if (raizAc.id==id){
                
                let listaaaa = new listaAux();
                this.listaa=JSON.stringify(listaaaa)
                this.PreOrderL(raiz,id)
                let lis=JSON.parse(this.listaa)
                let list = new listaAux();
                Object.assign(list,lis)
                list.mostrar()
                return 'borrado'
                
            }else{
                raizAn=raizAc
                this.eliminar(id,raizAc.izq,raiz,raizAn);
                this.eliminar(id,raizAc.der,raiz,raizAn);
            }
        }
        //this.generar(raizAc)
    }

    PreOrderL(raizA,id){
        let lis=JSON.parse(this.listaa)
        let list = new listaAux();
        Object.assign(list,lis)
        if (raizA!=null){
            if (raizA.id != id){
                list.insertar(raizA.id,raizA.nombre,raizA.edad,raizA.correo,raizA.pass,raizA.clientes,raizA.calendario);
            }
            var CircularJSON = require('circular-json');
            this.listaa=CircularJSON.stringify(list)
            this.PreOrderL(raizA.izq,id);
            this.PreOrderL(raizA.der,id);
        }
        
    }

    insertarCliente(id,raizA,idC,nombre,correo){
        if(raizA != null){
            if (id==raizA.id){
                raizA.clientes.insertar(id,idC,nombre,correo)
            }else{
                this.insertarCliente(id,raizA.izq,idC,nombre,correo);
                this.insertarCliente(id,raizA.der,idC,nombre,correo);
            }
        }
    }

    insertarMes(id,raizA,mes){
        if(raizA != null){
            if (id==raizA.id){
                raizA.calendario.insertar(mes)
            }else{
                this.insertarMes(id,raizA.izq,mes);
                this.insertarMes(id,raizA.der,mes);
            }
        }
    }

    mostrarClientes(id,raizA){
        if(raizA != null){
            if (id==raizA.id){
                raizA.clientes.mostrar(id)
            }else{
                this.mostrarClientes(id,raizA.izq);
                this.mostrarClientes(id,raizA.der);
            }
        }
    }

    mostrarMeses(id,raizA){
        if(raizA != null){
            if (id==raizA.id){
                raizA.calendario.mostrar(id)
            }else{
                this.mostrarMeses(id,raizA.izq);
                this.mostrarMeses(id,raizA.der);
            }
        }
    }

    borrarClientes(id,idd,raizA){
        if(raizA != null){
            if (id==raizA.id){
                raizA.clientes.eliminar(idd)
            }else{
                this.borrarClientes(id,idd,raizA.izq);
                this.borrarClientes(id,idd,raizA.der);
            }
        }
    }

    

    generarDotCliente(id,raizA){
        let dot = 'digraph clientes{'
        dot += this.recorrerC(id,raizA)
        dot +='}'
        return dot
    }

    recorrerC(id,raizA){
        let dot = ''
        if(raizA != null){
            if (id==raizA.id){
                dot+=raizA.clientes.generar()
            }else{
                dot += this.recorrerC(id,raizA.izq);
                dot += this.recorrerC(id,raizA.der);
            }
        }
        return dot
    }

    generarDot(){
        let cadena="{\n";
        cadena+=this.enlazar(this.raiz);
        cadena+="}";

        return cadena
    }

    enlazar(raizA){
        let cadena="";
        if(raizA != null){
            cadena += this.enlazar(raizA.izq);
            cadena += this.enlazar(raizA.der);
            //validaciones
            if(raizA.izq != null){
                cadena+=raizA.id + "-> "+raizA.izq.id+"\n";
            }
            if(raizA.der != null){
                cadena+=raizA.id + "-> "+raizA.der.id+"\n";
            }

            
        }
        return cadena;
    }

}

class nodoL{
    constructor(idV,idC,nombre,correo){
        this.idC = idC;
        this.idV = idV;
        this.nombre=nombre;
        this.correo=correo;
        this.siguiente = null;
        this.anterior = null;
    }
}

class listaD{
    constructor(){
        this.primero = null;
        //this.dot=''
    }

    insertar(idV,idC,nombre,correo){
        let nuevo = new nodoL(idV,idC,nombre,correo); 

        if(this.primero == null){ 
            this.primero = nuevo;
        }else{
            let aux = this.primero;
            let b=true
            while(aux.siguiente != null){
                if (idC==aux.idC){
                    b = false
                }
                aux = aux.siguiente;
            };
            if (b){
                aux.siguiente = nuevo;
                nuevo.anterior = aux;
            }else{
                console.log("El cliente con ID "+idC+" ya existe")
            }
        }
    }

    mostrar(id){
        let aux = this.primero;
        console.log("********** Mostar Lista de "+id+" **********")
        let list=""
        let l = true
        while(aux != null){
            if (l){
                list+=aux.idC
                l=false
            }else{
                list+="<->"+aux.idC
            }
            
            aux = aux.siguiente;
        }
        console.log(list)
    }
    
    eliminar(valor){
        let aux = this.primero;
        let auxAnt, auxSig

        while(aux != null){
            if (valor==aux.idC){
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
        let dot='\n'+this.primero.idC +' [color = green];\n'
        while(aux != null){
            if (aux.siguiente!=null){
                dot +=aux.idC +'->'+aux.siguiente.idC+';\n'
                dot +=aux.siguiente.idC +'->'+aux.idC+';\n'
            }
            
            aux = aux.siguiente;
        }
        return dot
    }
}

class nodoM{
    constructor(mes){
        this.mes = mes;
        this.calendario = null;
        this.siguiente = null;
        this.anterior = null;
    }
}

class listaM{
    constructor(){
        this.primero = null;
        //this.dot=''
    }

    insertar(mes){
        let nuevo = new nodoM(mes); 

        if(this.primero == null){ 
            this.primero = nuevo;
        }else{
            let aux = this.primero;
            let b=true
            while(aux.siguiente != null){
                if (mes==aux.mes){
                    b = false
                }
                aux = aux.siguiente;
            };
            if (b){
                aux.siguiente = nuevo;
                nuevo.anterior = aux;
            }else{
                console.log("El mes "+mes+" ya existe")
            }
        }
    }

    mostrar(){
        let aux = this.primero;
        console.log("********** Meses **********")
        let list=""
        let l = true
        while(aux != null){
            if (l){
                list+=aux.mes
                l=false
            }else{
                list+="<->"+aux.mes
            }
            
            aux = aux.siguiente;
        }
        console.log(list)
    }
    
    eliminar(valor){
        let aux = this.primero;
        let auxAnt, auxSig

        while(aux != null){
            if (valor==aux.mes){
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
        let dot='\n'+this.primero.mes +' [color = green];\n'
        while(aux != null){
            if (aux.siguiente!=null){
                dot +=aux.mes +'->'+aux.siguiente.mes+';\n'
                dot +=aux.siguiente.mes +'->'+aux.mes+';\n'
            }
            
            aux = aux.siguiente;
        }
        return dot
    }
}

class nodoAux{
    constructor(dato,nombre,edad,correo,pass,clientes,calendario){
        this.dato=dato;
        this.nombre=nombre;
        this.edad=edad;
        this.correo=correo;
        this.pass=pass;
        this.clientes=clientes;
        this.calendario=calendario;
        this.siguiente = null;
    }
}

class listaAux{
    constructor(){
        this.primero = null;
    }

    insertar(dato,nombre,edad,correo,pass,clientes,calendario){
        let nuevo = new nodoAux(dato,nombre,edad,correo,pass,clientes,calendario); 
        if(this.primero == null){ 
            this.primero = nuevo;
        }else{
            let aux = this.primero;
            while(aux.siguiente != null){
                aux = aux.siguiente;
            };
            aux.siguiente = nuevo;
        }
    }

    mostrar(){
        let arbol = new arbol_avl();
        
        let aux = this.primero;
        console.log("***** Mostar Lista *****")
        while(aux != null){
            //console.log(aux.dato)
            arbol.insertar(aux.dato,aux.nombre,aux.direccion,aux.telefono,aux.correo)
            aux = aux.siguiente;
        }
        //sessionStorage.setItem("arbolP", JSON.stringify(arbol))
    }
}

let arbol = new arbol_avl();

arbol.insertar(30, 'Javier', 20, 'javier@gmail.com', '1234');
arbol.insertar(40, 'Alejandro', 21, 'alejandro@gmail.com', '1234');
arbol.insertar(20, 'Oscar', 21, 'oscar@gmail.com', '1234');
arbol.insertar(10, 'Saul', 20, 'saul@gmail.com', '1234');
arbol.insertar(5, 'Luis', 20, 'luis@gmail.com', '1234');
arbol.insertar(70, 'Roman', 20, 'javier@gmail.com', '1234');
arbol.insertar(7, 'Javier', 20, 'javier@gmail.com', '1234');
arbol.insertar(100, 'Javier', 20, 'javier@gmail.com', '1234');


arbol.PreOrder(arbol.raiz);
arbol.insertarCliente(10,arbol.raiz,1,"Javier","javier@gmail.com")
arbol.insertarCliente(10,arbol.raiz,2,"Javier","javier@gmail.com")
arbol.insertarCliente(10,arbol.raiz,3,"Javier","javier@gmail.com")
arbol.insertarCliente(10,arbol.raiz,4,"Javier","javier@gmail.com")
arbol.insertarCliente(10,arbol.raiz,5,"Javier","javier@gmail.com")
arbol.insertarCliente(10,arbol.raiz,6,"Javier","javier@gmail.com")
arbol.mostrarClientes(10,arbol.raiz)

arbol.eliminar(20,arbol.raiz,arbol.raiz,null)

console.log(arbol.generarDot());
console.log(arbol.generarDotCliente(10,arbol.raiz));

arbol.borrarClientes(10,2,arbol.raiz)
arbol.mostrarClientes(10,arbol.raiz)
console.log(arbol.generarDotCliente(10,arbol.raiz));

arbol.insertarMes(10,arbol.raiz,1)
arbol.insertarMes(10,arbol.raiz,2)
arbol.insertarMes(10,arbol.raiz,5)
arbol.insertarMes(10,arbol.raiz,7)
arbol.insertarMes(10,arbol.raiz,3)
arbol.insertarMes(10,arbol.raiz,12)
arbol.mostrarMeses(10,arbol.raiz)