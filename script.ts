const BASE_URL = 'https://nbaserver-q21u.onrender.com/api/filter';

interface Player {
    playerName: string;
    position: string;
    twoPercent: number;
    threePercent: number;
    points: number;
}

const form = document.querySelector<HTMLFormElement>('#search-form')!;
const tableBody = document.querySelector<HTMLTableSectionElement>('#body-row')!;
const pointsOutput = document.getElementById('points-output') as HTMLSpanElement;
const twoPercentOutput = document.getElementById('two-percent-output') as HTMLSpanElement;
const threePercentOutput = document.getElementById('three-percent-output') as HTMLSpanElement;

document.querySelector<HTMLInputElement>('#points-range')!.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    pointsOutput.textContent = target.value;
});

document.querySelector<HTMLInputElement>('#field-goal-range')!.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    twoPercentOutput.textContent = target.value + '%';
});

document.querySelector<HTMLInputElement>('#three-point-range')!.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    threePercentOutput.textContent = target.value + '%';
});

async function fetchPlayers(position: string, points: number, twoPercent: number, threePercent: number): Promise<Player[]> {
    const requestBody = {
        position,
        points,
        twoPercent,
        threePercent
    };

    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch players');
        }

        const players: Player[] = await response.json();
        return players;
    } catch (error) {
        console.error('Error fetching players:', error);
        alert(`Error fetching players: ${error}`);
        return [];
    }
}

function displayPlayers(players: Player[]) {
    tableBody.innerHTML = '';

    players.forEach(player => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${player.playerName}</td>
            <td>${player.position}</td>
            <td>${player.points}</td>
            <td>${player.twoPercent}%</td>
            <td>${player.threePercent}%</td>
            <td><button class="add-player-btn">Add ${player.playerName}</button></td>`;

        row.querySelector('.add-player-btn')?.addEventListener('click', () => {
            addPlayerToTeam(player);
        });

        tableBody.appendChild(row);
    });
}

function addPlayerToTeam(player: Player) {
    const playerBoxId = `${player.position.toLowerCase()}-box`;
    const playerBox = document.getElementById(playerBoxId);

    if (playerBox) {
        playerBox.innerHTML = `
            <strong>${player.position}</strong><br>
            ${player.playerName}<br>
            Points: ${player.points}<br>
            FG%: ${player.twoPercent}%<br>
            3P%: ${player.threePercent}%`;
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const position = (document.querySelector('#position-selector') as HTMLSelectElement).value;
    const points = Number((document.querySelector('#points-range') as HTMLInputElement).value);
    const twoPercent = Number((document.querySelector('#field-goal-range') as HTMLInputElement).value);
    const threePercent = Number((document.querySelector('#three-point-range') as HTMLInputElement).value);

    const players = await fetchPlayers(position, points, twoPercent, threePercent);
    displayPlayers(players);
});


