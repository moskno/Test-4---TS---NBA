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
const pointsOutput = document.getElementById('points-output')as HTMLSpanElement;
const twoPercentOutput = document.getElementById('two-percent-output')as HTMLSpanElement;
const threePercentOutput = document.getElementById('three-percent-output')as HTMLSpanElement;

document.querySelector('#points-range')!.addEventListener('input', (e) => {
    pointsOutput.textContent = (e.target as HTMLInputElement).value;
});

document.querySelector('#two-percent-output')!.addEventListener('input', (e) => {
    twoPercentOutput.textContent = (e.target as HTMLInputElement).value;
});

document.querySelector('#three-percent-output')!.addEventListener('input', (e) => {
    threePercentOutput.textContent = (e.target as HTMLInputElement).value;
});



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
    const row = teamTable.querySelector(`tr[data-position="${player.position}"]`);
    
    if(row){
        row.innerHTML = `
        <td>${player.playerName}</td>
        <td>${player.position}</td>
        <td>${player.points}</td>
        <td>${player.twoPercent}</td>
        <td>${player.threePercent}%</td>
        <td>${player.threePercent}%</td>`;
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const position = (document.querySelector('#position-selector') as HTMLSelectElement).value;
    const points = Number((document.querySelector('#points-range') as HTMLInputElement).value);
    const twoPercent = Number((document.querySelector('#field-goal-range') as HTMLInputElement).value);
    const threePercent = Number((document.querySelector('#3-point-range') as HTMLInputElement).value);
    const players = await fetchPlayers(position, points, twoPercent, threePercent);
    displayPlayers(players);
})




