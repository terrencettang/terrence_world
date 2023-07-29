function getInfo(json) {
    document.getElementById("ipAddress").innerHTML = json.ip;
    document.getElementById("version").innerHTML = json.version;
    document.getElementById("isp").innerHTML = json.org;
    document.getElementById("country_code").innerHTML = json.country_code;
    document.getElementById("country_code_iso3").innerHTML = json.country_code_iso3;
    ;
    document.getElementById("utd_offset").innerHTML = json.utc_offset;
    if (json.postal === null) {
        document.getElementById("postal").innerHTML = "NA"
    }
    else {
        document.getElementById("postal").innerHTML = json.postal
    }
    if (json.country_code === "HK") {
        document.getElementById("city").innerHTML = json.country_name;
        document.getElementById("country").innerHTML = "China";
    }
    else if (json.country_code === "MO"){
        document.getElementById("city").innerHTML = json.country_name;
        document.getElementById("country").innerHTML = "China";
    }
    else if (json.country_code === "TW"){
        document.getElementById("city").innerHTML = json.country_name;
        document.getElementById("country").innerHTML = "China";
    }
    else {
        document.getElementById("city").innerHTML = json.city;
        document.getElementById("country").innerHTML = json.country_name;
    }
}
var script = document.createElement("script");
script.src = "https://ipapi.co/jsonp/?callback=getInfo";
document.getElementsByTagName("head")[0].appendChild(script);