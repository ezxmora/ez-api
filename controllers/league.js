/**
 * This thing isn't even finished yet
 */

const fetch = require('node-fetch');
const requestData = {
    method: 'GET',
    headers: {
        'X-Riot-Token': process.env.RIOT_TOKEN
    }
}

const requestInfo = (route) => {
    return new Promise((resolve, reject) => {
        fetch(route, requestData)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({status: response.status, text: response.statusText});
                }
            })
            .then(data => resolve(data))
    });
}

module.exports = {
    // Gets Summoners Rift data by name
    getSR: (req, res) => {
        requestInfo(`https://${req.body.server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(req.body.summoner)}`)
            .then((returnedUserData) => {
                requestInfo(`https://${req.body.server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${returnedUserData.id}`)
                    .then((returnedRankedData) => {
                        requestInfo(`https://${req.body.server}.api.riotgames.com/lol/match/v4/matchlists/by-account/${returnedUserData.accountId}?endIndex=20&beginIndex=0`)
                            .then((returnedMatchesData) => {
                                let matches = [];
                                for (let i = 0; i < returnedMatchesData.matches.length; i++) {
                                    requestInfo(`https://${req.body.server}.api.riotgames.com/lol/match/v4/matches/${returnedMatchesData.matches[i].gameId}`)
                                        .then((returnedMatchData) => {
                                            matches.push(returnedMatchData);
                                        })
                                        .then(() => console.log(matches))
                                        .catch((err) => {
                                            res.status(err.status).send({
                                                ok: false,
                                                error: `${err.status}: ${err.text}`
                                            })
                                        });
                                }

/*
                                const summonerData = {
                                    user: returnedUserData,
                                    ranked: returnedRankedData,
                                    recentMatches: matches
                                };
        
                                res.status(200).json({
                                    ok: true,
                                    returnedMatchesData
                                    //summonerData
                                })
*/
                            })
                            .catch((err) => {
                                res.status(err.status).send({
                                    ok: false,
                                    error: `${err.status}: ${err.text}`
                                })
                            });
                    })
                    .catch((err) => {
                        res.status(err.status).send({
                            ok: false,
                            error: `${err.status}: ${err.text}`
                        })
                    })
            })
            .catch((err) => {
                res.status(err.status).send({
                    ok: false,
                    error: `${err.status}: ${err.text}`
                })
            });
    },

    // Gets Teamfight Tactics data by name
    getTFT: (req, res) => {

    }
}