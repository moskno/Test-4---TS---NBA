const BASE_URL = 'https://nbaserver-q21u.onrender.com/api/filter';

interface Player{
    playerName: String;
    position: string; 
    twoPercent: Number; 
    threePercent: Number; 
    points: Number; 
}

const form = document.querySelector<HTMLFormElement>('#search-form')!;
const tableBody = document.querySelector<HTMLTableSectionElement>('#body-row')!;
const teamTable = document.querySelector<HTMLTableElement>('#team-container')!;



async function fetchPlayers(position: string, points: number,twoPercent: number, threePercent: number): Promise<Player[]>{
    const requestBody = {
        position,
        points,
        twoPercent,
        threePercent
    };

    const response = await fetch (BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    const players: Player[] = await response.json();
    return players;
}

function displayPlayers(players: Player[]){
    tableBody.innerHTML = '';

    players.forEach(player => {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${player.playerName}</td>
        <td>${player.position}</td>
        <td>${player.points}</td>
        <td>${player.twoPercent}</td>
        <td>${player.threePercent}%</td>
        <td>${player.threePercent}%</td>
        <td><button class="add-player-btn">Add ${player.playerName}</button></td>`;

        row.querySelector('.add-player-btn')?.addEventListener('click', () => {
            addPlayerToTeam(player);
        });

        tableBody.appendChild(row);
    });
}

function addPlayerToTeam(player: Player){

}