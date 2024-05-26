// const { email } = require("svelte-use-form");

const nim = "105841109519";
const nip = "0903058406";
const mail = "rahmatg811@gmail.com";
const emailDosen = "titinwahyuni@unismuh.ac.id";
// const nimNidn = document.getElementById('nim_nidnPa');
// const mail = document.getElementById('email').value;

// const nim = nimNidn.value;
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJuYW1lIjoiMDkzMTA4NzkwMSIsImRlcGFydG1lbnQiOiJJbmZvcm1hdGlrYSIsInJvbGUiOiJEb3NlbiJ9LCJpYXQiOjE3MTQ4MTMxMTYsImV4cCI6MTcxNDg0OTExNn0.Vjap1Pusj8ncdIQMA7Qo1UC-EO3EEdegDQykQ57s0Q0";

async function fetchData() {
    try {
        const response = await fetch('https://sicekcok.if.unismuh.ac.id/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                query: `
                    query MahasiswaInfo {
                        mahasiswa(nim: "${nim}"){
                            nama
                            nim
                            email
                            dosenPenasehat {
                                nidn
                                nama
                                email
                            }
                            
                        }
                    }
                `
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function printData() {
    try {
        const dataAPI = await fetchData();
        cekStambukEmail(dataAPI, nip, emailDosen);
        console.log(dataAPI);
    } catch (error) {
        console.error("Error printing data:", error);
        alert(error);
    }
}


let justJSON = document.getElementById('just_json');
justJSON.addEventListener('click', printData);

function cekStambukEmail (data, stambuk, email){
    if(stambuk === data.data.mahasiswa.nim && email === data.data.mahasiswa.email){
        alert(" email mahasiswa : "+email+" dan nim: "+stambuk+" terdaftar di sicekcok");
    }else if (stambuk === data.data.mahasiswa.dosenPenasehat.nidn && email === data.data.mahasiswa.dosenPenasehat.email){
        alert("email dosen: "+ email + " nidn: "+stambuk+" terdaftar");
    }else{
        alert("nim/nidn tidak terdaftar! \n email tidak terdaftar")
    }
}

