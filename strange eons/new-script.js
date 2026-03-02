function dumpConfiguracoes() {
    var editor = Eons.activeEditor;
    if (!editor) {
        alert("Abra o template!");
        return;
    }

    var settings = editor.getGameComponent().getSettings();
    
    println("\n--- 📜 DUMP DE MEMÓRIA DO COMPONENTE ---");
    
    // O toString() é a nossa última esperança de ver as chaves escondidas
    var textoGeral = String(settings.toString());
    
    // Vamos quebrar o texto por vírgulas para ficar legível
    var linhas = textoGeral.split(",");
    
    for (var i = 0; i < linhas.length; i++) {
        var linha = linhas[i].trim();
        // Só mostra se não for configuração de fonte ou cor (que poluem o log)
        if (linha.indexOf("Family") == -1 && linha.indexOf("Colour") == -1) {
            println(linha);
        }
    }
    
    println("\n--- 🏁 FIM DO DUMP ---");
}

dumpConfiguracoes();