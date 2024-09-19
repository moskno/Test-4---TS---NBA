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
const teamTable = document.querySelector('#team-container');
const pointsOutput = document.getElementById('points-output');
const twoPercentOutput = document.getElementById('two-percent-output');
const threePercentOutput = document.getElementById('three-percent-output');
document.querySelector('#points-range').addEventListener('input', (e) => {
    pointsOutput.textContent = e.target.value;
});
document.querySelector('#two-percent-output').addEventListener('input', (e) => {
    twoPercentOutput.textContent = e.target.value;
});
document.querySelector('#three-percent-output').addEventListener('input', (e) => {
    threePercentOutput.textContent = e.target.value;
});
function fetchPlayers(position, points, twoPercent, threePercent) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestBody = {
            position,
            points,
            twoPercent,
            threePercent
        };
        const response = yield fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        const players = yield response.json();
        return players;
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
        <td>${player.twoPercent}</td>
        <td>${player.threePercent}%</td>
        <td>${player.threePercent}%</td>
        <td><button class="add-player-btn">Add ${player.playerName}</button></td>`;
        (_a = row.querySelector('.add-player-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            addPlayerToTeam(player);
        });
        tableBody.appendChild(row);
    });
}
function addPlayerToTeam(player) {
    const row = teamTable.querySelector(`tr[data-position="${player.position}"]`);
    if (row) {
        row.innerHTML = `
        <td>${player.playerName}</td>
        <td>${player.position}</td>
        <td>${player.points}</td>
        <td>${player.twoPercent}</td>
        <td>${player.threePercent}%</td>
        <td>${player.threePercent}%</td>`;
    }
}
form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const position = document.querySelector('#position-selector').value;
    const points = Number(document.querySelector('#points-range').value);
    const twoPercent = Number(document.querySelector('#field-goal-range').value);
    const threePercent = Number(document.querySelector('#3-point-range').value);
    const players = yield fetchPlayers(position, points, twoPercent, threePercent);
    displayPlayers(players);
}));
