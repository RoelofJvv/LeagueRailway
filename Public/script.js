const apiKey = 'RGAPI-19840061-d645-4c33-a52c-a98a8c117b51';

        document.getElementById('getRankButton').addEventListener('click', () => {
            const summonerName = document.getElementById('summonerName').value;

            // Make a request to the Riot API
            fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    const summonerId = data.id;
                    return fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`);
                })
                .then(response => response.json())
                .then(data => {
                    // Assuming the player has a ranked solo/duo queue entry
                    const rankedEntry = data.find(entry => entry.queueType === 'RANKED_SOLO_5x5');
                    if (rankedEntry) {
                        document.getElementById('rankOutput').textContent = `Summoner ${summonerName} is in ${rankedEntry.tier} ${rankedEntry.rank} with ${rankedEntry.leaguePoints} LP`;
                    } else {
                        document.getElementById('rankOutput').textContent = `Summoner ${summonerName} is unranked.`;
                    }
                })
                .catch(error => {
                    document.getElementById('rankOutput').textContent = `Error: ${error.message}`;
                });
        });
        //<script src="script.js"></script>