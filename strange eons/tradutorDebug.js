importPackage(java.io);
importPackage(java.nio.file);
importPackage(arkham.component);

// ===========================================================================
// VARIÁVEIS GLOBAIS DE MAPEAMENTO
// ===========================================================================

var MAPA_CLASSES = {
    "guardian": "Guardian",
    "seeker":   "Seeker",
    "rogue":    "Rogue",
    "mystic":   "Mystic",
    "survivor": "Survivor",
    "neutral":  "Neutral"
};

var MAPA_ICONES_COLECAO = {

    "core": "CoreSet",
    "rcore": "CoreSet",

    // Night of the Zealot
    "tnotz": "NightOfTheZealot",
    "eotn": "NightOfTheZealot",
    "lita": "NightOfTheZealot",
    "rtnotz": "ReturnToTheNightOfTheZealot",

    // Dunwich
    "dwl": "TheDunwichLegacy",
    "tmm": "TheDunwichLegacy",
    "tece": "TheDunwichLegacy",
    "bota": "TheDunwichLegacy",
    "uau": "TheDunwichLegacy",
    "wda": "TheDunwichLegacy",
    "litas": "TheDunwichLegacy",
    "rtdwl": "ReturnToTheDunwichLegacy",

    // Carcosa
    "ptc": "ThePathToCarcosa",
    "eotp": "ThePathToCarcosa",
    "uapa": "ThePathToCarcosa",
    "tuo": "ThePathToCarcosa",
    "tpm": "ThePathToCarcosa",
    "bsr": "ThePathToCarcosa",
    "tdoy": "ThePathToCarcosa",
    "rtptc": "ReturnToThePathToCarcosa",

    // Forgotten Age
    "tfa": "TheForgottenAge",
    "tof": "TheForgottenAge",
    "tbb": "TheForgottenAge",
    "hote": "TheForgottenAge",
    "tcoa": "TheForgottenAge",
    "tdi": "TheForgottenAge",
    "sha": "TheForgottenAge",
    "rttfa": "ReturnToTheForgottenAge",

    // Circle Undone
    "tcu": "TheCircleUndone",
    "tsn": "TheCircleUndone",
    "pas": "TheCircleUndone",
    "wos": "TheCircleUndone",
    "wvg": "TheCircleUndone",
    "fgg": "TheCircleUndone",
    "uad": "TheCircleUndone",
    "itd": "TheCircleUndone",
    "bof": "TheCircleUndone",
    "bbt": "TheCircleUndone",
    "rttcu": "ReturnToTheCircleUndone",

    // Investigator Decks
    "ncho": "NathanielCho",
    "hwin": "HarveyWalters",
    "jwin": "JacquelineFine",
    "wfir": "WinifredHabbamock",
    "snc": "StellaClark"
};

var MAPA_ICONES_CENARIO = {

    "core": "CoreSet",
    "rcore": "RevisedCoreSet",

    // Night of the Zealot
    "tnotz": "NightOfTheZealot",
    "eotn": "TheGathering",
    "lita": "MidnightMasks",
    "rtnotz": "ReturnToNightOfTheZealot",

    // Dunwich Legacy
    "dwl": "TheDunwichLegacy",
    "tmm": "TheMiskatonicMuseum",
    "tece": "TheEssexCountyExpress",
    "bota": "BloodOnTheAltar",
    "uau": "UndimensionedAndUnseen",
    "wda": "WhereDoomAwaits",
    "litas": "LostInTimeAndSpace",
    "rtdwl": "ReturnToTheDunwichLegacy",

    // Path to Carcosa
    "ptc": "ThePathToCarcosa",
    "eotp": "EchoesOfThePast",
    "uapa": "UnspeakableOath",
    "tuo": "TheUnspeakableOath",
    "tpm": "ThePallidMask",
    "bsr": "BlackStarsRise",
    "tdoy": "DimCarcosa",
    "rtptc": "ReturnToThePathToCarcosa",

    // Forgotten Age
    "tfa": "TheForgottenAge",
    "tof": "ThreadsOfFate",
    "tbb": "TheBoundaryBeyond",
    "hote": "HeartOfTheElders",
    "tcoa": "TheCityOfArchives",
    "tdi": "TheDepthsOfYoth",
    "sha": "ShatteredAeons",
    "rttfa": "ReturnToTheForgottenAge",

    // Circle Undone
    "tcu": "TheCircleUndone",
    "tsn": "TheSecretName",
    "pas": "TheWagesOfSin",
    "wos": "TheWagesOfSin",
    "wvg": "ForTheGreaterGood",
    "fgg": "ForTheGreaterGood",
    "uad": "UnionAndDisillusion",
    "itd": "InTheClutchesOfChaos",
    "icc": "InTheClutchesOfChaos",
    "bof": "BeforeTheBlackThrone",
    "bbt": "BeforeTheBlackThrone",
    "rttcu": "ReturnToTheCircleUndone",

    // Dream Eaters
    "tde": "TheDreamEaters",
    "sfk": "SearchForKadath",
    "tsh": "AThousandShapesOfHorror",
    "dsm": "DarkSideOfTheMoon",
    "pnr": "PointOfNoReturn",
    "wgd": "WhereTheGodsDwell",
    "woc": "WeaverOfTheCosmos",
    "tdcc": "DreamEatersCampaign",
    "tdcp": "DreamEatersInvestigators",

    // Innsmouth Conspiracy
    "tic": "TheInnsmouthConspiracy",
    "itdd": "InTooDeep",
    "tdg": "TheDevilReef",
    "hoth": "HorrorInHighGear",
    "dre": "AThousandShapesOfHorror",
    "lod": "TheLairOfDagon",
    "iotv": "IntoTheMaelstrom",

    // Edge of the Earth
    "eote": "EdgeOfTheEarth",
    "eoep": "EdgeOfTheEarthInvestigators",
    "eoec": "EdgeOfTheEarthCampaign",

    // Scarlet Keys
    "tsk": "TheScarletKeys",
    "tskp": "TheScarletKeysInvestigators",
    "tskc": "TheScarletKeysCampaign",

    // Hemlock Vale
    "fhv": "TheFeastOfHemlockVale",
    "fhvp": "HemlockValeInvestigators",
    "fhvc": "HemlockValeCampaign",
    "tftbw": "TheFeastOfHemlockValeCampaign"
};
// ===========================================================================
// FUNÇÕES UTILITÁRIAS
// ===========================================================================

function limparTags(texto) {
    if (!texto) return "";
    return texto.replace(/\[action\]/gi, "<act>")
        .replace(/\[fast\]/gi, "<fre>")
        .replace(/\[free\]/gi, "<fre>")
        .replace(/\[reaction\]/gi, "<rea>")
        .replace(/\[willpower\]/gi, "<wil>")
        .replace(/\[intellect\]/gi, "<int>")
        .replace(/\[combat\]/gi, "<com>")
        .replace(/\[agility\]/gi, "<agi>")
        .replace(/\[wild\]/gi, "<wild>")
        .replace(/\[per_investigator\]/gi, "<per>")
        .replace(/\[skull\]/gi, "<sku>")
        .replace(/\[cultist\]/gi, "<cul>")
        .replace(/\[tablet\]/gi, "<tab>")
        .replace(/\[elder_thing\]/gi, "<thi>")
        .replace(/\[auto_fail\]/gi, "<aut>")
        .replace(/\[elder_sign\]/gi, "<sig>")
        .replace(/\[\[(.*?)\]\]/g, "<t>$1</t>") 
        .replace(/<b>Objective\.<\/b>/gi, "<obj>") 
        .replace(/<b>Forced<\/b>/gi, "<for>");   
}

function extrairSimbolo(texto, tagJson) {
    if (!texto) return "";
    var regex = new RegExp("\\" + tagJson + "[:\\s]*([^\\n\\[]+)", "i");
    var match = texto.match(regex);
    return match ? match[1].trim() : "";
}

// ===========================================================================
// FUNÇÃO PRINCIPAL
// ===========================================================================

function tradutorArkhamFinal() {
    var caminhoPack = "C:\\Users\\andre\\PhpstormProjects\\arkham_card_creator\\campanhas\\02_Legado_de_Dunwich\\O_Expresso_do_Condado_de_Essex";
    
    try {
        println("\n--- 🚀 INICIANDO TRADUÇÃO FINAL ---");
        
        
        var pastaPack = new File(caminhoPack);
        var pastaRaiz = pastaPack.getParentFile().getParentFile().getParentFile();
        
        var moldes = {
            "asset": new File(pastaRaiz, "Template_Asset.eon"),
            "investigator": new File(pastaRaiz, "Template_Investigator.eon"),
            "enemy": new File(pastaRaiz, "Template_Enemy.eon"),
            "event": new File(pastaRaiz, "Template_Event.eon"),
            "skill": new File(pastaRaiz, "Template_Skill.eon"),
            "treachery": new File(pastaRaiz, "Template_Treachery.eon"),
            "location": new File(pastaRaiz, "Template_Location.eon"),
            "agenda": new File(pastaRaiz, "Template_Agenda.eon"),
            "act": new File(pastaRaiz, "Template_Act.eon"),
            "scenario": new File(pastaRaiz, "Template_Scenario.eon")
        };

        var pastaExport = new File(pastaPack, "Exportados");
        if (!pastaExport.exists()) pastaExport.mkdir();

        var ResourceKit = Packages.resources.ResourceKit;
        var arquivos = pastaPack.listFiles();
        
        // --- PASSO 0: PRE-SCAN PARA DESCOBRIR TOTAIS DE ENCONTRO ---
        var mapaTotais = {};
        for (var i = 0; i < arquivos.length; i++) {
            var arq = arquivos[i];
            if (arq.isFile() && arq.getName().toLowerCase().endsWith(".json")) {
                var b = Files.readAllBytes(arq.toPath());
                var jt = new java.lang.String(b, "UTF-8");
                var card = JSON.parse(jt);
                if (Array.isArray(card)) card = card[0];

                // Usamos o encounter_code (ou pack_code se não houver) como chave
                var chave = card.encounter_code || card.pack_code;
                if (chave && card.encounter_position) {
                    if (!mapaTotais[chave] || card.encounter_position > mapaTotais[chave]) {
                        mapaTotais[chave] = card.encounter_position;
                    }
                }
            }
        }
        println("📊 Totais de Encontro mapeados: " + JSON.stringify(mapaTotais));
        
        var cartasCriadas = 0;
        for (var f = 0; f < arquivos.length; f++) {
            var arquivoAtual = arquivos[f];
            if (arquivoAtual.isFile() && arquivoAtual.getName().toLowerCase().endsWith(".json")) {
                
                var bytes = Files.readAllBytes(arquivoAtual.toPath());
                var jsonTexto = new java.lang.String(bytes, "UTF-8");
                var c = JSON.parse(jsonTexto);
                if (Array.isArray(c)) c = c[0];

                var tipo = (c.type_code || "asset").toLowerCase();
                var arquivoMolde = moldes[tipo] || moldes["asset"];
                var comp = ResourceKit.getGameComponentFromFile(arquivoMolde).clone();
                var s = comp.getSettings();

                // --- 1. IDENTIFICAÇÃO E TEXTOS ---
                comp.setName(c.name);
                
                if (tipo === "scenario") {
                    var txtFrente = c.text || "";
                    s.set("Skull", limparTags(extrairSimbolo(txtFrente, "[skull]")));
                    s.set("Cultist", limparTags(extrairSimbolo(txtFrente, "[cultist]")));
                    s.set("Tablet", limparTags(extrairSimbolo(txtFrente, "[tablet]")));
                    s.set("ElderThing", limparTags(extrairSimbolo(txtFrente, "[elder_thing]")));

                    var txtVerso = c.back_text || "";
                    var valSkull = limparTags(extrairSimbolo(txtVerso, "[skull]"));
                    s.set("SkullBack", valSkull); s.set("Skull2", valSkull);
                    var valCultist = limparTags(extrairSimbolo(txtVerso, "[cultist]"));
                    s.set("CultistBack", valCultist); s.set("Cultist2", valCultist);
                    var valTablet = limparTags(extrairSimbolo(txtVerso, "[tablet]"));
                    s.set("TabletBack", valTablet); s.set("Tablet2", valTablet);
                    var valElder = limparTags(extrairSimbolo(txtVerso, "[elder_thing]"));
                    s.set("ElderThingBack", valElder); s.set("ElderThing2", valElder);
                    
                    s.set("ScenarioTitle", "Fácil / Normal");
                    s.set("ScenarioTitle2", "Difícil / Especialista");      
                } 
                else if (tipo === "act") {
                    s.set("ScenarioDeckID", c.stage ? String(c.stage) : "a");
                    s.set("Clues", String(c.clues || "0"));
                    s.set("ActStory", c.flavor || ""); 
                    s.set("Rules", limparTags(c.text || ""));
                    if (c.back_text || c.back_flavor) {
                        s.set("TitleBack", c.back_name || "");
                        s.set("AccentedStoryABack", c.back_flavor || "");
                        s.set("RulesABack", limparTags(c.back_text || ""));
                    }
                } 
                else if (tipo === "agenda") {
                    s.set("ScenarioDeckID", c.stage ? String(c.stage) : "a");
                    s.set("Doom", String(c.doom || "0"));
                    s.set("AgendaStory", c.flavor || ""); 
                    s.set("Rules", limparTags(c.text || ""));
                    if (c.back_text || c.back_flavor) {
                        s.set("TitleBack", c.back_name || "");
                        s.set("AccentedStoryABack", c.back_flavor || "");
                        s.set("RulesABack", limparTags(c.back_text || ""));
                    }
                } 
                else {
                    s.set("Rules", limparTags(c.text));
                    if (c.back_text || c.back_name || c.back_flavor) {
                        if (c.back_name) s.set("BackName", c.back_name);
                        var regrasVerso = limparTags(c.back_text);
                        s.set("BackRules", regrasVerso);
                        s.set("RulesBack", regrasVerso);
                        s.set("BackFlavor", c.back_flavor || "");
                    }
                    if (c.subname) s.set("Subtitle", c.subname);
                    s.set("Traits", c.traits || "");
                    s.set("Flavor", c.flavor || "");
                }
                
                // --- 1.5 LÓGICA DE CLASSE (USANDO O MAPA GLOBAL) ---
                var classeFinal = (c.faction_code) ? MAPA_CLASSES[c.faction_code.toLowerCase()] || "Neutral" : "Neutral";
                s.set("CardClass", classeFinal);

				// --- 2. RODAPÉ E COLEÇÃO (COM NÚMERO DE ENCONTRO) ---
                
                // 1. Ícone de Coleção (Canto inferior direito)
                s.set("Collection", MAPA_ICONES_COLECAO[c.pack_code] || "CustomCollection");
                if (c.position) s.set("CollectionNumber", String(c.position));

                // 2. Ícone de Encontro e Números (8/10)
                // Se a carta tem posição de encontro, ela merece o ícone e a numeração
                if (c.encounter_position) {
                    // Ícone (conforme seu ajuste que deu certo usando "Encounter")
                    var refCenario = c.pack_code;
                    var nomeIconeCenario = MAPA_ICONES_CENARIO[refCenario.toLowerCase()] || refCenario;
                    s.set("Encounter", nomeIconeCenario);

                    // Numeração: "EncounterSetNumber" é o atual, "EncounterSetCount" é o total
                    s.set("EncounterNumber", String(c.encounter_position));
                    
                    var chaveContagem = c.encounter_code || c.pack_code;
                    if (mapaTotais[chaveContagem]) {
                        s.set("EncounterTotal", String(mapaTotais[chaveContagem]));
                    }
                } 
                // Fallback para Scenario/Act/Agenda que as vezes não tem posição mas tem ícone
                else if (tipo === "scenario" || tipo === "act" || tipo === "agenda") {
                    var refCenario = c.pack_code;
                    var nomeIconeCenario = MAPA_ICONES_CENARIO[refCenario.toLowerCase()] || refCenario;
                    s.set("Encounter", nomeIconeCenario);
                }

                s.set("Artist", c.illustrator || "");
                s.set("Copyright", "<i>arkhamBR</i>");

                // --- 3. LÓGICA DE ÍCONES DE HABILIDADE ---
                if (tipo === "skill") {
                    var listaIcones = [];
                    var mapaSkills = [
                        { campo: "skill_willpower", nome: "Willpower" },
                        { campo: "skill_intellect", nome: "Intellect" },
                        { campo: "skill_combat",    nome: "Combat" },
                        { campo: "skill_agility",   nome: "Agility" },
                        { campo: "skill_wild",      nome: "Wild" }
                    ];
                    for (var i = 0; i < mapaSkills.length; i++) {
                        var quantidade = c[mapaSkills[i].campo] || 0;
                        for (var n = 0; n < quantidade; n++) listaIcones.push(mapaSkills[i].nome);
                    }
                    for (var slot = 1; slot <= 6; slot++) {
                        s.set("Skill" + slot, (slot <= listaIcones.length) ? listaIcones[slot - 1] : "None");
                    }
                }

                // --- 4. ATRIBUTOS ESPECÍFICOS ---
                if (c.xp != null) s.set("Level", String(c.xp));
                if (c.cost != null) s.set("ResourceCost", String(c.cost));
                
                if (tipo === "location") {
                    if (c.shroud != null) s.set("Shroud", String(c.shroud));
                    if (c.clues != null) s.set("Clues", String(c.clues));
                }
                
                if (tipo === "enemy") {
                    if (c.enemy_fight != null) s.set("Fight", String(c.enemy_fight));
                    if (c.health != null) s.set("Health", String(c.health));
                    if (c.enemy_evade != null) s.set("Evade", String(c.enemy_evade));
                }

                // --- SALVAMENTO ---
                var nomeArquivo = c.code + " - " + c.name.replace(/[<>:"/\\|?*]/g, "") + ".eon";
                ResourceKit.writeGameComponentToFile(new File(pastaExport, nomeArquivo), comp);
                cartasCriadas++;
                println("✅ Gerada: " + nomeArquivo);
            }
        }
        alert("Fábrica Concluída!\n" + cartasCriadas + " cartas exportadas.");
    } catch (err) {
        println("💥 Erro: " + err);
    }
}

tradutorArkhamFinal();