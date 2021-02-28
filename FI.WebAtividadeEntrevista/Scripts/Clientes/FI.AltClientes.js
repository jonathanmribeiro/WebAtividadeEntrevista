var beneficiarios = [];

$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CPF').val(obj.CPF);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        ObterBeneficiarios(obj.Id)
    }

    $('#formCadastro').submit(formCadastro_submit);
    $('#MdlBeneficiarios_form').submit(MdlBeneficiarios_Incluir);
});

function formCadastro_submit(e) {
    e.preventDefault();

    if (!validarCPF($(this).find("#CPF").val())) {
        ModalDialog("Erro", "CPF não é válido")
        return;
    }

    beneficiarios.forEach(function (benef) {
        benef.cpf = removerMascara(benef.cpf);
    });

    $.ajax({
        url: urlPost,
        method: "POST",
        data: {
            "NOME": $(this).find("#Nome").val(),
            "CPF": $(this).find("#CPF").val(),
            "CEP": $(this).find("#CEP").val(),
            "Email": $(this).find("#Email").val(),
            "Sobrenome": $(this).find("#Sobrenome").val(),
            "Nacionalidade": $(this).find("#Nacionalidade").val(),
            "Estado": $(this).find("#Estado").val(),
            "Cidade": $(this).find("#Cidade").val(),
            "Logradouro": $(this).find("#Logradouro").val(),
            "Telefone": $(this).find("#Telefone").val(),
            "Beneficiarios": beneficiarios
        },
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();
                window.location.href = urlRetorno;
            }
    });
}

function ModalDialog(titulo, texto) {
    $('#MdlNotificacaoTitulo')[0].innerText = titulo;
    $('#MdlNotificacaoTexto')[0].innerText = texto;
    $('#MdlNotificacao').modal('show');
}

function removerMascara(cpf) {
    var cpf;
    var cpfSemDigito = '';
    for (var i = 0; i < cpf.length; i++) {
        var digito = cpf[i];
        if (['.', '-'].indexOf(digito) < 0)
            cpfSemDigito += digito;
    }
    return cpfSemDigito;
}

/////////////////////////////////////////MdlBeneficiarios/////////////////////////////////////////
function ObterBeneficiarios(idCliente) {
    $.ajax({
        url: "/Cliente/ObterBeneficiarios",
        method: "GET",
        data: {
            id: 0,
            idCliente: idCliente
        },
        error: function (r) { },
        success: function (r) { return beneficiarios = r.Records; }
    });
}

function MdlBeneficiarios_Exibir() {
    document.getElementById('MdlBeneficiarios_btnIncluir').innerText = 'Alterar';
    $('#MdlBeneficiarios').modal('show');
    MdlBeneficiarios_PrepararTabela();
}

function MdlBeneficiarios_PrepararTabela() {
    //Limpa a lista com jquery
    var lista = $(document).find("#MdlBeneficiarios_lista").empty();

    //Insere com javascript baseado no array beneficiarios
    lista = document.getElementById('MdlBeneficiarios_tabela').getElementsByTagName('tbody')[0];

    var linha = {};
    var celula = {};
    var texto = {};
    var button = {};

    beneficiarios.forEach(function (beneficiario, index) {
        linha = lista.insertRow();

        celula = linha.insertCell();
        texto = document.createTextNode(beneficiario.Nome);
        celula.appendChild(texto);

        celula = linha.insertCell();
        texto = document.createTextNode(beneficiario.CPF);
        celula.appendChild(texto);

        celula = linha.insertCell();
        button = document.createElement('button');
        button.classList.add("btn");
        button.classList.add("btn-default");
        button.innerText = "Alterar";
        button.onclick = function () { MdlBeneficiarios_Alterar(index); };
        celula.appendChild(button);

        button = document.createElement('button');
        button.classList.add("btn");
        button.classList.add("btn-default");
        button.innerText = "Excluir";
        button.onclick = function () { MdlBeneficiarios_Remover(index); };
        celula.appendChild(button);
    });
}

function MdlBeneficiarios_Alterar(index) {
    $(document).find("#MdlBeneficiarios_Nome").val(beneficiarios[index].Nome);
    $(document).find("#MdlBeneficiarios_CPF").val(beneficiarios[index].CPF);
}

function MdlBeneficiarios_Remover(index) {
    beneficiarios.splice(index, 1);
    MdlBeneficiarios_PrepararTabela();
}

function MdlBeneficiarios_Incluir(e) {
    e.preventDefault();

    var beneficiario = {
        Nome: $(document).find("#MdlBeneficiarios_Nome").val(),
        CPF: $(document).find("#MdlBeneficiarios_CPF").val()
    }

    $(document).find("#MdlBeneficiarios_Nome").val('');
    $(document).find("#MdlBeneficiarios_CPF").val('');

    //Se o CPF já existir na lista atualiza o nome
    var benefJaIncluido = beneficiarios.find(function (benef) { return benef.CPF == beneficiario.CPF; });

    if (benefJaIncluido)
        benefJaIncluido.Nome = beneficiario.Nome;
    else if (beneficiario.Nome && beneficiario.CPF)
        beneficiarios.push(beneficiario);

    //De qualquer forma atualiza a tabela com os registros da lista beneficiarios
    MdlBeneficiarios_PrepararTabela();
}