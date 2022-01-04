class nodoH{
    constructor(id, nombreV, nombreC, totalVenta, listProductos){
        this.id = id;
        this.nombreV = nombreV;
        this.nombreC = nombreC;
        this.totalVenta = totalVenta;
        this.listProductos = listProductos;
    }
}

class hash{
    constructor(){
        this.claves = this.iniciar_arreglo(7);
        this.claves_usadas=0;
        this.size = 7;
        this.id = parseInt(Math.random() * (1000 - 5) + 5)
    }

    insertar(id, nombreV, nombreC, totalVenta, listProductos){
        this.id+=parseInt(Math.random() * (10 - 1) + 1);
        let nuevo = new nodoH(id, nombreV, nombreC, totalVenta, listProductos)
        let indice = this.calcular_hash(nuevo.id);

        if(this.claves[indice]==null){
            this.claves[indice] = nuevo;
            this.claves_usadas++;
        }else{
            indice =  this.solucion_coliciones(indice);
            this.claves[indice] = nuevo;
            this.claves_usadas++
        }

        let Porcentaje_uso = this.claves_usadas/this.size;
        if(Porcentaje_uso>=0.5){
            this.rehash();
        }
    }

    iniciar_arreglo(tamaño){
        let claves=[];
        for(var i =0;i<tamaño,i++;){
            claves[i] = null;
        }
        return claves;
    }

    calcular_hash(id){
        let resultado=0;
        resultado= id % this.size;
        return resultado;
    }

    solucion_coliciones(indice){
        let nuevo_indice =0;
        let i=0;
        let disponible = false;

        while(disponible == false){
            nuevo_indice = indice + Math.pow(i,2);
            if(nuevo_indice>= this.size){
                nuevo_indice = nuevo_indice-this.size;
            }
            if(this.claves[nuevo_indice]==null){
                disponible= true;
            }
            i++;
        }
        return nuevo_indice;
    }

    rehash(){
        let primo= false;
        let new_size = this.size;
        while(primo==false){
            new_size++;
            let cont =0;
            for(var i = new_size;i>0; i--){
                if(new_size%i == 0){
                    cont++;
                }
            }
            if(cont == 2){
                primo = true
            }
        }
        let claves_aux = this.claves;

        this.size = new_size;
        this.claves = this.iniciar_arreglo(new_size);
        this.claves_usadas=0;

        for(var i =0; i<claves_aux.length;i++){
            if(claves_aux[i]!=null){
                this.insertar(claves_aux[i].id,claves_aux[i].nombreV, claves_aux[i].nombreC, claves_aux[i].totalVenta, claves_aux[i].listProductos);
            }
        }
    }

    recorrer(){
        for(var i =0;i<this.size;i++){
            if(this.claves[i]!=null){
                console.log("-->"+this.claves[i].id);
            }else{
                console.log("------------");
            }
        }
    }

    tabla(){
        let tab = ''
        for(var i =0;i<this.size;i++){
            if(this.claves[i]!=null){
                tab += '<tr>'
                tab += '<td>'+i+'</td>'
                tab += '<td>'+this.claves[i].id+'</td>'
                tab += '<td>'+this.claves[i].nombreV+'</td>'
                tab += '<td>'+this.claves[i].nombreC+'</td>'
                tab += '<td>'+this.claves[i].totalVenta+'</td>'
                tab += '</tr>'
            }else{
                tab += '<tr>'
                tab += '<td>'+i+'</td>'
                tab += '<td> -- </td>'
                tab += '<td> -- </td>'
                tab += '<td> -- </td>'
                tab += '<td> -- </td>'
                tab += '</tr>'
            }
        }
        return tab
    }

    tablaN(nom){
        let tab = ''
        for(var i =0;i<this.size;i++){
            if(this.claves[i]!=null && this.claves[i].nombreV==nom){
                tab += '<tr>'
                tab += '<td>'+i+'</td>'
                tab += '<td>'+this.claves[i].id+'</td>'
                tab += '<td>'+this.claves[i].nombreV+'</td>'
                tab += '<td>'+this.claves[i].nombreC+'</td>'
                tab += '<td>'+this.claves[i].totalVenta+'</td>'
                tab += '</tr>'
            }
        }
        return tab
    }

    generar(){
        let dot = "digraph Hash{\n";
        dot += "node [shape=box];\n";

        for(var i =0;i<this.size;i++){
            if(this.claves[i]!=null){
                dot += "U"+i+" [label = \""+i+"\\n idVenta: "+this.claves[i].id+"\\n"+this.claves[i].nombreV+" -> "+this.claves[i].nombreC+"\\n Total Q"+this.claves[i].totalVenta+"\" width = 1.5, group = 1 ];\n"
            }else{
                dot += "U"+i+" [label = \""+i+"\" width = 1.5,  group = 1 ];\n"
            }
        }
        for(var i =0;i<this.size;i++){
            if (i==this.size-1){
                if(this.claves[i]!=null){
                    dot += "U"+i+"\n"
                }else{
                    dot += "U"+i+"\n"
                }
            }else{
                if(this.claves[i]!=null){
                    dot += "U"+i+"->"
                }else{
                    dot += "U"+i+"->"
                }
            }
            
        }
        for(var i =0;i<this.size;i++){
            if(this.claves[i]!=null){
                let auxx = this.claves[i].listProductos
                //********* Recuperando Objeto **************
                this.claves[i].listProductos = new listaProd()
                Object.assign(this.claves[i].listProductos,auxx)
                //*******************************************
                
            }
        }
        
        for(var i =0;i<this.size;i++){
            if(this.claves[i]!=null){
                dot+=this.claves[i].listProductos.generar(i)
            }
        }
        dot += "}";
        return dot
    }

    generarN(nom){
        let dot = "digraph Hash{\n";
        dot += "node [shape=box];\n";

        for(var i =0;i<this.size;i++){
            if(this.claves[i]!=null && this.claves[i].nombreV==nom){
                dot += "U"+i+" [label = \""+i+"\\n idVenta: "+this.claves[i].id+"\\n"+this.claves[i].nombreV+" -> "+this.claves[i].nombreC+"\\n Total Q"+this.claves[i].totalVenta+"\" width = 1.5, group = 1 ];\n"
            }
        }
        for(var i =0;i<this.size;i++){
            if (i==this.size-1){
                if(this.claves[i]!=null && this.claves[i].nombreV==nom){
                    dot += "U"+i+"\n"
                }
            }else{
                if(this.claves[i]!=null && this.claves[i].nombreV==nom){
                    dot += "U"+i+"->"
                }
            }
            
        }
        for(var i =0;i<this.size;i++){
            if(this.claves[i]!=null && this.claves[i].nombreV==nom){
                let auxx = this.claves[i].listProductos
                //********* Recuperando Objeto **************
                this.claves[i].listProductos = new listaProd()
                Object.assign(this.claves[i].listProductos,auxx)
                //*******************************************
                
            }
        }
        
        for(var i =0;i<this.size;i++){
            if(this.claves[i]!=null && this.claves[i].nombreV==nom){
                dot+=this.claves[i].listProductos.generar(i)
            }
        }
        dot += "}";
        return dot
    }
}

class nodoProd{
    constructor(id,cantidad){
        this.id = id;
        this.cantidad = cantidad;
        this.siguiente = null;
    }
}

class listaProd{
    constructor(){
        this.primero = null;
    }

    insertar(id,cantidad){
        let nuevo = new nodoProd(id,cantidad); 
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
        let aux = this.primero;
        let li = '';
        let primero = true;
        //console.log("***** Mostar Lista *****")
        while(aux != null){
            if(primero){
                li += aux.id+' '+aux.cantidad;
                primero = false;
            }else{
                li += ' -> '+aux.id +' '+aux.cantidad;
            }
            aux = aux.siguiente;
        }
        //return li
        console.log(li);
    }

    contenido(){
        let aux = this.primero;
        let li = '';
        li +=  ' ID  -- Cantidad \n';
        while(aux != null){
            li += aux.id+' -- '+aux.cantidad+'\n';
            aux = aux.siguiente;
        }
        return li
    }

    json(){
        let aux = this.primero;
        let li = '{\n"li":[';//
        while(aux != null){
            if (aux.siguiente!=null){
                li += '{\n'
                li += '"id":'+aux.id+',\n'
                li += '"cantidad":'+aux.cantidad+'\n';
                li += '},\n'
            }else{
                li += '{\n'
                li += '"id":'+aux.id+',\n'
                li += '"cantidad":'+aux.cantidad+'\n';
                li += '}\n'
            }
            
            aux = aux.siguiente;
        }
        li += ']\n}'
        return li
    }

    generar(nodoHash){
        let aux = this.primero;
        let li = '';
        let primero = true;
        let gru = 0;
        while(aux != null){
            li += "U"+nodoHash+"_L"+gru+" [label = \"Id: "+aux.id+"\\n Cantidad "+aux.cantidad+"\" width = 1.5, group = "+(gru+2)+" ];\n"
            gru++;
            aux = aux.siguiente;
        }
        gru = 0;
        aux = this.primero;
        primero = true;
        while(aux != null){
            if(primero){
                li += "U"+nodoHash+"->"+"U"+nodoHash+"_L"+gru
                primero = false;
            }else{
                li += ' -> '+"U"+nodoHash+"_L"+gru
            }
            gru++;
            aux = aux.siguiente;
        }
        li+="\n"
        gru = 0;
        aux = this.primero;
        li += "{ rank = same; "
        primero = true;
        while(aux != null){
            if(primero){
                li += "U"+nodoHash+";"+"U"+nodoHash+"_L"+gru+";"
                primero = false;
            }else{
                li += "U"+nodoHash+"_L"+gru+";"
            }
            gru++;
            aux = aux.siguiente;
        }
        li+="}\n"
        return li
    }
}

/*let list = new listaProd();

list.insertar(10,66);
list.insertar(12,43);
list.insertar(7,23);
list.insertar(5,12);
//list.mostrar();
//console.log(list.generar(1))

let tabla = new hash();

/*tabla.insertar(10,"Vendedor1", "Cliente1",666, list);
tabla.insertar(8,"Vendedor1", "Cliente2",666, list);
tabla.insertar(2,"Vendedor2", "Cliente1",666, list);
tabla.insertar(9,"Vendedor2", "Cliente1",666, list);
/*tabla.insertar(81);
tabla.insertar(12);
tabla.insertar(90);
tabla.insertar(181);
tabla.insertar(112);
tabla.insertar(190);
tabla.recorrer();
console.log(tabla.generar())*/
