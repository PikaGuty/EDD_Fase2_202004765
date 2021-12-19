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
        console.log("Inicializado AVL")
        this.raiz = null;
        this.listaa = null;
        this.dotM = ''
        this.busc=null
        this.tablaC=''
        this.nodoB = ''
    }
    insertar(id, nombre, edad, correo, pass){
        let nuevo = new nodo_avl(id, nombre, edad, correo, pass);
        
        if(this.raiz==null){
            this.raiz=nuevo;
        }else{
            this.raiz=this.insertarNodo(this.raiz,nuevo)
        }
    }

    insertarr(id, nombre, edad, correo, pass, clientes, calendario){
        let nuevo = new nodo_avl(id, nombre, edad, correo, pass);
        nuevo.calendario = calendario
        nuevo.clientes = clientes
        
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

    Tabla(raizA){
        if (raizA!=null){
            this.Tabla(raizA.izq);
            this.tab += '<tr>'
            this.tab += '<td>'+raizA.id+'</td>'
            this.tab += '<td>'+raizA.nombre+'</td>'
            this.tab += '<td>'+raizA.edad+'</td>'
            this.tab += '<td>'+raizA.correo+'</td>'
            this.tab += '<td>'+raizA.pass+'</td>'
            
            this.tab += '<td>'
            this.tab += '<button value=\"'+raizA.id+'\" onclick="eliminarV(this.value);VerA(\'Vendedor\');" style="background-color:#C82807 " type="button" class="btn btn-outline-dark"><i class="fas fa-trash"></i></button> </td>'
            this.tab += '</tr>'
            
            
            this.Tabla(raizA.der);
        }
    }

    buscar (id,raizA){
        console.log("Entre a buscar")
        if (raizA !=null){
            if (raizA.id==id){
                this.busc = raizA;
            }else if (raizA.id>id){
                this.buscar(id,raizA.izq)
            }else if (raizA.id<id){
                this.buscar(id,raizA.der)
            }
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
                this.nodoB = 'borrado'
                
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
                list.insertar(raizA.id,raizA.nombre,raizA.edad,raizA.correo,raizA.pass,raizA.clientes,raizA.calendario)
            }
            const CircularJSON = function(JSON,RegExp){var specialChar="~",safeSpecialChar="\\x"+("0"+specialChar.charCodeAt(0).toString(16)).slice(-2),escapedSafeSpecialChar="\\"+safeSpecialChar,specialCharRG=new RegExp(safeSpecialChar,"g"),safeSpecialCharRG=new RegExp(escapedSafeSpecialChar,"g"),safeStartWithSpecialCharRG=new RegExp("(?:^|([^\\\\]))"+escapedSafeSpecialChar),indexOf=[].indexOf||function(v){for(var i=this.length;i--&&this[i]!==v;);return i},$String=String;function generateReplacer(value,replacer,resolve){var doNotIgnore=false,inspect=!!replacer,path=[],all=[value],seen=[value],mapp=[resolve?specialChar:"[Circular]"],last=value,lvl=1,i,fn;if(inspect){fn=typeof replacer==="object"?function(key,value){return key!==""&&replacer.indexOf(key)<0?void 0:value}:replacer}return function(key,value){if(inspect)value=fn.call(this,key,value);if(doNotIgnore){if(last!==this){i=lvl-indexOf.call(all,this)-1;lvl-=i;all.splice(lvl,all.length);path.splice(lvl-1,path.length);last=this}if(typeof value==="object"&&value){if(indexOf.call(all,value)<0){all.push(last=value)}lvl=all.length;i=indexOf.call(seen,value);if(i<0){i=seen.push(value)-1;if(resolve){path.push((""+key).replace(specialCharRG,safeSpecialChar));mapp[i]=specialChar+path.join(specialChar)}else{mapp[i]=mapp[0]}}else{value=mapp[i]}}else{if(typeof value==="string"&&resolve){value=value.replace(safeSpecialChar,escapedSafeSpecialChar).replace(specialChar,safeSpecialChar)}}}else{doNotIgnore=true}return value}}function retrieveFromPath(current,keys){for(var i=0,length=keys.length;i<length;current=current[keys[i++].replace(safeSpecialCharRG,specialChar)]);return current}function generateReviver(reviver){return function(key,value){var isString=typeof value==="string";if(isString&&value.charAt(0)===specialChar){return new $String(value.slice(1))}if(key==="")value=regenerate(value,value,{});if(isString)value=value.replace(safeStartWithSpecialCharRG,"$1"+specialChar).replace(escapedSafeSpecialChar,safeSpecialChar);return reviver?reviver.call(this,key,value):value}}function regenerateArray(root,current,retrieve){for(var i=0,length=current.length;i<length;i++){current[i]=regenerate(root,current[i],retrieve)}return current}function regenerateObject(root,current,retrieve){for(var key in current){if(current.hasOwnProperty(key)){current[key]=regenerate(root,current[key],retrieve)}}return current}function regenerate(root,current,retrieve){return current instanceof Array?regenerateArray(root,current,retrieve):current instanceof $String?current.length?retrieve.hasOwnProperty(current)?retrieve[current]:retrieve[current]=retrieveFromPath(root,current.split(specialChar)):root:current instanceof Object?regenerateObject(root,current,retrieve):current}var CircularJSON={stringify:function stringify(value,replacer,space,doNotResolve){return CircularJSON.parser.stringify(value,generateReplacer(value,replacer,!doNotResolve),space)},parse:function parse(text,reviver){return CircularJSON.parser.parse(text,generateReviver(reviver))},parser:JSON};return CircularJSON}(JSON,RegExp);
            this.listaa=CircularJSON.stringify(list)
            this.PreOrderL(raizA.izq,id);
            this.PreOrderL(raizA.der,id);
        }
        
    }

    inicializarClientes(raizA){
        if(raizA != null){
            let aux = raizA.clientes
            //********* Recuperando Objeto **************
            raizA.clientes = new listaD()
            Object.assign(raizA.clientes,aux)
            //*******************************************
            //console.log(raizA.clientes)
            this.inicializarClientes(raizA.izq);
            this.inicializarClientes(raizA.der);
            
        }
    }

    inicializarMes(raizA){
        if(raizA != null){
            let aux = raizA.calendario
            //********* Recuperando Objeto **************
            raizA.calendario = new listaM()
            Object.assign(raizA.calendario,aux)
            //*******************************************
            //console.log(raizA.calendario)
            this.inicializarMes(raizA.izq);
            this.inicializarMes(raizA.der);
        }
    }

    inicializarCalendario(raizA){
        if(raizA != null){
            raizA.calendario.ini()

            this.inicializarCalendario(raizA.izq);
            this.inicializarCalendario(raizA.der);
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
                console.log('Insertao')
            }else{
                this.insertarMes(id,raizA.izq,mes);
                this.insertarMes(id,raizA.der,mes);
            }
        }
    }

    insertarEvento(id,raizA,mes,desc,dia,hora){
        if(raizA != null){
            if (id==raizA.id){
                raizA.calendario.insertarE(mes,desc,dia,hora)
                //alert("Mes "+mes+" insertado")
            }else{
                this.insertarEvento(id,raizA.izq,mes,desc,dia,hora);
                this.insertarEvento(id,raizA.der,mes,desc,dia,hora);
            }
        }
    }

    mostrarEvento(id,raizA,mes){
        if(raizA != null){
            if (id==raizA.id){
                raizA.calendario.mostrarE(mes)
            }else{
                this.mostrarEvento(id,raizA.izq,mes);
                this.mostrarEvento(id,raizA.der,mes);
            }
        }
    }

    graficarMes(id,raizA,mes){
        if(raizA != null){
            if (id==raizA.id){
                this.dotM=raizA.calendario.graficarM(mes)
            }else{
                this.graficarMes(id,raizA.izq,mes);
                this.graficarMes(id,raizA.der,mes);
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

    TablaClientes(id,raizA){
        if(raizA != null){
            if (id==raizA.id){
                this.tablaC=raizA.clientes.tabla(id)
            }else{
                this.TablaClientes(id,raizA.izq);
                this.TablaClientes(id,raizA.der);
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
        if(raizA!= null){
            if (id==raizA.id){
                if (raizA.clientes!=null){
                    dot+=raizA.clientes.generar()
                }
                
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
        this.ultimo = null;
        //this.dot=''
    }

    insertar(idV,idC,nombre,correo){
        let nuevo = new nodoL(idV,idC,nombre,correo); 

        if(this.primero == null){ 
            this.primero = nuevo;
        }else{
            let aux = this.primero;
            let exists=false
            while(aux.siguiente != null) {
                if (idC==aux.idC){
                    exists = true
                }
                aux = aux.siguiente
            }
            if (idC==aux.idC){
                exists = true
            }

            if (!exists){
                aux.siguiente = nuevo;
                nuevo.anterior = aux;
                console.log("Ingresado")

                console.log(aux.siguiente)
                console.log(nuevo.anterior)
            }else{
                console.log("El cliente con ID "+idC+" ya existe en la cartera de clientes de: "+idV)
                alert("El cliente con ID "+idC+" ya existe en la cartera de clientes de: "+idV)
            }
            aux = this.primero;
            console.log("Recorriendo")
            while(aux != null) {
                console.log(aux.siguiente)
                console.log(aux.anterior)
                aux = aux.siguiente
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

    tabla(id){
        let aux = this.primero;
        //console.log("********** Mostar Lista de "+id+" **********")
        let list=""
        while(aux != null){
            
            list += '<tr>'
            list += '<td>'+aux.idC+'</td>'
            list += '<td>'+aux.nombre+'</td>'
            list += '<td>'+aux.correo+'</td>'
            
            list += '<td>'
            list += '<button value=\"'+aux.idC+'\" onclick="eliminarC(this.value);VerA(\'Cliente\');" style="background-color:#C82807 " type="button" class="btn btn-outline-dark"><i class="fas fa-trash"></i></button> </td>'
            list += '</tr>'
            
            aux = aux.siguiente;
        }
        return list
    }
    
    eliminar(valor){
        let aux = this.primero;
        let ant = null
        while(aux != null){
            if (valor==aux.idC){
                if (this.primero.idC==aux.idC){ //Eliminar primero
                    console.log("Primero")
                    aux.siguiente.anterior=null
                    this.primero=aux.siguiente
                }else if (aux.siguiente==null){ //Eliminar ultimo
                    console.log("Ultimo")
                    ant.siguiente=null
                }else{  //Eliminar enmedio
                    ant.siguiente=aux.siguiente
                    aux.siguiente.anterior=ant
                }
                break
            }
            ant = aux
            aux = aux.siguiente;
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
            //alert(aux.anterior)
            aux = aux.siguiente;
        }
        return dot
    }
}

class nodoM{
    constructor(mes){
        this.mes = mes;
        this.calendario = new matriz();
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
            let exists=false
            while(aux.siguiente != null) {
                if (mes==aux.mes){
                    exists = true
                }
                aux = aux.siguiente
            }
            if (mes==aux.mes){
                exists = true
            }

            if (!exists){
                aux.siguiente = nuevo;
                nuevo.anterior = aux;
            }else{
                console.log("El mes "+mes+" ya existe ")
                //alert("El mes "+idC+" ya existe")
            }  
        }
    }

    insertarE(mes,desc,dia,hora){
        let aux = this.primero;
        while(aux != null){
            if (mes == aux.mes){
                aux.calendario.insertar(desc,dia,hora);
            }
            aux = aux.siguiente;
        };
    }

    ini(){
        let aux = this.primero;
        while(aux != null){
            let auxx = aux.calendario
            //********* Recuperando Objeto **************
            aux.calendario = new matriz()
            Object.assign(aux.calendario,auxx)
            //*******************************************

            let auxx_x = aux.calendario.cabecetas_x 
            //********* Recuperando Objeto **************
            aux.calendario.cabecetas_x = new lista_cabecera();
            Object.assign(aux.calendario.cabecetas_x,auxx_x)
            //*******************************************
            aux.calendario.cabecetas_x.inni()

            let auxx_y = aux.calendario.cabecetas_y 
            //********* Recuperando Objeto **************
            aux.calendario.cabecetas_y = new lista_cabecera();
            Object.assign(aux.calendario.cabecetas_y,auxx_y)
            //*******************************************
            aux.calendario.cabecetas_y.inni()

            //console.log(aux.calendario.cabecetas_x)
            //console.log(aux.calendario.cabecetas_y)
            aux = aux.siguiente;
        };
    }
    

    mostrarE(mes){
        let aux = this.primero;
        while(aux != null){
            if (mes == aux.mes){
                aux.calendario.recorrer_matriz()
            }
            aux = aux.siguiente;
        }
    }

    graficarM(mes){
        let aux = this.primero;
        let dot = ''
        while(aux != null){
            if (mes == aux.mes){
                dot = aux.calendario.graficar_matriz()
            }
            aux = aux.siguiente;
        }
        return dot
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
        while(aux != null){
            console.log(aux.dato)
            arbol.insertarr(aux.dato,aux.nombre,aux.edad,aux.correo,aux.pass,aux.clientes,aux.calendario)
            aux = aux.siguiente;
        }
        sessionStorage.setItem("avl", JSON.stringify(arbol))
    }
}

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
                        console.log("La posicion ya esta ocupada-> "+nuevo.x+","+nuevo.y+" con valor "+nuevo.valor);
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
                        console.log("La posicion ya esta ocupada-> "+nuevo.x+","+nuevo.y+" con valor "+nuevo.valor);
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

    inni(){
        let aux = this.primero;
        let auxx = aux.lista_interna
        //********* Recuperando Objeto **************
        aux.lista_interna = new lista_interna()
        Object.assign(aux.lista_interna,auxx)
        //*******************************************
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
            cadena+='A'+aux_x.dato+' [label = \"'+aux_x.dato+'\"   width = 1.5  group = '+aux_x.dato+' ];\n'
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
        //console.log(cadena);
        return cadena
    }
}

/*
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

arbol.insertarEvento(10, arbol.raiz, 12, "Comer1", 1,"8:23");
arbol.insertarEvento(10, arbol.raiz, 12, "Comida1",3,"12:00");
arbol.insertarEvento(10, arbol.raiz, 12, "Comida2",3,"11:00");
arbol.insertarEvento(10, arbol.raiz, 12, "Comida3",4,"15:00");
arbol.insertarEvento(10, arbol.raiz, 12, "Comida4",5,"13:00");
arbol.insertarEvento(10, arbol.raiz, 12, "Comida5",4,"11:00");
arbol.insertarEvento(10, arbol.raiz, 12, "Comida6",5,"15:00");
arbol.insertarEvento(10, arbol.raiz, 12, "Comida7",3,"13:00");
arbol.insertarEvento(10, arbol.raiz, 12, "Comida8",10,"13:00");
arbol.mostrarEvento(10,arbol.raiz,12)
arbol.graficarMes(10,arbol.raiz,12)
console.log(arbol.dotM)*/ 