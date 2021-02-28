$(document).ready(function () {
    $("#CPF").mask("999.999.999-99");

    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        if (!validarCPF($(this).find("#CPF").val())) {
            ModalDialog("Erro", "CPF não é válido")
            return;
        }

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
                "Telefone": $(this).find("#Telefone").val()
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
    })

})

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
