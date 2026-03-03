function superSonda() {
    var comp = Eons.activeEditor ? Eons.activeEditor.gameComponent : null;
    if (!comp) return;
    var s = comp.getSettings();

    // 1. Tenta "Ligar" as caixas (Toggles)
    var chavesDeAtivacao = [
        "ShowStoryA", "ShowStoryB", "ShowStoryC",
        "ShowGameTextA", "ShowGameTextB",
        "UseStoryA", "UseStoryB", "UseStoryC",
        "StoryAVisible", "StoryBVisible"
    ];
    
    for (var i = 0; i < chavesDeAtivacao.length; i++) {
        s.set(chavesDeAtivacao[i], "1");
    }

    // 2. Tenta variações com ESPAÇO e ZERO (Story 0, Story A)
    var tipos = ["Story", "GameText", "Header", "Rules"];
    var sufixos = [" A", " B", " 0", " 1", " 2", "_A", "_B"];

    for (var t = 0; t < tipos.length; t++) {
        for (var f = 0; f < sufixos.length; f++) {
            var chave = tipos[t] + sufixos[f];
            s.set(chave, ">> " + chave); 
        }
    }

    // 3. Forçar o componente a se redesenhar
    comp.prime();
    println("--- 📡 SONDA ENVIADA: VERIFIQUE A CARTA ---");
}

superSonda();