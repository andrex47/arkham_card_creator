function caçaChavesManual() {
    var editor = Eons.activeEditor;
    if (!editor) return;
    var s = editor.getGameComponent().getSettings();

    // Lista de nomes prováveis que o plugin usa
    var alvos = [
        "Shroud", "LocationShroud", "Velo",
        "Clues", "LocationClues", "Pistas",
        "Value", "LocationValue",
        "Title", "Name", "Subtitle",
        "Rules", "Text", "Flavor",
        "Traits", "Keywords",
        "SkillIcon1", "SkillIcon2", "Icon1", "Icon2",
        "Skill1", "Skill2", "Slot1", "Slot2",
        "SkillIconType1", "SkillIconType2",
        "SkillIntellect", "IntellectIcon", "Intellect",
        "Faction", "Class", "Collection", "Symbol", "Icon", "CardClass"
    ];

    println("\n--- 🕵️ TESTANDO CHAVES PROVÁVEIS ---");
    
    for (var i = 0; i < alvos.length; i++) {
        var valor = s.get(alvos[i]);
        if (valor != null && valor != "") {
            println("✅ ENCONTRADA: [" + alvos[i] + "] -> Valor: " + valor);
        }
    }

    println("--- 🏁 FIM DO TESTE ---");
}

caçaChavesManual();