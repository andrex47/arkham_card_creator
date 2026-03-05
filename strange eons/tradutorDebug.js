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
var MAPA_SLOTS = {
    "hand": "1 Hand",
    "hand x2": "2 Hand", // Caso o plugin use o ícone que já mostra duas mãos
    "arcane": "1 Arcane",
    "arcane x2": "2 Arcane", // Caso o plugin use o ícone que já mostra dois arcanos
    "accessory": "Accessory",
    "body": "Body",
    "ally": "Ally",
    "tarot": "Tarot",
    "none": "None"
};

var MAPA_SKILLS = [
    { json: "skill_willpower", eons: "Willpower" },
    { json: "skill_intellect", eons: "Intellect" },
    { json: "skill_combat",    eons: "Combat" },
    { json: "skill_agility",   eons: "Agility" },
    { json: "skill_wild",      eons: "Wild" }
];

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

function obterImagem(codigo, pastaDestino) {
    // 1. Define o caminho esperado do arquivo (sempre .png vindo do ArkhamDB)
    var arquivoLocal = new java.io.File(pastaDestino, codigo + ".png");

    // 2. MECANISMO INTELIGENTE: Se já existe, retorna o caminho na hora
    if (arquivoLocal.exists()) {
        // println("   📦 Usando cache local: " + codigo);
        return arquivoLocal.getAbsolutePath();
    }

    // 3. Se não existe, tenta o download
    try {
        var urlString = "https://arkhamdb.com/bundles/cards/" + codigo + ".png";
        var url = new java.net.URL(urlString);
        var conexao = url.openConnection();
        conexao.setRequestProperty("User-Agent", "Mozilla/5.0");
        conexao.setConnectTimeout(3000); // 3 segundos é o bastante

        if (conexao.getResponseCode() === 200) {
            var inputStream = conexao.getInputStream();
            java.nio.file.Files.copy(inputStream, arquivoLocal.toPath());
            inputStream.close();
            println("   🌐 Download concluído: " + codigo);
            return arquivoLocal.getAbsolutePath();
        }
    } catch (e) {
        println("   ⚠️ Falha ao obter " + codigo + " da web. A carta ficará sem arte.");
    }
    
    return null; // Não encontrou local nem na web
}

// ===========================================================================
// FUNÇÃO PRINCIPAL
// ===========================================================================

function tradutorArkhamFinal() {
    var caminhoPack = "/Users/andrehankedoamaral/PhpstormProjects/arkham_card_creator/campanhas/02_Legado_de_Dunwich/O_Expresso_do_Condado_de_Essex";
    
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
        
        var pastaImagens = new File(pastaExport, "Imagens");
        if (!pastaImagens.exists()) pastaImagens.mkdir();

        var ResourceKit = Packages.resources.ResourceKit;
        var arquivos = pastaPack.listFiles();
        
        // --- PASSO 0: PRE-SCAN TOTAIS ---
        var mapaTotais = {};
        for (var i = 0; i < arquivos.length; i++) {
            var arq = arquivos[i];
            if (arq.isFile() && arq.getName().toLowerCase().endsWith(".json")) {
                try {
                    var b = Files.readAllBytes(arq.toPath());
                    var card = JSON.parse(new java.lang.String(b, "UTF-8"));
                    if (Array.isArray(card)) card = card[0];
                    var chave = (card.pack_code || "").toLowerCase();
                    if (chave && card.encounter_position) {
                        if (!mapaTotais[chave] || card.encounter_position > mapaTotais[chave]) {
                            mapaTotais[chave] = card.encounter_position;
                        }
                    }
                } catch(e) {}
            }
        }
        println("📊 Totais de Encontro mapeados: " + JSON.stringify(mapaTotais));
        
        var cartasCriadas = 0;
        for (var f = 0; f < arquivos.length; f++) {
            var arquivoAtual = arquivos[f];
            if (!arquivoAtual.isFile() || !arquivoAtual.getName().toLowerCase().endsWith(".json")) continue;

            try {
                var bytes = Files.readAllBytes(arquivoAtual.toPath());
                var c = JSON.parse(new java.lang.String(bytes, "UTF-8"));
                if (Array.isArray(c)) c = c[0];

                var tipo = (c.type_code || "asset").toLowerCase();
                var arquivoMolde = moldes[tipo] || moldes["asset"];
                var comp = ResourceKit.getGameComponentFromFile(arquivoMolde).clone();
                var s = comp.getSettings();

                // 1. Identidade Básica
                comp.setName(c.name || "Sem Nome");
                s.set("Artist", c.illustrator || "");
                s.set("Copyright", "<i>arkhamBR</i>");

                // 2. Imagem Inteligente
                var pathImg = obterImagem(c.code, pastaImagens);
                if (pathImg) {
                    var p0 = comp.getPortrait(0);
                    if (p0) { p0.setSource(pathImg); p0.setScale(0.15); }
                    s.set("Portrait-Portrait", pathImg);
                }

                // 3. Lógica por Tipo (Ato/Agenda/Local/Inimigo)
                if (tipo === "scenario") {
                    var txtFrente = c.text || "";
                    s.set("Skull", limparTags(extrairSimbolo(txtFrente, "[skull]")));
                    s.set("Cultist", limparTags(extrairSimbolo(txtFrente, "[cultist]")));
                    s.set("Tablet", limparTags(extrairSimbolo(txtFrente, "[tablet]")));
                    s.set("ElderThing", limparTags(extrairSimbolo(txtFrente, "[elder_thing]")));
                    s.set("ScenarioTitle", "Fácil / Normal");
                    s.set("ScenarioTitle2", "Difícil / Especialista");  
                } 
                else if (tipo === "act" || tipo === "agenda") {
                    s.set("ScenarioDeckID", c.stage ? String(c.stage) : "a");
                    s.set("Rules", limparTags(c.text || ""));
                    if (tipo === "act") {
                        s.set("Clues", String(c.clues || "0"));
                        s.set("ActStory", c.flavor || "");
                    } else {
                        s.set("Doom", String(c.doom || "0"));
                        s.set("AgendaStory", c.flavor || "");
                    }
                    if (c.back_name) s.set("TitleBack", c.back_name);
                    if (c.back_flavor) s.set("AccentedStoryABack", c.back_flavor);
                    if (c.back_text) s.set("RulesABack", limparTags(c.back_text));
                } 
                else if (tipo === "location") {
                    s.set("Shroud", String(c.shroud !== undefined ? c.shroud : "0"));
                    s.set("Clues", String(c.clues || "0") + (c.clues_fixed === false ? " <per>" : ""));
                    s.set("LocationIcon", c.location_symbol || "None");
                    s.set("Rules", limparTags(c.text || ""));
                    if (c.back_name) s.set("TitleBack", c.back_name);
                    if (c.back_text) s.set("RulesBack", limparTags(c.back_text));
                    var pathVerso = obterImagem(c.code + "b", pastaImagens);
                    if (pathVerso) { var p1 = comp.getPortrait(1); if(p1) p1.setSource(pathVerso); }
                } 
                else if (tipo === "enemy") {
                    s.set("Fight", String(c.enemy_fight !== undefined ? c.enemy_fight : "0"));
                    s.set("Health", String(c.health || "0") + (c.health_per_investigator ? " <per>" : ""));
                    s.set("Evade", String(c.enemy_evade !== undefined ? c.enemy_evade : "0"));
                    s.set("Damage", String(c.enemy_damage || "0"));
                    s.set("Horror", String(c.enemy_horror || "0"));
                    s.set("Traits", c.traits || "");
                    s.set("Rules", limparTags(c.text || ""));
                } 
                else {
                    s.set("Traits", c.traits || "");
                    s.set("Rules", limparTags(c.text || ""));
                    if (c.cost !== undefined) s.set("ResourceCost", String(c.cost));
                    if (c.xp !== undefined) s.set("Level", String(c.xp));
                }

                // 4. Ícones de Habilidade e Slots
                if (tipo !== "scenario" && tipo !== "act" && tipo !== "agenda") {
                    var listaIcones = [];
                    for (var k = 0; k < MAPA_SKILLS.length; k++) {
                        var nIcons = c[MAPA_SKILLS[k].json] || 0;
                        for (var n = 0; n < nIcons; n++) listaIcones.push(MAPA_SKILLS[k].eons);
                    }
                    for (var slotIdx = 1; slotIdx <= 6; slotIdx++) {
                        s.set("Skill" + slotIdx, (slotIdx <= listaIcones.length) ? listaIcones[slotIdx - 1] : "None");
                    }
                }

                if (tipo === "asset") {
                    var slotBruto = (c.real_slot || c.slot || "");
                    var partes = slotBruto.toLowerCase().split(/[.,;]+/);
                    var s1 = MAPA_SLOTS[partes[0].trim()] || "None";
                    s.set("Slot", s1);
                    if (partes.length > 1) s.set("Slot2", MAPA_SLOTS[partes[1].trim()] || "None");
                }

                // 5. Rodapé e Encontro (Lógica Simplificada via Pack Code)
                var refPack = (c.pack_code || "").toLowerCase();
                s.set("Collection", MAPA_ICONES_COLECAO[refPack] || "CustomCollection");
                if (c.position) s.set("CollectionNumber", String(c.position));

                if (refPack !== "") {
                    var nomeIconeEons = MAPA_ICONES_CENARIO[refPack] || refPack;
                    s.set("Encounter", nomeIconeEons);
                }

                // 6. Salvamento e Cópias
                var qtd = parseInt(c.quantity || 1);
                for (var i = 0; i < qtd; i++) {
                    if (c.encounter_position) {
                        var posAtu = parseInt(c.encounter_position) + i;
                        s.set("EncounterNumber", String(posAtu));
                        var totalEnc = mapaTotais[refPack];
                        if (totalEnc) s.set("EncounterTotal", String(totalEnc));
                    }

                    var sufixo = (qtd > 1) ? "_" + (i + 1) : "";
                    var nomeArquivo = c.code + sufixo + " - " + (c.name || "SemNome").replace(/[<>:"/\\|?*]/g, "") + ".eon";

                    ResourceKit.writeGameComponentToFile(new File(pastaExport, nomeArquivo), comp);
                    cartasCriadas++;
                    
                    var logEncontro = c.encounter_position ? " [Encontro: " + s.get("EncounterNumber") + "]" : "";
                    println("✅ Gerada: " + nomeArquivo + logEncontro);
                }

            } catch (errCard) {
                println("❌ Erro no arquivo " + arquivoAtual.getName() + ": " + errCard);
            }
        }
        alert("Fábrica Concluída!\n" + cartasCriadas + " cartas exportadas.");
    } catch (err) {
        println("💥 Erro Crítico: " + err);
    }
}
tradutorArkhamFinal();