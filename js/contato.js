"use strict";

function configurarContato() {
    const formulario = document.querySelector("#form-contato");
    if (!formulario) return;

    const campos = [...formulario.querySelectorAll("[required]")];
    const resultado = document.querySelector("#resultado-formulario");
    let validacaoIniciada = false;

    function validarCampo(campo) {
        const erro = document.querySelector(`#erro-${campo.id}`);
        let mensagem = "";

        if (!campo.value.trim()) {
            mensagem = campo.type === "email"
                ? "Informe seu e-mail."
                : campo.id === "nome" ? "Informe seu nome." : "Escreva sua mensagem.";
        } else if (campo.type === "email" && campo.validity.typeMismatch) {
            mensagem = "Informe um e-mail válido, como nome@exemplo.com.";
        }

        erro.textContent = mensagem;
        erro.hidden = !mensagem;
        if (mensagem) {
            campo.setAttribute("aria-invalid", "true");
        } else {
            campo.removeAttribute("aria-invalid");
        }
        return !mensagem;
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        validacaoIniciada = true;
        const invalidos = campos.filter((campo) => !validarCampo(campo));

        if (invalidos.length) {
            resultado.textContent = "Mensagem não enviada. Revise os campos indicados.";
            invalidos[0].focus();
            return;
        }

        // A simulação mantém os valores para revisão, sem persistir dados pessoais.
        resultado.textContent = "Mensagem validada! Envio simulado: nenhum dado foi enviado ou armazenado.";
    });

    campos.forEach((campo) => {
        campo.addEventListener("input", () => {
            resultado.textContent = "";
            if (validacaoIniciada) validarCampo(campo);
        });
    });

    // A validação nativa só é substituída após conectar o tratamento de submit.
    formulario.noValidate = true;
    formulario.querySelector('[type="submit"]').disabled = false;
}

configurarContato();
