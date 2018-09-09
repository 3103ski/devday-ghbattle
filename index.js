$(function() {

    var score1;
    var score2;
    var player1;
    var player2;

    function evaluateScores() {
        if (score1 && score2) {
            if (score1 > score2) {
                console.log('Player 1 Wins');
                document.querySelector('#game_title').textContent = player1 + ' wins with ' + score1.toFixed(2) + ' points!';
            } else if (score1 === score2) {
                console.log('it is a tie');
                document.querySelector('#game_title').textContent = player1 + ' and ' + player2 + ' both have the same score!';
            } else {
                console.log('Player 2 Wins!');
                document.querySelector("#user1").value = '';
                document.querySelector("#user2").value = '';
                document.querySelector('#game_title').textContent = player2 + ' wins with ' + score2.toFixed(2) + ' points!';
            }
        }
    }

    $('#battlebtn').on('click', function(e) {
        e.preventDefault();
        $('#ghapidata').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

        player1 = $('#user1').val();
        player2 = $('#user2').val();
        var p1call = 'https://api.github.com/search/users?q=' + player1;
        var p2call = 'https://api.github.com/search/users?q=' + player2;

        requestJSON(p1call, function(json) {
            if (json.message == "Not Found" || player1 == '') {
                $('#ghapidata').html("<h2>No User Info Found</h2>");
            } else {
                score1 = json.items[0].score;
                evaluateScores();
            }
        });

        requestJSON(p2call, function(json) {
            if (json.message == "Not Found" || player2 == '') {
                $('#ghapidata').html("<h2>No User Info Found</h2>");
            } else {
                score2 = json.items[0].score;
                evaluateScores();
            }
        });

    });


    function requestJSON(url, callback) {
        $.ajax({
            url: url,
            complete: function(xhr) {
                callback.call(null, xhr.responseJSON);
            }
        });
    }

});