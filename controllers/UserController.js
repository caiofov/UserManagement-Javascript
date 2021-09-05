class UserController{

    constructor(formId, tableId){
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
    }


    onSubmit(){ //realiza os eventos necessários quando o formulário é enviado

        document.getElementById("form-user-create").addEventListener("submit", event =>{
            event.preventDefault(); //cancela o comportamento natural de envio do formulario
            //esse comportamento é passar os dados para a URL (get) e atualizar a página
            
            let values = this.getValues();

            this.getPhoto().then(
                (content)=>{ //deu certo
                    values.photo = content; //muda o conteudo da foto
                    this.addLine(values) //adiciona uma nova linha
                },
                
                (e)=>{ //deu erro
                    console.log(e) //imprime no log
                }
            )
            
        });
    }

    getPhoto(){ //le o arquivo da foto
        //promise é uma classe que faz o controle de erro
        //resolve-> deu certo
        //reject -> deu erro
        return new Promise((resolve,reject)=>{

            let fileReader = new FileReader();

            //recebe a foto (filter-> retorna um item com base em uma condição)
            let elements = [...this.formEl.elements].filter(item=>{
            if (item.name === "photo"){
                return item;
            }
        })

            //como o filter retorna um array, devemos pegar apenas o elementos que nos interessa
            let file = elements[0].files[0];

            fileReader.onload = () =>{
                resolve(fileReader.result) //retorna a foto pela função passada como parametro
            }
            fileReader.onerror = () =>{
                reject(e);
            }
            if (file){
                fileReader.readAsDataURL(file);
            }
            else{
                resolve('dist/img/boxed-bg.jpg')
                //caso não tenha sido lida uma imagem, retorna a padrão
            }
            

        })
        
        
    }

    getValues(){ //lê os dados do formulário e retorna um objeto da classe User
        let user = {};
        
        //o formulário em html possui um atributo chamado "elements", 
        //que lista os elementos do formulário
        //reticências = spread -> transforma o objeto html em array sem precisar saber quantos elementos possui
        [...this.formEl.elements].forEach(function(field, index){
        
            //se o nome do elemento for "gender"
            if(field.name == "gender"){
            
                if(field.checked){ //se tiver marcado (condicional como booleano)
                    user[field.name] = field.value
                    //atribui o field.value ao elemento field.name da variável user
                } 
            }
            //se o nome do elemento for "admin"
            else if(field.name == "admin"){
                user[field.name] = field.checked //retorna True ou False
            }
            else{ //caso contrario
                user[field.name] = field.value
            }

        });

        return new User(
            user.name, user.gender, 
            user.birth, user.country, 
            user.email, user.password, 
            user.photo, user.admin);
    
    }

    //adiciona uma linha do novo usuário na tela principal
    addLine(dataUser){
        //innerHTML -> diz que está inserindo um comando no documento HTML, 
        //ou seja, não é apenas um texto, precisará ser interpretado
        //crase = template string -> permite quebra de linha
        //${} -> se refere a uma variável
        
        let tr = document.createElement('tr') //cria um elemento tr

        tr.innerHTML =  `
        <tr>
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim':'Não'}</td>
            <td>${dataUser.birth}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>
        `;

        this.tableEl.appendChild(tr);
 
    }
}