window.currenciesBackup = [];

function filterCurrencies(searchValue) {
    var result = [];
    for(var currency of currenciesBackup) {
      var currencyName = currency.txt.toLowerCase();
      var currencyRate = currency.rate.toFixed(2) + "";
      if(currencyName.indexOf(searchValue) >= 0 || currencyRate.indexOf(searchValue) >= 0) {
        result.push(currency);
      }
    }
    renderCurrencies(result);
}
  
function renderCurrencies(currencies) {
    
    var htmlStr = "";

    for (var currency of currencies) {
        htmlStr += `<tr>
        <td>${currency.txt}</td>
        <td class="text-right">${currency.rate.toFixed(2)}</td>
        </tr>`
    };

    document.getElementById("currencies").innerHTML = htmlStr;

}

fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20221110&json').then(res => res.json()).then(function(data) {
  window.currenciesBackup = data;
  renderCurrencies(data);
});

var search = document.getElementById("search");

search.onkeyup = function(event) {
    var searchValue = event.currentTarget.value;
    filterCurrencies(searchValue.trim().toLowerCase());
}
