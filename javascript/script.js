"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = 'https://nbaserver-q21u.onrender.com/api/filter';
const form = document.querySelector('#search-form');
const tableBody = document.querySelector('#body-row');
const pointsOutput = document.getElementById('points-output');
const twoPercentOutput = document.getElementById('two-percent-output');
const threePercentOutput = document.getElementById('three-percent-output');
document.querySelector('#points-range').addEventListener('input', (e) => {
    const target = e.target;
    pointsOutput.textContent = target.value;
});
document.querySelector('#field-goal-range').addEventListener('input', (e) => {
    const target = e.target;
    twoPercentOutput.textContent = target.value + '%';
});
document.querySelector('#three-point-range').addEventListener('input', (e) => {
    const target = e.target;
    threePercentOutput.textContent = target.value + '%';
});
function fetchPlayers(position, points, twoPercent, threePercent) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestBody = {
            position,
            points,
            twoPercent,
            threePercent
        };
        try {
            const response = yield fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                throw new Error('Failed to fetch players');
            }
            const players = yield response.json();
            return players;
        }
        catch (error) {
            console.error('Error fetching players:', error);
            alert(`Error fetching players: ${error}`);
            return [];
        }
    });
}
function displayPlayers(players) {
    tableBody.innerHTML = '';
    players.forEach(player => {
        var _a;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.playerName}</td>
            <td>${player.position}</td>
            <td>${player.points}</td>
            <td>${player.twoPercent}%</td>
            <td>${player.threePercent}%</td>
            <td><button class="add-player-btn">Add ${player.playerName}</button></td>`;
        (_a = row.querySelector('.add-player-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            addPlayerToTeam(player);
        });
        tableBody.appendChild(row);
    });
}
function addPlayerToTeam(player) {
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
form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const position = document.querySelector('#position-selector').value;
    const points = Number(document.querySelector('#points-range').value);
    const twoPercent = Number(document.querySelector('#field-goal-range').value);
    const threePercent = Number(document.querySelector('#three-point-range').value);
    const players = yield fetchPlayers(position, points, twoPercent, threePercent);
    displayPlayers(players);
}));
