function initTable(){
    const taille = 5;
    const table = document.getElementById("tableNonCache");
    
    for (let i=0; i<taille; i++){ //Chaque ligne
    
        const Ligne = document.createElement("TR");
        const Cell = document.createElement("TD");

        for (let j=0; j<taille; j++){ // chaque colonne
            Cell.innerHTML = "<button type='button'>j</button>";
            Ligne.appendChild(Cell);
            
        }
        
        table.appendChild(Ligne);
    }   
}