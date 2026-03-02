importPackage(java.io);
importPackage(java.nio.file);
importPackage(arkham.component);

function limparTags(texto) {
    if (!texto) {
        return "";
    }
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
        .replace(/\[elder_sign\]/gi, "<sig>");
}

function extrairSimbolo(texto, tagJson) {
    if (!texto) {
        return "";
    }
    // Esta regex busca a tag (ex: [skull]) e pega tudo até o próximo [ ou fim da linha
    var regex = new RegExp("\\" + tagJson + "[:\\s]*([^\\n\\[]+)", "i");
    var match = texto.match(regex);
    return match ? match[1].trim() : "";
}

function tradutorArkhamFinal() {
    // ⚠️ AJUSTE OS CAMINHOS ABAIXO
    var caminhoPack = "C:\\Users\\andre\\PhpstormProjects\\tradutor_arkham\\campanhas\\02_Legado_de_Dunwich\\O_Expresso_do_Condado_de_Essex";
    
    // --- DICIONÁRIO DE TRADUÇÃO: PACK -> ÍCONE DO CICLO NO STRANGE EONS ---
    var MAPA_ICONES_COLECAO = {
        // CORE
        "core": "CoreSet", "rcore": "CoreSet",
        
        // NOITE DO FANÁTICO (Standard: CoreSet ou NightOfTheZealot)
        "tnotz": "NightOfTheZealot", "eotn": "NightOfTheZealot", 
        "ptc": "NightOfTheZealot", "lita": "NightOfTheZealot",
        "rtnotz": "ReturnToTheNightOfTheZealot",
        
        // LEGADO DE DUNWICH (Onde tece vira DunwichLegacy)
        "dwl": "TheDunwichLegacy", "tmm": "TheDunwichLegacy", 
        "tece": "TheDunwichLegacy", "bota": "TheDunwichLegacy", 
        "uau": "TheDunwichLegacy", "wda": "TheDunwichLegacy", 
        "litas": "TheDunwichLegacy", "rtdwl": "ReturnToTheDunwichLegacy",
        
        // CAMINHO PARA CARCOSA
        "ptc": "ThePathToCarcosa", "eotp": "ThePathToCarcosa", 
        "uapa": "ThePathToCarcosa", "tuo": "ThePathToCarcosa", 
        "tpm": "ThePathToCarcosa", "bsr": "ThePathToCarcosa", 
        "tdoy": "ThePathToCarcosa", "rtptc": "ReturnToThePathToCarcosa",
        
        // ERA DO ESQUECIMENTO
        "tfa": "TheForgottenAge", "tof": "TheForgottenAge", 
        "tbb": "TheForgottenAge", "hote": "TheForgottenAge", 
        "tcoa": "TheForgottenAge", "tdi": "TheForgottenAge", 
        "sha": "TheForgottenAge", "rttfa": "ReturnToTheForgottenAge",
        
        // O CÍRCULO DESFEITO
        "tcu": "TheCircleUndone", "tsn": "TheCircleUndone", 
        "pas": "TheCircleUndone", "wos": "TheCircleUndone", 
        "wvg": "TheCircleUndone", "fgg": "TheCircleUndone", 
        "uad": "TheCircleUndone", "itd": "TheCircleUndone", 
        "bof": "TheCircleUndone", "bbt": "TheCircleUndone",
        
        // DECKS INICIAIS
        "ncho": "NathanielCho", "hwin": "HarveyWalters", 
        "jwin": "JacquelineFine", "wfir": "WinifredHabbamock", "snc": "StellaClark"
    };

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
            "scenario": new File(pastaRaiz, "Template_Scenario.eon") // <-- ADICIONADO
        };

        var pastaExport = new File(pastaPack, "Exportados");
        if (!pastaExport.exists()) {
            pastaExport.mkdir();
        }

        var ResourceKit = Packages.resources.ResourceKit;
        var arquivos = pastaPack.listFiles();
        var cartasCriadas = 0;

        for (var f = 0; f < arquivos.length; f++) {
            var arquivoAtual = arquivos[f];
            if (arquivoAtual.isFile() && arquivoAtual.getName().toLowerCase().endsWith(".json")) {
                
                var bytes = Files.readAllBytes(arquivoAtual.toPath());
                var jsonTexto = new java.lang.String(bytes, "UTF-8");
                var c = JSON.parse(jsonTexto);
                if (Array.isArray(c)) {
                    c = c[0];
                }

                var tipo = (c.type_code || "asset").toLowerCase();
                var arquivoMolde = moldes[tipo] || moldes["asset"];
                var comp = ResourceKit.getGameComponentFromFile(arquivoMolde).clone();
                var s = comp.getSettings();

                // --- 1. IDENTIFICAÇÃO E TEXTOS ---
                // Aplicando na Frente
                comp.setName(c.name);
                
                if (tipo === "scenario") {
                    // --- FRENTE (Easy/Standard) ---
                    var txtFrente = c.text || "";
                    s.set("Skull", limparTags(extrairSimbolo(txtFrente, "[skull]")));
                    s.set("Cultist", limparTags(extrairSimbolo(txtFrente, "[cultist]")));
                    s.set("Tablet", limparTags(extrairSimbolo(txtFrente, "[tablet]")));
                    s.set("ElderThing", limparTags(extrairSimbolo(txtFrente, "[elder_thing]")));

                    // --- VERSO (Hard/Expert) ---
                    var txtVerso = c.back_text || "";
                    s.set("Skull2", limparTags(extrairSimbolo(txtVerso, "[skull]")));
                    s.set("Cultist2", limparTags(extrairSimbolo(txtVerso, "[cultist]")));
                    s.set("Tablet2", limparTags(extrairSimbolo(txtVerso, "[tablet]")));
                    s.set("ElderThing2", limparTags(extrairSimbolo(txtVerso, "[elder_thing]")));
                    
                    // Se o template usar uma caixa de título para a dificuldade:
                    s.set("ScenarioTitle", "Fácil / Normal");
                    s.set("ScenarioTitle2", "Difícil / Especialista");
                } else {
                    s.set("Rules", limparTags(c.text));
                    s.set("Flavor", c.flavor || "");
    
                    // Aplicando no Verso (Se existir)
                    if (c.back_text || c.back_name || c.back_flavor) {
                        if (c.back_name) {
                            s.set("BackName", c.back_name); // Alguns templates usam isso
                        }
                        
                        // Tentativa de chaves comuns para o verso no Strange Eons
                        var regrasVerso = limparTags(c.back_text);
                        s.set("BackRules", regrasVerso);
                        s.set("RulesBack", regrasVerso); // Backup para outros templates
                        
                        s.set("BackFlavor", c.back_flavor || "");
                    }
                    if (c.subname) {
                        s.set("Subtitle", c.subname);
                    }
                    s.set("Traits", c.traits || "");
                    s.set("Flavor", c.flavor || "");
                }
                
                // --- 1.5 LÓGICA DE CLASSE (CARDCLASS) ---
                var mapaClasses = {
                    "guardian": "Guardian",
                    "seeker":   "Seeker",
                    "rogue":    "Rogue",
                    "mystic":   "Mystic",
                    "survivor": "Survivor",
                    "neutral":  "Neutral"
                };
                // Pega a classe do JSON e converte para o padrão do Strange Eons
                var classeFinal = mapaClasses[c.faction_code.toLowerCase()] || "Neutral";
                s.set("CardClass", classeFinal);

                // --- 2. RODAPÉ E COLEÇÃO ---
                var packCode = c.pack_code;
                
                // Traduz para o ícone do ciclo (ex: "TheDunwichLegacy")
                var iconeColecao = MAPA_ICONES_COLECAO[packCode] || "CustomCollection";
                s.set("Collection", iconeColecao);

                // Artista, Copyright e Número
                s.set("Artist", c.illustrator || "");
                s.set("Copyright", "<i>arkhamBR</i>");
                
                if (c.position) {
                    s.set("CollectionNumber", String(c.position));
                }

                // --- 3. LÓGICA DE ÍCONES DE HABILIDADE (SLOTS) ---
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
                        for (let n = 0; n < quantidade; n++) {
                            listaIcones.push(mapaSkills[i].nome);
                        }
                    }
            
                    for (var slot = 1; slot <= 6; slot++) {
                        var valor = (slot <= listaIcones.length) ? listaIcones[slot - 1] : "None";
                        s.set("Skill" + slot, valor);
                    }
                }

                // --- 4. CUSTOS, XP E ATRIBUTOS ESPECÍFICOS ---
                if (c.xp != null) {
                    s.set("Level", String(c.xp));
                }
                if (c.cost != null) {
                    s.set("ResourceCost", String(c.cost));
                }
                
                if (tipo === "location") {
                    if (c.shroud != null) {
                        s.set("Shroud", String(c.shroud));
                    }
                    if (c.clues != null) {
                        s.set("Clues", String(c.clues));
                    }
                }
                
                if (tipo === "enemy") {
                    if (c.enemy_fight != null) {
                        s.set("Fight", String(c.enemy_fight));
                    }
                    if (c.health != null) {
                        s.set("Health", String(c.health));
                    }
                    if (c.enemy_evade != null) {
                        s.set("Evade", String(c.enemy_evade));
                    }
                }

                // --- SALVAMENTO ---
                var nomeArquivo = c.code + " - " + c.name.replace(/[<>:"/\\|?*]/g, "") + ".eon";
                var destino = new File(pastaExport, nomeArquivo);
                ResourceKit.writeGameComponentToFile(destino, comp);
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