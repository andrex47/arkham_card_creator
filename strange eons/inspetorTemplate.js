function caçaChavesManual() {
    var editor = Eons.activeEditor;
    if (!editor) return;
    var s = editor.getGameComponent().getSettings();

    // Lista de nomes prováveis que o plugin usa
    // Adicione estes à sua lista atual:
    var alvos = [
        // --- CENÁRIO / CHAOS (Frente e Verso) ---
        "Skull", "Cultist", "Tablet", "ElderThing",
        "SkullBack", "CultistBack", "TabletBack", "ElderThingBack",
        "Skull2", "Cultist2", "Tablet2", "ElderThing2",
        "HardSkull", "HardCultist", "HardTablet", "HardElderThing",
        "EasySkull", "StandardSkull", "EasyChaos", "HardChaos",
        "Chaos", "ChaosBack", "Chaos2",
        
        // --- ATO E AGENDA ---
        "Story", "StoryBack", "Story2",
        "Objective", "ObjectiveBack", "Objective2",
        "AgendaNo", "ActNo", "Sequence", "Stage",
        "Doom", "DoomThreshold", "ClueThreshold",
        
        // --- LOCAIS (Frente e Verso) ---
        "Shroud", "Clues", "LocationShroud", "LocationClues",
        "ShroudBack", "CluesBack", "Rules2", "Text2",
        "Victory", "VictoryPoints",
        
        // --- INIMIGOS ---
        "Fight", "Health", "Evade", "Damage", "Horror",
        "EnemyFight", "EnemyHealth", "EnemyEvade",
        
        // --- CAMPOS DE TÍTULO EXTRAS ---
        "ScenarioTitle", "ScenarioTitle2", "Header", "Footer",
	    "Outcome", "Resolution", "Aftermath", "ReverseRules", 
	    "BackRules", "Effect", "AgendaEffect", "ActEffect",
	    "Description", "Details", "Text1", "Text2",
	    "Encounter","EncounterSet","EncounterNumber","EncounterPosition","EncounterCount","Slot1","Slot2","Slot",
	    "Portrait-Portrait","Portrait-2-Portrait",
	    "Class","Faction","Class1"
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