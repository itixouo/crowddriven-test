import * as transaction from './transaction';

let token = 0;
window.addEventListener('load', function () {

    getAccount();

});



const closeButton = document.getElementById("close-button");
closeButton.addEventListener("click", toggleUI);
toggleUI();



function toggleUI() {

    var x = document.getElementById("ui");
    if (x.style.display === "none") {
        x.style.display = "block";
        x.style.pointerEvents = "auto";
    } else {
        x.style.pointerEvents = "none";
        x.style.display = "none";
    }

}




// const testButton = document.getElementById("test-button");
// testButton.onclick = function () {

//     console.log("call");
//     getTransactionCoins() ;
// };





const exchangeButton = document.getElementById("exchange-button");
exchangeButton.onclick = function () {

    console.log("exchange");
    sendTransactionExchange(token);
};






const tokenButton = document.getElementById("token-button");
tokenButton.onclick = function () {

    console.log("get token");
    token++;

    renderToken();
};

function renderToken() {
    document.getElementById("token-text").innerHTML = "count : " + token;

}


function getTransactionCoins() {
    transaction.getCoins().then(
        function (value) {
            console.log("Coins : " + value)
            document.getElementById("coin-text").innerHTML = "coins : " + value;
        },
        function (error) { console.log(error) }

    );

}

function sendTransactionExchange(value) {
    transaction.exchange(value).then(
        function (value) {
            getTransactionCoins()
            token = 0;
            renderToken();
        },
        function (error) { console.log(error) }


    );
}

function getAccount() {


        transaction.getAccount().then(
            function (value) {
                console.log(value);
                let firstAcc = value;
                document.getElementById("account-text").innerHTML = firstAcc;
                transaction.setTransactionAccount(firstAcc);
                getTransactionCoins();
            },
            function (error) { console.log(error) }

        );


}