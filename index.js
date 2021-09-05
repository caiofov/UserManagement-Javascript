/*
var nome = document.querySelector("#exampleInputName")
//seleciona o elemento "exampleInputName" e coloca na variável
//repetir o processo para as outras

//para o genero, basta armazenar qual está marcado
var gender = document.querySelectorAll("#form-user-create [name=gender]:checked")
//Primeiro, acha o form que será usado. Depois, pega os elementos com o "name" 
//igual a "gender", mas só o que está marcado, por causa do ":checked"

var birth = document.querySelector("exampleInputBirth");
var country = document.querySelector("#exampleInputCountry");
var email = document.querySelector("#exampleInputEmail");
var password = document.querySelector("#exampleInputPassword");
var photo = document.querySelector("#exampleInputFile");
var admin = document.querySelector("#exampleInputAdmin")
*/

//para o código ser mais "versátil", é melhor fazer algo mais geral

let userController = new UserController("form-user-create", "table-users")
