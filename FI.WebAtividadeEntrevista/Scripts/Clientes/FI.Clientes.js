var beneficiarios = [];

$(document).ready(function () {
    $("#CPF").mask("999.999.999-99");
    $("#MdlBeneficiarios_CPF").mask("999.999.999-99");
    $('#formCadastro').submit(formCadastro_Submit);
    $('#MdlBeneficiarios_form').submit(MdlBeneficiarios_Incluir);
});

function formCadastro_Submit(e) {
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
            "CPF": removerMascara($(this).find("#CPF").val()),
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
            }
    });
}

function validarCPF(cpf) {
    var retorno = true;
    var somatoria = 0;
    for (var i = 0; i < cpf.length; i++) {
        var digito = cpf[i];
        if (['.', '-'].indexOf(digito) < 0)
            somatoria += parseInt(digito);
    }
    retorno = somatoria.toString()[0] == somatoria.toString()[1];
    return retorno;
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

function ModalDialog(titulo, texto) {
    $('#MdlNotificacaoTitulo')[0].innerText = titulo;
    $('#MdlNotificacaoTexto')[0].innerText = texto;
    $('#MdlNotificacao').modal('show');
}

function MdlBeneficiarios_Exibir() {
    $('#MdlBeneficiarios').modal('show');
    MdlBeneficiarios_PrepararTabela();
}

function MdlBeneficiarios_Incluir(e) {
    e.preventDefault();

    var beneficiario = {
        nome: $(document).find("#MdlBeneficiarios_Nome").val(),
        cpf: $(document).find("#MdlBeneficiarios_CPF").val()
    }

    $(document).find("#MdlBeneficiarios_Nome").val('');
    $(document).find("#MdlBeneficiarios_CPF").val('');

    //Se o CPF já existir na lista atualiza o nome
    var benefJaIncluido = beneficiarios.find(function (benef) { return benef.cpf == beneficiario.cpf; });

    if (benefJaIncluido)
        benefJaIncluido.nome = beneficiario.nome;
    else if (beneficiario.nome && beneficiario.cpf)
        beneficiarios.push(beneficiario);

    //De qualquer forma atualiza a tabela com os registros da lista beneficiarios
    MdlBeneficiarios_PrepararTabela();
}

function MdlBeneficiarios_Alterar(index) {
    $(document).find("#MdlBeneficiarios_Nome").val(beneficiarios[index].nome);
    $(document).find("#MdlBeneficiarios_CPF").val(beneficiarios[index].cpf);
}

function MdlBeneficiarios_Remover(index) {
    beneficiarios.splice(index, 1);
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
        texto = document.createTextNode(beneficiario.nome);
        celula.appendChild(texto);

        celula = linha.insertCell();
        texto = document.createTextNode(beneficiario.cpf);
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