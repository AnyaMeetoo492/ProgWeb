function initTable(){

    const taille = 10;
    const table = document.getElementById("tableNonCache");

    table.innerHTML = "";
    
    for (let i=0; i<taille; i++){ //Chaque ligne
    
        const Ligne = document.createElement("TR");

        for (let j=0; j<taille; j++){ // chaque colonne
            const Cell = document.createElement("TD");
            Cell.innerHTML = "<button type='button'>"+Math.floor(Math.random() * 2)+"</button>";
            Ligne.appendChild(Cell);
            
        }
        
        table.appendChild(Ligne);
    }   
}