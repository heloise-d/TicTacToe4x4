
const TAILLE = 4;

class TicTacToe {
    constructor(){ 
        this.table =[];
        this.initializeTable();
        this.freeSquares = TAILLE*TAILLE;
        this.winner = '';
        this.run = true;
    }

    initializeTable = function(){ 
        for (let i = 0; i <TAILLE; i++){
            this.table[i] = ['','','','']
        }
    }
    //fonction qui initialise la grille de jeu
    
    undoMove = function(i,j){ 
        this.table[i][j] = '';
    }
    //fonction qui enlève le signe posé temporairement dans les IA 
    
    checkEmpty = function(i,j){ 
        return (this.table[i][j] == '' ? true : false);
    }
    //fonction qui renvoie vrai si la case sélectionnée est vide 

    makeMove1 = function(signe, i, j){
        this.table[i][j] = signe;
        this.freeSquares --;
    }
    //fonction qui place le signe sur la case d'indice (i,j) et qui enlève 1 au nombre de cases libres dans la grille

    makeMove2 = function(signe, move){
        this.table[move.i][move.j] = signe;
        this.freeSquares --;
    }
    //fonction qui place le signe entré en paramètre pour le mouvement entré en paramètre, et qui enlève 1 
    //au nombre de cases libres dans la grille 

    /* Vérifie si un des deux joueurs a gagné (c-à-d un joueur a aligné 4 signes sur une même ligne/colonne/diagonale).
     * Si un des joueurs a gagné, on affecte à la variable globale "run" la valeur false.
     */
    whoWins = function(){ 
        // Vérifier chaque ligne/colonne du tableau pour vérifier s'il y a un gagnant (X ou O) :
        let indice = 0;
        let table = this.table;
        let isWinner = '';
        while (indice<this.table.length && isWinner==''){
            // Vérifier la ligne à l'indice "indice"
            isWinner = TicTacToe.winnerSigns(table[indice][0], table[indice][1], table[indice][2], table[indice][3]);

            // Vérifier la colonne à l'indice "indice"
            isWinner = (isWinner == '') ? TicTacToe. winnerSigns(table[0][indice], table[1][indice], table[2][indice], table[3][indice]) : isWinner;
            indice++;
        }
    
        // Vérifier les deux diagonales pour vérifier s'il y a un gagnant (X ou O) :
        isWinner = (isWinner == '') ? TicTacToe.winnerSigns(table[0][0], table[1][1], table[2][2], table[3][3]) : isWinner;

        isWinner = (isWinner == '') ? TicTacToe.winnerSigns(table[0][3], table[1][2], table[2][1], table[3][0]) : isWinner;

        return isWinner;

    }

    checkGameEnd = function(){
        let isWinner = this.whoWins();

        if (isWinner != '') this.winner = isWinner;

        if (this.winner != '' || this.countFreeSquares() == 0){
            this.run = false;
        }
    }
    //fonction qui arrête le jeu si un joueur a gagné ou si la grille ne contient aucune case libre

    countFreeSquares = function(){ 
        let nbFreeSquares = 0;
        
        for (let i = 0; i < TAILLE ; i++){
            for (let j = 0; j <TAILLE; j++){
                if (this.table[i][j] == '') {
                    nbFreeSquares++;
                }
            }
        }
        return nbFreeSquares;
    }
    //fonction qui compte le nombre de cases libres restantes dans la grille de jeu
    
   countWinningMoves = function(signe) {
    let poss = 0; //resultat
    let table = this.table;

    //PARCOURS DES LIGNES
    for (let i = 0; i<table.length; i++) {
         if ((table[i][0]== signe) && (table[i][1]== signe) && (table[i][2]== signe) && (table[i][3]== signe)) {
             poss += 1;
         }
    }

    //PARCOURS DES COLONNES 
    for (let j = 0; j<table.length; j++) {
        if ((table[0][j]== signe) && (table[1][j]== signe) && (table[2][j]== signe) && (table[3][j]== signe)) {
         poss += 1;
        }
    }

    //PARCOURS DIAGONALE 1 \
    if ((table[0][0]== signe) && (table[1][1]== signe) && (table[2][2]== signe) && (table[3][3]== signe)) {
        poss += 1;
    }

     //PARCOURS DIAGONALE 2 /
    if ((table[0][3]== signe) && (table[1][2]== signe) && (table[2][1]== signe) && (table[3][0]== signe)) {
     poss += 1;
     }

    return poss; 
 }
  //fonction qui retourne le nombre de possibilités de gagner pour le signe entré en paramètre
    
    static equalityOfSigns = function(a,b,c,d){ 
        if (a == b && b == c && c == d && d != ''){
            return true;
        }
        return false;
    }
    //fonction statique qui renvoie vrai si un signe est aligné 4 fois de suite
    
    static winnerSigns = function(a,b,c,d){ 
        if (TicTacToe.equalityOfSigns(a,b,c,d)){
            return a;
        }
        return '';
    }
    //fonction statique qui renvoie la valeur d'un signe s'il est posé sur 4 cases alignées 

    toString = function () { 
        let a = '';
        
        for (let i = 0; i < TAILLE ; i++){
            for (let j = 0; j <TAILLE; j++){
                if (this.table[i][j] == '') a+= "[ ]";
                else a += "[" + this.table[i][j] + "]";
            }
            a+= "\n";
        }
        console.log(a);
    }
    //fonction qui affiche la grille de jeu dans la console
}


class HumanPlayer {
    constructor(signe){
        this.signe = signe;
    }
}


class AI_minimax {
    constructor(signe){
        this.signe = signe;
        this.maxNbcallMinimax = 0;
        this.profondeur = 0;
        this.profondeurTemp = 0;
    }
    
    // Cherche le mouvement optimal et le retourne.
    // Prend en paramètre le tableau de jeu, et l'objet opponent (qui peut être HumanPlayer/Minimax/Random/AlphaBeta)
    findOptimalMove = function(tictactoe, opponent){
        let table = tictactoe.table;
        let optimalMove = {};
        optimalMove.bestScore = -Infinity; // Initialiser le score à -Infinity pour être sûr qu'il soit remplacé à la première comparaison
        // Parcours du plateau de tictactoe
        for (let i = 0; i < TAILLE; i++){ 
            for (let j = 0; j < TAILLE; j++){ 
                
                if (tictactoe.checkEmpty(i,j)){ // Si la case du tableau à l'indice i*j n'est pas remplie par un X ou un O (ie personne n'a joué sur cette case) :
                    table[i][j] = this.signe; // On suppose que le joueur IA a joué sur cette case 
                    
                    let scoreMoveP1 = this.minimax(tictactoe, false, opponent); // Calcule le score pour cette possibilité 
                    tictactoe.undoMove(i,j); // On enlève le signe temporaire de la case
                
                    if (scoreMoveP1 > optimalMove.bestScore){
                        optimalMove.i = i;
                        optimalMove.j = j;
                        optimalMove.bestScore = scoreMoveP1;
                    } 
                   
                } 
                
            }
        }
        return optimalMove; // Retourner le meilleur mouvement
    }    

    // Calcule le score du mouvement, et le retourne
    // Prend en paramètre la grille de tictactoe, un booleen qui indique si c'est le tour de l'IA ou non (true = c'est le tour de l'IA, donc on récupère les scores maximum dans les noeuds fils ; false = c'est le tour de l'adversaire)
    // l'objet qui représente l'adversaire (opponent) : peut être un humain/une IA
    minimax = function (tictactoe, maximizingPlayer, opponent){
        this.maxNbcallMinimax++;
        this.profondeurTemp++;
        if (this.maxNbcallMinimax > 40000000) return 0; // C'est l'exception : le programme crashe sinon
        let gagne = tictactoe.whoWins(); // On recherche si dans la possibilité actuelle testée par l'IA, il y a un gagnant

        // On vérifie s'il y a un gagnant dans la possibilité créée par l'IA
        if (gagne != '') {
            // Recalcul de la profondeur
            if (this.profondeurTemp > this.profondeur) {
                this.profondeur = this.profondeurTemp;
            }
            this.profondeurTemp = 0;
            if (gagne == this.signe) return 100; // Si l'IA a gagné le jeu dans cette possibilité, on retourne un score de 100
            if (gagne == opponent.signe) return -100; // Si l'IA a perdu le jeu dans cette possibilité, on retourne un score de -100
        }

        // On compte le nombre de cases restantes dans le tictactoe :
        let freeSquaresTemp = tictactoe.countFreeSquares();
        if (freeSquaresTemp == 0) {
            if (this.profondeurTemp > this.profondeur) {
                this.profondeur = this.profondeurTemp;
            }
            this.profondeurTemp = 0;
            return 0; // Si personne n'a gagné le jeu, on retourne un score de 0
        }


        // Si c'est le tour du joueur à maximiser
        if (maximizingPlayer == true){
            return this.max(tictactoe, maximizingPlayer, opponent);
        } 
        else { // Si ce n'est pas le tour du joueur à maximiser
            return this.min(tictactoe, maximizingPlayer, opponent);
        }
        
    }

    // Calcule le score maximal entre tous les noeuds fils de ce noeur
    // Prend en paramètre la grille de tictactoe, un booleen qui indique si c'est le tour de l'IA ou non (true = c'est le tour de l'IA, donc on récupère les scores maximum dans les noeuds fils ; false = c'est le tour de l'adversaire)
    // l'objet qui représente l'adversaire (opponent) : peut être un humain/une IA
    max = function(tictactoe, maximizingPlayer, opponent){
        let table = tictactoe.table;
        let bestScore = -Infinity;
        let score = -Infinity;

        // Parcours du tableau de tictactoe :
        for (let i = 0; i < TAILLE; i++){ 
            for (let j = 0; j < TAILLE; j++){ 

                if (tictactoe.checkEmpty(i,j)){ // On vérifie que la case est bien vide
                    table[i][j] = this.signe; // On suppose que le joueur IA a joué sur cette case
                    
                    
                    score = this.minimax(tictactoe, !maximizingPlayer, opponent); // On calcule le score minimax avec cette possibilité
                    tictactoe.undoMove(i,j); // On retire le signe temporaire de l'IA

                    if (score > bestScore) bestScore = score; // Si le score calculé est supérieur au score stocké, on conserve le score
                }
            }
        }
        return bestScore; // Retourner le score maximal
    }

    // Calcule le score minimal entre tous les noeuds fils de ce noeur
    // Prend en paramètre la grille de tictactoe, un booleen qui indique si c'est le tour de l'IA ou non (true = c'est le tour de l'IA, donc on récupère les scores maximum dans les noeuds fils ; false = c'est le tour de l'adversaire)
    // l'objet qui représente l'adversaire (opponent) : peut être un humain/une IA
    min = function(tictactoe, maximizingPlayer, opponent){
        let table = tictactoe.table;
        let bestScore = +Infinity;
        let score = +Infinity;

        // Parcours du tableau de tictactoe :
        for (let i = 0; i < TAILLE; i++){ 
            for (let j = 0; j < TAILLE; j++){ 

                if (tictactoe.checkEmpty(i,j)){ // On vérifie que la case est bien vide
                    table[i][j] = opponent.signe; // On suppose que le joueur IA a joué sur cette case                    
                    score = this.minimax(tictactoe, !maximizingPlayer, opponent); // On calcule le score minimax avec cette possibilité
                    tictactoe.undoMove(i,j); // On retire le signe temporaire de l'IA

                    if (score < bestScore) bestScore = score; // Si le score calculé est supérieur au score stocké, on conserve le score
                }
            }
        }
        return bestScore;
    }

    // Calcule le meilleur mouvement possible, et renvoie ce mouvement.
    // Prend en paramètre la grille de tictactoe, et le joueur adverse.
    turnAI = function (tictactoe, opponent){
        let optimalMove = this.findOptimalMove(tictactoe, opponent);
        console.log("Profondeur de l'arbre : ", this.profondeur);
        console.log("Nombre de noeuds : ", this.maxNbcallMinimax);
        // Réinitialise les valeurs de profondeurs
        this.profondeur = 0;
        this.profondeurTemp = 0;
        this.maxNbcallMinimax=0;
        return optimalMove; // Retourne le mouvement optimal
    }
}

class AI_random {
    constructor(signe){
        this.signe = signe;
    }

    turnAI = function (tictactoe, opponent){
        let emptySquare = false;
        let i,j;
        let move={};
        
        while (!emptySquare){
            i = parseInt(Math.random()*4);
            j = parseInt(Math.random()*4);
            emptySquare = tictactoe.checkEmpty(i,j);
        }
        move.i = i;
        move.j = j;
        return move;
    }
} 

class AI_alphabeta { 
    constructor(signe){
        this.signe = signe;
        this.maxNbcallMinimax = 0;
        this.profondeur = 0;
        this.profondeurTemp = 0;
    }

    // Cherche le mouvement optimal et le retourne.
    // Prend en paramètre le tableau de jeu, et l'objet opponent (qui peut être HumanPlayer/Minimax/Random/AlphaBeta)
    findOptimalMove = function(tictactoe, opponent){
        let table = tictactoe.table;
        let optimalMove = {};
        optimalMove.bestScore = -Infinity; // Initialiser le score à -Infinity pour être sûr qu'il soit remplacé à la première comparaison
        // Parcours du plateau de tictactoe
        for (let i = 0; i < TAILLE; i++){ 
            for (let j = 0; j < TAILLE; j++){ 
                
                if (tictactoe.checkEmpty(i,j)){ // Si la case du tableau à l'indice i*j n'est pas remplie par un X ou un O (ie personne n'a joué sur cette case) :
                    table[i][j] = this.signe; // On suppose que le joueur IA a joué sur cette case 
                    
                    let scoreMoveP1 = this.minimax(tictactoe, false, opponent, -Infinity, +Infinity); // Calcule le score pour cette possibilité 
                    tictactoe.undoMove(i,j); // On enlève le signe temporaire de la case
                
                    // Si le score calculé est supérieur au score bestScore : le nouveau bestScore devient le score calculé juste précedemment, et on conserve les indices de la case (i,j) qui possède le meilleur score
                    if (scoreMoveP1 > optimalMove.bestScore){
                        optimalMove.i = i;
                        optimalMove.j = j;
                        optimalMove.bestScore = scoreMoveP1;
                    } 
                   
                } 
                
            }
        }
        return optimalMove; // Retourner le meilleur mouvement
    }    

    // Calcule le score du mouvement, et le retourne
    // Prend en paramètre la grille de tictactoe, un booleen qui indique si c'est le tour de l'IA ou non (true = c'est le tour de l'IA, donc on récupère les scores maximum dans les noeuds fils ; false = c'est le tour de l'adversaire)
    // l'objet qui représente l'adversaire (opponent) : peut être un humain/une IA
    // alpha, beta = les valeurs qui vont permettre de pouvoir couper les branches si besoin
    minimax = function (tictactoe, maximizingPlayer, opponent, alpha, beta){
        this.maxNbcallMinimax++;
        this.profondeurTemp++;

        if (this.maxNbcallMinimax > 10000000) return 0; // C'est l'exception : le programme crashe sinon
        let gagne = tictactoe.whoWins(); // On recherche si dans la possibilité actuelle testée par l'IA, il y a un gagnant

        // On vérifie s'il y a un gagnant dans la possibilité créée par l'IA
        if (gagne != '') {
            // Calcul de la profondeur de l'arbre
            if (this.profondeurTemp > this.profondeur) {
                this.profondeur = this.profondeurTemp;
            }
            this.profondeurTemp = 0;
            if (gagne == this.signe) return 100; // Si l'IA a gagné le jeu dans cette possibilité, on retourne un score de 100
            if (gagne == opponent.signe) return -100; // Si l'IA a perdu le jeu dans cette possibilité, on retourne un score de -100
        }

        // On compte le nombre de cases restantes dans le tictactoe :
        let freeSquaresTemp = tictactoe.countFreeSquares();
        if (freeSquaresTemp == 0) { // S'il ne reste plus de cases libres
            // Recalcul de la profondeur si besoin :
            if (this.profondeurTemp > this.profondeur) {
                this.profondeur = this.profondeurTemp;
            }
            this.profondeurTemp = 0;
            return 0; // Si personne n'a gagné le jeu, on retourne un score de 0
        }


        // Si c'est le tour du joueur à maximiser
        if (maximizingPlayer == true){
            return this.max(tictactoe, maximizingPlayer, opponent, alpha, beta);
        } 
        else { // Si ce n'est pas le tour du joueur à maximiser
            return this.min(tictactoe, maximizingPlayer, opponent, alpha, beta);
        }
        
    }

    // Calcule le score maximal entre tous les noeuds fils de ce noeur
    // Prend en paramètre la grille de tictactoe, un booleen qui indique si c'est le tour de l'IA ou non (true = c'est le tour de l'IA, donc on récupère les scores maximum dans les noeuds fils ; false = c'est le tour de l'adversaire)
    // l'objet qui représente l'adversaire (opponent) : peut être un humain/une IA
    // alpha, beta = les valeurs qui vont permettre de pouvoir couper les branches si besoin
    max = function(tictactoe, maximizingPlayer, opponent, alpha, beta){
        let table = tictactoe.table;
        let bestScore = -Infinity;
        let score = -Infinity;

        // Parcours du tableau de tictactoe :
        for (let i = 0; i < TAILLE; i++){ 
            for (let j = 0; j < TAILLE; j++){ 

                if (tictactoe.checkEmpty(i,j)){ // On vérifie que la case est bien vide
                    table[i][j] = this.signe; // On suppose que le joueur IA a joué sur cette case
                    
                    
                    score = this.minimax(tictactoe, !maximizingPlayer, opponent, alpha, beta); // On calcule le score minimax avec cette possibilité
                    tictactoe.undoMove(i,j); // On retire le signe temporaire de l'IA

                    if (score > bestScore) bestScore = score; // Si le score calculé est supérieur au score stocké, on conserve le score

                    // Recalcul de alpha si besoin : il prend la valeur max entre le bestScore et lui-même
                    alpha = (bestScore > alpha) ? bestScore : alpha; 
                    if (alpha > beta) break; // Si jamais la valeur d'alpha est > à beta : il faut couper la branche
                }
            }
        }
        return bestScore; // Retourner le score maximal calculé
    }

    // Calcule le score minimal entre tous les noeuds fils de ce noeur
    // Prend en paramètre la grille de tictactoe, un booleen qui indique si c'est le tour de l'IA ou non (true = c'est le tour de l'IA, donc on récupère les scores maximum dans les noeuds fils ; false = c'est le tour de l'adversaire)
    // l'objet qui représente l'adversaire (opponent) : peut être un humain/une IA
    // alpha, beta = les valeurs qui vont permettre de pouvoir couper les branches si besoin
    min = function(tictactoe, maximizingPlayer, opponent, alpha, beta){
        let table = tictactoe.table;
        let bestScore = +Infinity;
        let score = +Infinity;

        // Parcours du tableau de tictactoe :
        for (let i = 0; i < TAILLE; i++){ 
            for (let j = 0; j < TAILLE; j++){ 

                if (tictactoe.checkEmpty(i,j)){ // On vérifie que la case est bien vide
                    table[i][j] = opponent.signe; // On suppose que le joueur IA a joué sur cette case                    
                    score = this.minimax(tictactoe, !maximizingPlayer, opponent, alpha, beta); // On calcule le score minimax avec cette possibilité
                    tictactoe.undoMove(i,j); // On retire le signe temporaire de l'IA

                    if (score < bestScore) bestScore = score; // Si le score calculé est supérieur au score stocké, on conserve le score

                    // Recalcul de beta si besoin : il prend la valeur min entre le bestScore et lui-même
                    beta = (bestScore < alpha) ? bestScore : alpha;
                    if (alpha > beta) { // Si jamais la valeur d'alpha est > à beta : il faut couper la branche 
                        break; 
                    }
                }
            }
        }
        return bestScore; // Renvoyer le score minimal calculé
    }

    // Calcule le meilleur mouvement possible, et renvoie ce mouvement.
    // Prend en paramètre la grille de tictactoe, et le joueur adverse.
    turnAI = function (tictactoe, opponent){
        let optimalMove = this.findOptimalMove(tictactoe, opponent);
        console.log("Profondeur de l'arbre : ", this.profondeur);
        console.log("Nombre de noeuds : ", this.maxNbcallMinimax);
        // Réinitialise les valeurs de profondeurs
        this.profondeur = 0;
        this.profondeurTemp = 0;
        this.maxNbcallMinimax=0;
        return optimalMove; //Retourne le mouvement optimal
    }
}


class AI_heuristicMostWins {
    constructor(signe){
        this.signe = signe;
    }

    // Cherche le mouvement optimal et le retourne.
    // Prend en paramètre le tableau de jeu, et l'objet opponent (qui peut être HumanPlayer/Minimax/Random/AlphaBeta)
    findOptimalMove = function(tictactoe, opponent){
        let table = tictactoe.table;
        let optimalMove = {}; // Définit le mouvement optimal

        let freeSquares = tictactoe.countFreeSquares(); // Compte le nombre de cases libres dans la grille

        // Exception : il ne reste plus que 1 case libre : il faut que l'IA place son signe dans la case libre
        if (freeSquares == 1){
            for (let i = 0; i<TAILLE; i++){
                for (let j = 0; j<TAILLE; j++){
                    if (tictactoe.checkEmpty(i,j)){
                        optimalMove.i = i;
                        optimalMove.j = j;
                    }
                }
            }
            return optimalMove;
        }

        // Sinon : il reste plus qu'une case libre :
        else return this.max(tictactoe, opponent); // Retourner le mouvement associé au score maximal

    }

    // Calcule le score maximal pour l'ensemble des mouvements possibles, et renvoie le mouvement présentant le score maximal
    // Prend en paramètre la grille de tictactoe et l'objet opponent (qui peut être HumanPlayer/Minimax/Random/AlphaBeta)
    max = function(tictactoe, opponent){
        let optimalMove = {};
        optimalMove.bestScore = -Infinity; // Initialiser la valeur du meilleur score à -Infinity pour être sûr que la valeur soit remplacé dès la première comparaison

        // Parcours du tableau
        for (let i = 0; i<TAILLE; i++){
            for (let j = 0; j<TAILLE; j++){
                if (tictactoe.checkEmpty(i,j)){ // Si la case est vide

                    tictactoe.makeMove1(this.signe, i, j); // Simuler le coup du joueur MostWins dans la case
                    let score = this.minScore(tictactoe, opponent); // Calculer le score dans cette position
                    if (score > optimalMove.bestScore) { // Si le score calculé est supérieur au score stocké bestScore précedemment
                        // Remplacer le nouveau score optimal par ce nouveau score
                        optimalMove.bestScore = score;
                        optimalMove.i = i;
                        optimalMove.j = j;
                    }
                    tictactoe.undoMove(i,j); // Supprimer le mouvement temporaire placé précedemment
                }
            }
        }
        return optimalMove;
    }

    // Calcule le score maximal entre toutes les possibilités
    // Prend en paramètre la grille de tictactoe, et l'adversaire
    minScore = function(tictactoe, player2){
        let score = +Infinity; // Initialiser le score à +Infinity pour être sûr qu'il soit remplacé dès la première comparaison

        // Parcours de toutes les cases du tableau :
        for (let i = 0; i < TAILLE ; i++){
            for (let j = 0; j<TAILLE; j++){
                if (tictactoe.checkEmpty(i,j)){ // Si la case est libre :
                    tictactoe.makeMove1(player2.signe, i, j); // Simuler le mouvement du joueur adverse
                    let winningMoves = this.makeAllMove(tictactoe, this); // Calculer le score si le joueur actuel pose ses signes sur l'entièreté des cases disponibles sur la grille
                    let looseMoves = this.makeAllMove(tictactoe, player2); // Calculer le score si l'adverse pose ses signes sur l'entièreté des cases disponibles sur la grille
                    tictactoe.undoMove(i, j); // Enlever le mouvement du joueur simulé

                    if (winningMoves - looseMoves < score) score = winningMoves - looseMoves; // Calculer le score optimal : il doit être le minimal entre sa propre valeur, et la différence entre winningMoves - looseMoves
                }
            }
        }
        return score; // Retourner le score optimal
    }

    // Placer sur toutes les cases libres le signe du joueur.
    // Prend en paramètre la grille de tictactoe, et l'objet player
    makeAllMove = function(tictactoe, player){
        // Copie du tableau tictactoe afin de ne pas perdre les données :
        let tableCopy = new TicTacToe;
        for (let i = 0; i<TAILLE; i++){
            for (let j = 0; j<TAILLE; j++){
                tableCopy.table[i][j] = tictactoe.table[i][j];
                
            }
        }
        
        // Parcours du tableau copié
        for (let i = 0; i < TAILLE; i++){
            for (let j = 0; j <TAILLE ; j++){
                if (tableCopy.checkEmpty(i,j)){  // Si la case est libre :
                    tableCopy.makeMove1(player.signe, i, j); // Placer le signe sur la case libre
                }
            }
        }
        let numberOfWinningMoves = tableCopy.countWinningMoves(player.signe); // Calcule le nombre de lignes+colonnes+diagonales qui permettent au joueur de gagner

        return numberOfWinningMoves; // Retourner le nombre de lignes+colonnes+diagonales gagnanes

    }

    // Calcule le meilleur mouvement possible, et renvoie ce mouvement.
    // Prend en paramètre la grille de tictactoe, et le joueur adverse.
    turnAI = function(tictactoe, opponent){
        let optimalMove = this.findOptimalMove(tictactoe, opponent);
        return optimalMove;

    }


}