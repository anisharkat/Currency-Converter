var UserInput;
document.getElementById("amount").addEventListener("change", function () {
    UserInput = document.getElementById("amount").value;
    console.log(UserInput);
});

var currencyData;

axios.get('https://api.currencyapi.com/v3/latest?apikey=cur_live_I57XDbOhQrJW1ZBR3e2qFQXIS4tOd5hiejzWwuge')
    .then(function (response) {
        currencyData = response.data.data;
        for (const key in currencyData) {
            if (currencyData.hasOwnProperty(key)) {
                const currcode = currencyData[key].code;
                document.getElementById("from-currency").innerHTML += `<option value="${currcode}">${currcode}</option>`;
                document.getElementById("to-currency").innerHTML += `<option value="${currcode}">${currcode}</option>`;
            }
        }
    })
    .catch(function (error) {
        alert(error);
    });

document.getElementById("convert-btn").addEventListener("click", function () {
    var fromCurrency = document.getElementById("from-currency").value;
    var toCurrency = document.getElementById("to-currency").value;

    if (currencyData && UserInput && fromCurrency && toCurrency) {
        var fromCurrencyValue = currencyData[fromCurrency].value;
        var toCurrencyValue = currencyData[toCurrency].value;

        var convertedValue = (UserInput * toCurrencyValue / fromCurrencyValue).toFixed(2);

        document.getElementById("result").innerHTML = `${UserInput} ${fromCurrency} = ${convertedValue} ${toCurrency}`;
    } else {
        alert("Please fill in all fields.");
    }
});
