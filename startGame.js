

function startGame(choiceP1, choiceP2, choiceFirstPlayer){
    /* Fonction qui lance le jeu selon les choix de l'utilisateur.
    * Input : choiceP1 = le Player 1 choisi par l'utilisateur
    *         choiceP2 = le Player 2 choisi par l'utilisateur
    *         choiceFirstPlayer = le joueur qui doit commencer la partie
    */
    console.log("Vous avez choisi : " + choiceP1 + " et " + choiceP2 + " et qui commence : " + choiceFirstPlayer);

    // Mode : Human VS Human
    if (choiceP1 == "Human" && choiceP2 == "Human") {
        playHumanVSHuman();
    }

    // Mode : Human VS Minimax
    if ((choiceP1 == "Human" && choiceP2 == "MiniMaxAlgorithm")|| (choiceP1 == "MiniMaxAlgorithm" && choiceP2 == "Human")){
        if (choiceFirstPlayer == "Player1") playHumanVsMinimax(choiceP1);
        else playHumanVsMinimax(choiceP2);
    }

    // Mode : Human VS Random
    if ((choiceP1 == "Random" && choiceP2 == "Human") || (choiceP2 == "Random" && choiceP1 == "Human")){
        if (choiceFirstPlayer == "Player1") playHumanVsRandom(choiceP1);
        else playHumanVsRandom(choiceP2);
    }

    // Mode : Random VS Minimax
    if ((choiceP1 == "MiniMaxAlgorithm" && choiceP2 =="Random") || (choiceP2 == "MiniMaxAlgorithm" && choiceP1 =="Random")){
        if (choiceFirstPlayer =="Player1") playMinimaxVsRandom(choiceP1);
        else playMinimaxVsRandom(choiceP2);
    }

    // Mode : MiniMax VS Minimax 
    if (choiceP1 == "MiniMaxAlgorithm" && choiceP2 =="MiniMaxAlgorithm"){
        playMinimaxVsMinimax();
    }

    // Mode : Random VS Random
    if (choiceP1 == "Random" && choiceP2 =="Random"){
        playRandomVsRandom();
    }

    // Mode : AlphaBeta VS Humain
    if ((choiceP1 == "AlphaBetaAlgorithm" && choiceP2 =="Human") || (choiceP1 == "Human" && choiceP2 =="AlphaBetaAlgorithm")){
        if (choiceFirstPlayer =="Player1") playHumainVSAlphaBeta(choiceP1);
        else playHumainVSAlphaBeta(choiceP2);
    }

    // Mode AlphaBeta VS Random
    if ((choiceP1 == "AlphaBetaAlgorithm" && choiceP2 =="Random") || (choiceP2 == "AlphaBetaAlgorithm" && choiceP1 =="Random")){
        if (choiceFirstPlayer =="Player1") playAlphabetaVSRandom(choiceP1);
        else playAlphabetaVSRandom(choiceP2);
    }
    
    // Mode AlphaBeta VS MiniMax
    if ((choiceP1 == "AlphaBetaAlgorithm" && choiceP2 =="MiniMaxAlgorithm") || (choiceP2 == "AlphaBetaAlgorithm" && choiceP1 =="MiniMaxAlgorithm")){
        if (choiceFirstPlayer =="Player1") playAlphabetaVSMinimax(choiceP1);
        else playAlphabetaVSMinimax(choiceP2);
    }

    // Mode : AlphaBeta VS AlphaBeta
    if (choiceP1 == "AlphaBetaAlgorithm" && choiceP2 == "AlphaBetaAlgorithm"){
        playAlphabetaVSAlphabeta();
    }

    // Mode : MostWins VS MostWins
    if (choiceP1 == "MostWinsHeuristic" && choiceP2 == "MostWinsHeuristic"){
        playMostWinsVSMostWins();
    }

    // Mode : MostWins VS Humain
    if ((choiceP1 == "Human" && choiceP2 == "MostWinsHeuristic")|| (choiceP1 == "MostWinsHeuristic" && choiceP2 == "Human")){
        if (choiceFirstPlayer == "Player1") playHumanVSMostWins(choiceP1);
        else playHumanVSMostWins(choiceP2);
    }

    // Mode : MostWins VS Minimax
    if ((choiceP1 == "MostWinsHeuristic" && choiceP2 =="MiniMaxAlgorithm") || (choiceP2 == "MostWinsHeuristic" && choiceP1 =="MiniMaxAlgorithm")){
        if (choiceFirstPlayer =="Player1") playMostWinsVSMinimax(choiceP1);
        else playMostWinsVSMinimax(choiceP2);
    }

    // Mode : MostWins VS AlphaBeta
    if ((choiceP1 == "AlphaBetaAlgorithm" && choiceP2 =="MostWinsHeuristic") || (choiceP2 == "AlphaBetaAlgorithm" && choiceP1 =="MostWinsHeuristic")){
        if (choiceFirstPlayer =="Player1") playMostWinsVSAlphaBeta(choiceP1);
        else playMostWinsVSAlphaBeta(choiceP2);
    }

    // Mode : MostWins VS Random
    if ((choiceP1 == "Random" && choiceP2 =="MostWinsHeuristic") || (choiceP2 == "Random" && choiceP1 =="MostWinsHeuristic")){
        if (choiceFirstPlayer =="Player1") playMostWinsVSRandom(choiceP1);
        else playMostWinsVSRandom(choiceP2);
    }

}



// ----------------------------------------------------------
//  Humain VS Humain :
// ----------------------------------------------------------

function playHumanVSHuman(){ // Se lance si l'utilisateur a choisi deux humains en tant que Player1 et Player2.
    // Initialiser la table de jeu tictactoe :
    let tictactoe = new TicTacToe;

    // Initialiser les 2 joueurs humains :
    let p1 = new HumanPlayer("X");
    let p2 = new HumanPlayer("O");

    // Affichage du message en dessous du jeu :
    startGamePringMsg("Human", "Human");

    // Initialiser le joueur courant à p1 :
    let currentPlayer = p1;

    // Evènement javascript pour chaque clique sur la table = le signe correspondant au joueur actuel est posé sur la table
    tableTicTacToe.onclick = function(event){
        if (currentPlayer == p1) { // Si le joueur courant est le Player 1
            currentPlayer = turnHuman(p1, p2, tictactoe, event);
        }
        else {  // Sinon : le joueur courant est le Player 2.
            currentPlayer = turnHuman(p2, p1, tictactoe, event);
        }
            
        checkEndPrintMsg(tictactoe);

    }
}


// ----------------------------------------------------------
// Humain VS MinimaxAlgo :
// ----------------------------------------------------------

function playHumanVsMinimax(choiceFirstPlayer){
    // Définir l'ordre dans lequel les deux joueurs (humain/minimax) vont jouer :
    let p1 = new HumanPlayer("O");
    let p2 = new AI_minimax("X");
    startGamePringMsg("AI MiniMax", "Human");

    // Définir le plateau de jeu :
    let tictactoe = new TicTacToe;

    // Dans le cas où l'IA doit jouer en premier, il joue son tour directement :
    if (choiceFirstPlayer == "MiniMaxAlgorithm") {
        turnAI(p2, p1, tictactoe);
    }

    // Boucle de jeu :
    tableTicTacToe.onclick = function(event){
        humanVSAI(p1, p2, tictactoe, event);
    }
    
}


// ----------------------------------------------------------
// Humain VS Random :
// ----------------------------------------------------------
function playHumanVsRandom(choiceFirstPlayer){
    // Définir l'ordre dans lequel les deux joueurs vont jouer :
    let p1 = new HumanPlayer("O");
    let p2 = new AI_random("X");
    startGamePringMsg("AI Random", "Human");

    // Définir le plateau de jeu :
    let tictactoe = new TicTacToe;

    // Dans le cas où l'IA doit jouer en premier, il joue son tour directement :
    if (choiceFirstPlayer == "Random") {
        turnAI(p2, p1, tictactoe);
    }

    // Boucle de jeu :
    tableTicTacToe.onclick = function(event){
        humanVSAI(p1, p2, tictactoe, event);
    }

}


// ----------------------------------------------------------
// Minimax VS Random :
// ----------------------------------------------------------
function playMinimaxVsRandom(choiceFirstPlayer){
    // Définition des deux joueurs :
    let p1 = new AI_minimax("X");
    let p2 = new AI_random("O");
    startGamePringMsg("AI MiniMax", "AI Random");

    let tictactoe = new TicTacToe;

    // Si le premier joueur est Random
    if (choiceFirstPlayer == "Random"){
        turnAI(p2, p1, tictactoe);
        AIvsAI(p1, p2, tictactoe);
    } else AIvsAI(p1, p2, tictactoe);
}


// ----------------------------------------------------------
// Minimax VS Minimax :
// ----------------------------------------------------------
function playMinimaxVsMinimax(){
    let p1 = new AI_minimax("X");
    let p2 = new AI_minimax("O");
    startGamePringMsg("AI MiniMax", "AI MiniMax");
    let tictactoe = new TicTacToe;

    AIvsAI(p1, p2, tictactoe);
}


// ----------------------------------------------------------
// Random VS Random :
// ----------------------------------------------------------
function playRandomVsRandom(){
    let p1 = new AI_random("X");
    let p2 = new AI_random("O");
    startGamePringMsg("AI Random", "AI Random");
    let tictactoe = new TicTacToe;

    AIvsAI(p1, p2, tictactoe);
}



// ----------------------------------------------------------
// Humain VS AlphaBeta :
// ----------------------------------------------------------
function playHumainVSAlphaBeta(choiceFirstPlayer){
    // Définir l'ordre dans lequel les deux joueurs vont jouer :
    let p1 = new HumanPlayer("O");
    let p2 = new AI_alphabeta("X");
    startGamePringMsg("AI AlphaBeta", "Human");

    // Définir le plateau de jeu :
    let tictactoe = new TicTacToe;

    // Dans le cas où l'IA doit jouer en premier, il joue son tour directement :
    if (choiceFirstPlayer == "AlphaBetaAlgorithm") {
        turnAI(p2, p1, tictactoe);
    }

    // Boucle de jeu :
    tableTicTacToe.onclick = function(event){
        humanVSAI(p1, p2, tictactoe, event);
    }
}


// ----------------------------------------------------------
// AlphaBeta VS AlphaBeta :
// ----------------------------------------------------------
function playAlphabetaVSAlphabeta(){
    let p1 = new AI_alphabeta("X");
    let p2 = new AI_alphabeta("O");
    startGamePringMsg("AI AlphaBeta", "AI AlphaBeta");
    let tictactoe = new TicTacToe;

    AIvsAI(p1, p2, tictactoe);
}


// ----------------------------------------------------------
// AlphaBeta VS Random :
// ----------------------------------------------------------
function playAlphabetaVSRandom(choiceFirstPlayer){
    let p1 = new AI_alphabeta("X");
    let p2 = new AI_random("O");
    startGamePringMsg("AI AlphaBeta", "AI Random");

    let tictactoe = new TicTacToe;

    if (choiceFirstPlayer == "Random"){
        turnAI(p2, p1, tictactoe);
        AIvsAI(p1, p2, tictactoe);
    } else AIvsAI(p1, p2, tictactoe);
}


// ----------------------------------------------------------
// AlphaBeta VS Minimax :
// ----------------------------------------------------------
function playAlphabetaVSMinimax(choiceFirstPlayer){
    let p1 = new AI_alphabeta("X");
    let p2 = new AI_minimax("O");
    startGamePringMsg("AI AlphaBeta", "AI Minimax");

    let tictactoe = new TicTacToe;

    if (choiceFirstPlayer == "MiniMaxAlgorithm"){
        turnAI(p2, p1, tictactoe);
        AIvsAI(p1, p2, tictactoe);
    } else AIvsAI(p1, p2, tictactoe);
}


// ----------------------------------------------------------
// MostWins VS MostWins :
// ----------------------------------------------------------
function playMostWinsVSMostWins(){
    let p1 = new AI_heuristicMostWins("X");
    let p2 = new AI_heuristicMostWins("O");
    startGamePringMsg("AI MostWins", "AI MostWins");
    let tictactoe = new TicTacToe;

    AIvsAI(p1, p2, tictactoe);
}



// ----------------------------------------------------------
//  MostWins VS Human :
// ----------------------------------------------------------
function playHumanVSMostWins(choiceFirstPlayer){
    // Définir l'ordre dans lequel les deux joueurs vont jouer :
    let p1 = new HumanPlayer("O");
    let p2 = new AI_heuristicMostWins("X");
    startGamePringMsg("AI MostWins", "Human");

    // Définir le plateau de jeu :
    let tictactoe = new TicTacToe;

    // Dans le cas où l'IA doit jouer en premier, il joue son tour directement :
    if (choiceFirstPlayer == "MostWinsHeuristic") {
        turnAI(p2, p1, tictactoe);
    }

    // Boucle de jeu :
    tableTicTacToe.onclick = function(event){
        humanVSAI(p1, p2, tictactoe, event);
    }
    
}


// ----------------------------------------------------------
//  MostWins VS Minimax :
// ----------------------------------------------------------
function playMostWinsVSMinimax(choiceFirstPlayer){
    let p1 = new AI_minimax("X");
    let p2 = new AI_heuristicMostWins("O");
    startGamePringMsg("AI MiniMax", "AI MostWins");

    let tictactoe = new TicTacToe;

    if (choiceFirstPlayer == "MostWinsHeuristic"){
        turnAI(p2, p1, tictactoe);
        AIvsAI(p1, p2, tictactoe);
    } else AIvsAI(p1, p2, tictactoe);
}


// ----------------------------------------------------------
//  MostWins VS Random :
// ----------------------------------------------------------
function playMostWinsVSRandom(choiceFirstPlayer){
    let p1 = new AI_random("X");
    let p2 = new AI_heuristicMostWins("O");
    startGamePringMsg("AI Random", "AI MostWins");

    let tictactoe = new TicTacToe;

    if (choiceFirstPlayer == "MostWinsHeuristic"){
        turnAI(p2, p1, tictactoe);
        AIvsAI(p1, p2, tictactoe);
    } else AIvsAI(p1, p2, tictactoe);
}


// ----------------------------------------------------------
//  MostWins VS AlphaBeta :
// ----------------------------------------------------------
function playMostWinsVSAlphaBeta(choiceFirstPlayer){
    let p1 = new AI_alphabeta("X");
    let p2 = new AI_heuristicMostWins("O");
    startGamePringMsg("AI AlphaBeta", "AI MostWins");

    let tictactoe = new TicTacToe;

    if (choiceFirstPlayer == "MostWinsHeuristic"){
        turnAI(p2, p1, tictactoe);
        AIvsAI(p1, p2, tictactoe);
    } else AIvsAI(p1, p2, tictactoe);
}



// ----------------------------------------------------------
// Tour d'une IA : 
function turnAI(playerAI, opponent, tictactoe){ 
    /* Fonction qui permet à l'IA de jouer son tour.
    * Input : playerAI = l'objet IA qui joue actuellement (Minimax/Random/AlphaBeta)
    *         opponent = l'objet qui joue l'adversaire (Minimax/Random/AlphaBeta/Human)
    *         tictactoe = le plateau de jeu
    */
    if (tictactoe.run == true){ // Si la partie est toujours en cours
        let move = playerAI.turnAI(tictactoe, opponent); // Récupérer le meilleur mouvement possible
        return makeMoveAI(move, playerAI, opponent, tictactoe);
    }
    
}

function makeMoveAI(move, player, opponent, tictactoe){
    /* Fonction qui permet à l'IA de placer son signe sur la grille.
    * Input : player = l'objet IA qui joue actuellement (Minimax/Random/AlphaBeta)
    *         opponent = l'objet qui joue l'adversaire (Minimax/Random/AlphaBeta/Human)
    *         tictactoe = le plateau de jeu
    */
    let squareNumber = String(move.i) + String(move.j); // Récupère l'identifiant de la case i*j sur laquelle l'IA doit jouer
    let squareToChange = document.getElementById(squareNumber); // Récupère la case sur le document HTML
    squareToChange.innerHTML = player.signe; // Place le signe de l'IA sur la case visée
    tictactoe.makeMove2(player.signe, move); // Réalise le mouvement de l'IA dans la grille de tictactoe
    return opponent;
}


// ----------------------------------------------------------
// Tour d'un humain :
function turnHuman(playerHuman, opponent, tictactoe, event){
    /* Fonction qui permet au joueur humain de jouer son tour
    * Input : playerHuman = l'objet Human qui joue actuellement
    *         opponent = l'objet qui joue l'adversaire (Minimax/Random/AlphaBeta/Human)
    *         tictactoe = le plateau de jeu
    *         event = l'évènement clic sur la table HTML
    * Output : le joueur suivant (soit playerHuman si son tour n'a pas pu être réalisé, sinon l'opponent)
    */

    // Récupération de l'identifiant de la case du tableau sur laquelle le joueur a cliqué sur le document HTML
    let i = parseInt(event.target.id[0]); // Récupère la ligne
    let j = parseInt(event.target.id[1]); // Récupère la colonne

    // Si la partie est toujours en run (et que les indices i et j sont valides)
    if (tictactoe.run == true && (!isNaN(i) && !isNaN(j))){
        if (tictactoe.checkEmpty(i,j)) { // Vérifier que la case est bien libre
            return makeMoveHuman(event, playerHuman, opponent, i, j, tictactoe); //Placer le signe sur la case visée
        } else return playerHuman;
    } else return playerHuman;
}

function makeMoveHuman(event, player, opponent, i, j, tictactoe){
    /* Permet de réaliser le mouvement que l'utilisateur a choisi de faire pour poser son signe dans la table HTML. 
    * Input : event = l'évènement associé
    *         player = le joueur qui est en train de jouer.
    *         opponent = le joueur adverse
    *         i, j = les coordonnées de la case
    * Output : le nouveau joueur actuel, qui est l'adversaire
    */
    event.target.innerHTML = player.signe; // Place le signe du joueur sur la case visée
    tictactoe.makeMove1(player.signe, i, j); // Réalise le mouvement de l'humain dans la grille de tictactoe
    return opponent;
}


// ----------------------------------------------------------
// Tour humain VS une IA :
function humanVSAI(p1, p2, tictactoe, event){
    /* Permet de réaliser le tour de jeu d'un humain VS une IA
    * Input : p1 = l'objet Human/IA qui va commencer à jouer
    *         p2 = l'objet Human/IA qui va jouer ensuite
    *         tictactoe = la grille de jeu
    *         event = l'évènement clic sur la table HTML
    */
    let currentPlayer;
    currentPlayer = turnHuman(p1, p2, tictactoe, event); //Réalise le tour de l'humain
    checkEndPrintMsg(tictactoe); // Vérifie si la partie n'est pas terminée

    if (currentPlayer == p2) { // Si le joueur courant est p2
        currentPlayer = turnAI(p2, p1, tictactoe); // Le joueur p2 réalise son tour
        checkEndPrintMsg(tictactoe); // Vérifier si la partie n'est pas terminée
    }
}


// ----------------------------------------------------------
let arrX=[];
let arrO=[];
// Tour IA vs IA :
function AIvsAI(p1, p2, tictactoe){
     /* Permet de réaliser le tour de jeu d'un IA VS une IA
    * Input : p1 = l'objet IA qui va commencer à jouer
    *         p2 = l'objet IA qui va jouer ensuite
    *         tictactoe = la grille de jeu
    */

    let fin, debut;
    if (tictactoe.run == true){ // Si le jeu est bien en cours
       
        console.log("Player = " + p1.signe); // Affichage dans la console du joueur p1
        debut = new Date(); // Définition d'un objet Date, qui permet de calculer le temps pour un tour d'une IA
        turnAI(p1, p2, tictactoe); // Réalisation du tour de l'IA
        fin = new Date(); // Définition d'un objet Date, qui permet de calculer le temps pour un tour d'une IA
        let res = (fin.getTime() - debut.getTime()); // Calcule du temps d'un tour

        console.log('Durée du tour : ' + res + ' msec');

        // Mettre les durées dans le tableau correspondant
        if (p1.signe == "X") {
            arrX.push(res);
        }
        else {
            arrO.push(res);
        }
        

        checkEndPrintMsg(tictactoe); // Vérifier si le jeu est à la fin, et si oui, afficher le message de fin
        AIvsAI(p2, p1, tictactoe); // Réalise le tour de l'autre IA
    } else {
        console.log("Tableau joueur X ", arrX);
        console.log("Tableau joueur O ",  arrO); 
        return;
    }
    

}



// ----------------------------------------------------------
// Fonctions de fin de jeu :

function printWinnerIG(tictactoe){
    /* Permet d'afficher le gagnant dans la fenetre de jeu.
    * Input : tictactoe = le tableau de morpion sur lesquels les joueurs jouent
    */
    if (tictactoe.winner != "") {
        printWinner.innerHTML = tictactoe.winner +" won the game !";

    }
    else {
        printWinner.innerHTML = "Nobody won the game..."
    }
    
}

function checkEndPrintMsg(tictactoe){
    // Vérifier si la partie n'est pas terminée :
    tictactoe.checkGameEnd();
        
    // Si la partie est terminée : affichage du message de fin :
    if (tictactoe.run == false){
        printWinnerIG(tictactoe);
    }
}

// ----------------------------------------------------------
// Fonctions d'affichage des joueurs :
function startGamePringMsg(choiceX, choiceO){
    let WhoIsP1 = document.getElementById("WhoIsP1");
    let WhoIsP2 = document.getElementById("WhoIsP2");

    WhoIsP1.innerHTML = "Player 1 ("+choiceX+") plays X"+"</br>";
    WhoIsP2.innerHTML = "Player 2 ("+choiceO+ ") plays O";
}
