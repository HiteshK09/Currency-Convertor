const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromcurr =  document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

let rates;
let Rate;


for(let select of dropdowns){
    for(let currcode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if(select.name ==="from" && currcode==="USD"){
        newOption.selected = "selected";
    }else if(select.name==="to" && currcode==="INR"){
        newOption.selected="selected";
    }
    select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element)=>{
    
let currCode = element.value;
let countryCode = countryList[currCode];
// console.log(countryCode);
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let flagImg = element.parentElement.querySelector("img");
// let flagImg = document.querySelector(".select-container img");
// console.log(flagImg);
flagImg.src = newSrc;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal);
    if(amtVal ==="" || amtVal < 1){
        amtVal = 1;
        amount.value="1";
    }

    let response = await fetch(baseUrl);
    let data = await response.json();

    // console.log("DATA: ",data);
    let rates = data.eur;
    // console.log("Rates",rates);
    let rate = rates[tocurr.value.toLowerCase()]/rates[fromcurr.value.toLowerCase()];


    let finalAmt = rate*amtVal;

    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmt} ${tocurr.value}`;

});
