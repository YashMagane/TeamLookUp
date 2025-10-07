// referencing HTML elements
var searchButton = document.querySelector(".search__button");
var teamInput = document.querySelector("input");
var playersSection = document.querySelector(".players__table");

// API key
var API_KEY = "e555a517fa587455d4bccdcc0f8693b5";

// Fetching player data from API
function fetchPlayers(teamName) {
    playersSection.style.display = "block"; //showing table
    fetch("https://v3.football.api-sports.io/teams?search=" + encodeURIComponent(teamName), {
        headers: { "x-apisports-key": API_KEY }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(teamData) {
        var teamId = teamData.response[0].team.id;
        console.log('Teams ID: '+ teamId + ' ID');
        fetch("https://v3.football.api-sports.io/players?team=" + teamId + "&season=2023", {
            headers: { "x-apisports-key": API_KEY } //players from the team
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(playersData) { //extracting players
            var players = [];
            for (var i = 0; i < playersData.response.length; i++) {
                players.push(playersData.response[i].player.name);
            }

            console.log('Players' + players + ':');
            updatePlayerTable(players);
        });
    });
}

//Event listener for button
searchButton.addEventListener("click", function() {
    var teamName = teamInput.value.trim().toLowerCase();
    console.log('Input ' + teamName + ':');
    fetchPlayers(teamName);
});

//set up the table
function updatePlayerTable(players) {
    var playersList = document.querySelector(".players-table");
    playersList.innerHTML = "";
    players.forEach(function(playerName) {
        var li = document.createElement("li");
        li.textContent = playerName;
        playersList.appendChild(li);
    });
}
