function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='';
}

function createR() {
    
    //Guardo los datos capturados usando el id de cada control
    var idgame = document.getElementById("Input1").value;
    var gaplat = document.getElementById("Input2").value;
    var gadev = document.getElementById("Input3").value;
    var gaclass = document.getElementById("Input4").value;


    //validaciones
    if (idgame.length > 0) {
        //creo un objeto que guarda los datos
        var game = {
            idgame, //matricula:id    id:id
            gaplat,//nombre:nombre
            gadev,
            gaclass,
        }

        var lista_game=JSON.parse(localStorage.getItem("Juegos"));

        if(lista_game==null)
        { 
            var lista_game = [];
        }
        
        const existe = lista_game.some(element=>element.idgame==idgame); 

        if(!existe||document.getElementById("Input1").disabled==true)
        {
            
            if(document.getElementById("Input1").disabled==true)
            {
                var lista_game=lista_game.filter(game=>game.idgame!=idgame);

            }
                
            lista_game.push(game);
            var temporal = lista_game.sort((a,b) => a.idgame-b.idgame);
            localStorage.setItem("Juegos", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");

        }
        else
        {
            swal("Error", "Ya existe ese Juego en lista","warning");
        }

    } 
    else 
    {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
    
}

function read(){
    document.getElementById("Table1").innerHTML='';
    

    const lista_game = JSON.parse(localStorage.getItem("Juegos"));
    
     
    if(lista_game)
    {
        lista_game.forEach((game)=>printRow(game));
    }
}


function printRow(game){
    
    if(game!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = game.idgame;
        cell2.innerHTML = game.gaplat; 
        cell3.innerHTML = game.gadev;
        cell4.innerHTML = game.gaclass; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${game.idgame})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+game.idgame+')">Modificar</button>';
    }
}

function deleteR(idgame){
    const lista_game = JSON.parse(localStorage.getItem("Juegos"));
    var temporal=lista_game.filter(game=>game.idgame!=idgame);
    localStorage.setItem("Juegos", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("Juegos");
    }
  
    read();
    
}

function seekR(idgame){

    const lista_game = JSON.parse(localStorage.getItem("Juegos"));
    var game=lista_game.filter(game=>game.idgame==idgame);
    //console.log(alumno[0]);
    updateR(game[0]);
}

function updateR(game){
    if(game!=null)
    {
        document.getElementById("Input1").value=game.idgame;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=game.gaplat;
        document.getElementById("Input3").value=game.gadev;
        document.getElementById("Input4").value=game.gaclass;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;
  
    const lista_game = JSON.parse(localStorage.getItem("Juegos"));
    var gameC=llista_games.filter(game=>game.gaclass==c);
    if(gameC)
    {
        gameC.forEach((game)=>printRowQ(game));
    }
    //console.log(alumnosC)

}


function printRowQ(game){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = game.idgame;
    cell2.innerHTML = game.gaplat; 
    cell3.innerHTML = game.gadev;
    cell4.innerHTML = game.gaclass; 
   
}