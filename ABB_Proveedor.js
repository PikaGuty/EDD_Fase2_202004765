class nodo{
    constructor(id,nombre,direccion,telefono,correo){
        this.id = id;
        this.nombre = nombre;
        this.direccion=direccion;
        this.telefono=telefono;
        this.correo=correo;
        this.izq = null;
        this.der = null;
    }
}

class abb{
    constructor(){
        this.listaa = null
        this.raiz = null;
        this.dot = '';
        this.busc=''
        this.tab=''
        this.nodoB=''
        //Object.assign(this.insertar,this.insertar_nodo,this.PreOrder,this.generar,this.buscar)
        console.log("Inicializao")
    }

    insertar(id,nombre,direccion,telefono,correo){
        let nuevo = new nodo(id,nombre,direccion,telefono,correo);

        if(this.raiz == null){
            this.raiz= nuevo;
        }else{
            this.raiz = this.insertar_nodo(this.raiz,nuevo);
            
            
        }
    }

    insertar_nodo(raiz_actual,nuevo){
        if(raiz_actual != null){
            
            if(raiz_actual.id > nuevo.id){
                raiz_actual.izq = this.insertar_nodo(raiz_actual.izq,nuevo);
            }else if(raiz_actual.id < nuevo.id){
                raiz_actual.der = this.insertar_nodo(raiz_actual.der,nuevo);
            }else{
                console.log("Ya existe un Proveedor con ID = "+nuevo.id);
                alert("Ya existe un Proveedor con ID = "+nuevo.id);
            }

            return raiz_actual;
        }else{
            raiz_actual = nuevo;
            //alert("Se ha ingresado el Proveedor con ID = "+nuevo.id);
            return raiz_actual;
        }
    }

    PreOrder(raizA){
        if (raizA!=null){
            console.log(raizA.id);
            this.PreOrder(raizA.izq);
            this.PreOrder(raizA.der);
        }
    }
    
    PreOrderL(raizA,id){
        let lis=JSON.parse(this.listaa)
        let list = new lista();
        Object.assign(list,lis)
        if (raizA!=null){
            if (raizA.id != id){
                list.insertar(raizA.id,raizA.nombre,raizA.direccion,raizA.telefono,raizA.correo);
            }
            this.listaa=JSON.stringify(list)
            this.PreOrderL(raizA.izq,id);
            this.PreOrderL(raizA.der,id);
        }
        
    }

    Tabla(raizA){ 
        if (raizA!=null){
            this.Tabla(raizA.izq);
            this.tab += '<tr>'
            this.tab += '<td>'+raizA.id+'</td>'
            this.tab += '<td>'+raizA.nombre+'</td>'
            this.tab += '<td>'+raizA.direccion+'</td>'
            this.tab += '<td>'+raizA.telefono+'</td>'
            this.tab += '<td>'+raizA.correo+'</td>'
            
            this.tab += '<td>'
            this.tab += '<button value=\"'+raizA.id+'\" onclick="eliminar(this.value);VerA(\'Proveedor\');" style="background-color:#C82807 " type="button" class="btn btn-outline-dark"><i class="fas fa-trash"></i></button> </td>'
            this.tab += '</tr>'
            
            
            
            this.Tabla(raizA.der);
        }
    }

    generar(raizA){
        if (raizA!=null){
            try{
                this.dot +=raizA.id +'->'+raizA.izq.id+';'
            }catch(error){

            }
            try{
                this.dot +=raizA.id +'->'+raizA.der.id+';'
            }catch(error){

            }
            
            this.generar(raizA.izq);
            this.generar(raizA.der);
        }
    }

    buscar(id,raizA){
        if (raizA!=null){
            if (raizA.id==id){
                
                this.busc=raizA
            }
    
            this.buscar(id,raizA.izq);
            this.buscar(id,raizA.der);
        }
    }
    eliminarr(id,raizAc,raiz,raizAn,lado){
        if (raizAc!=null){
            if (raizAc.id==id){
                
                if (raiz.id==id){
                    let listaaaa = new lista();
                    this.listaa=JSON.stringify(listaaaa)
                    this.PreOrderL(raiz,id)
                    let lis=JSON.parse(this.listaa)
                    let list = new lista();
                    Object.assign(list,lis)
                    list.mostrar()
                    return 'borrado'
                }else if (raizAc.izq==null && raizAc.der==null){  //Eliminando hoja
                    if (lado=='i'){
                        raizAn.izq=null
                    }else if (lado=='d'){
                        raizAn.der=null
                    }
                    this.generar(raiz)
                }else if (raizAc.izq!=null && raizAc.der==null){  //Eliminando nodo intermedio 1 hoja izquierda
                    let aux = raizAc;
                    if (lado=='i'){
                        raizAn.izq=aux.izq
                    }else if (lado=='d'){
                        raizAn.der=aux.izq
                    }
                    this.generar(raiz)
                }else if (raizAc.izq==null && raizAc.der!=null){  //Eliminando nodo intermedio 1 hoja derecha
                    let aux = raizAc;
                    if (lado=='i'){
                        raizAn.izq=aux.der
                    }else if (lado=='d'){
                        raizAn.der=aux.der
                    }
                    this.generar(raiz)
                }else if (raizAc.izq!=null && raizAc.der!=null){  //Eliminando nodo intermedio 2 hojas MAYOR
                    let aux = raizAc;
                    if (lado =='i'){
                        if (raizAc.izq==null && raizAc.der==null){
                            raizAn.izq=aux.der
                            aux.der.izq=aux.izq
                        }else if (raizAc.izq!=null && raizAc.der==null){
                            raizAn.izq=aux.der
                            aux.der.der=aux.der.izq
                            aux.der.izq=aux.izq
                        }else if (raizAc.izq==null && raizAc.der!=null){
                            raizAn.izq=aux.der
                            aux.der.izq=aux.izq
                        }else if (raizAc.izq!=null && raizAc.der!=null){
                            let listaaaa = new lista();
                            this.listaa=JSON.stringify(listaaaa)
                            this.PreOrderL(raiz,id)
                            let lis=JSON.parse(this.listaa)
                            let list = new lista();
                            Object.assign(list,lis)
                            list.mostrar()
                            this.nodoB = 'borrado'
                        }
                        
                    }else if (lado == 'd'){
                        if (raizAc.izq==null && raizAc.der==null){
                            raizAn.der=aux.der
                            aux.der.izq=aux.izq
                        }else if (raizAc.izq!=null && raizAc.der==null){
                            raizAn.der=aux.der
                            aux.der.der=aux.der.izq
                            aux.der.izq=aux.izq
                        }else if (raizAc.izq==null && raizAc.der!=null){
                            raizAn.der=aux.der
                            aux.der.izq=aux.izq
                        }else if (raizAc.izq!=null && raizAc.der!=null){
                            let listaaaa = new lista();
                            this.listaa=JSON.stringify(listaaaa)
                            this.PreOrderL(raiz,id)                            
                            let lis=JSON.parse(this.listaa)
                            let list = new lista();
                            Object.assign(list,lis)
                            list.mostrar()
                            //console.log("INTENTO")
                            this.nodoB = 'borrado'
                        }
                        
                    }
                    this.generar(raiz)
                }

                
            }else{
                raizAn=raizAc
                this.eliminarr(id,raizAc.izq,raiz,raizAn,'i');
                this.eliminarr(id,raizAc.der,raiz,raizAn,'d');
            }
        }
        //this.generar(raizAc)
    }
}

class nodol{
    constructor(dato,nombre,direccion,telefono,correo){
        this.dato = dato;
        this.nombre = nombre;
        this.direccion=direccion;
        this.telefono=telefono;
        this.correo=correo;
        this.siguiente = null;
    }
}

class lista{
    constructor(){
        this.primero = null;
    }

    insertar(dato,nombre,direccion,telefono,correo){
        let nuevo = new nodol(dato,nombre,direccion,telefono,correo); 
        if(this.primero == null){ //la lista esta vacia
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
        let arbol = new abb();
        
        let aux = this.primero;
        console.log("***** Mostar Lista *****")
        while(aux != null){
            arbol.insertar(aux.dato,aux.nombre,aux.direccion,aux.telefono,aux.correo)
            aux = aux.siguiente;
        }
        sessionStorage.setItem("arbolP", JSON.stringify(arbol))
    }
}