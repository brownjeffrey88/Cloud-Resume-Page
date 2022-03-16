window.onload = myFunc();

//using put request to increment value and use returned value as page count to limit api calls.
async function myFunc() {
    const API_ENDPOINT = 'https://eo25bf76gc.execute-api.us-east-1.amazonaws.com/prod/serverless';
    //update visit counter
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var raw = "{\r\n    \"name\": \"visitCount\"\r\n}";


    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    const response = await fetch(API_ENDPOINT, requestOptions);
    const incoming = await response.json();
    console.log(incoming.Attributes.Visitors);
    var count = incoming.Attributes.Visitors;

    var visitCount = document.getElementById("count");
    visitCount.innerHTML = count;

}