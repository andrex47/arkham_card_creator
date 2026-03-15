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

    // Night of the Zealot
    "night_of_the_zealot": "NightOfTheZealot",
    "the_gathering": "TheGathering",
    "the_midnight_masks": "MidnightMasks",
    "the_devourer_below": "TheDevourerBelow",
    "return_to_night_of_the_zealot": "ReturnToNightOfTheZealot",

    // Dunwich Legacy
    "extracurricular_activity": "ExtracurricularActivity",
    "the_house_always_wins": "TheHouseAlwaysWins",
    "the_miskatonic_museum": "TheMiskatonicMuseum",
    "the_essex_county_express": "TheEssexCountyExpress",
    "blood_on_the_altar": "BloodOnTheAltar",
    "undimensioned_and_unseen": "UndimensionedAndUnseen",
    "where_doom_awaits": "WhereDoomAwaits",
    "lost_in_time_and_space": "LostInTimeAndSpace",

    // Return to Dunwich
    "return_to_extracurricular_activity": "ReturnToExtracurricularActivity",
    "return_to_the_house_always_wins": "ReturnToTheHouseAlwaysWins",
    "return_to_the_miskatonic_museum": "ReturnToTheMiskatonicMuseum",
    "return_to_the_essex_county_express": "ReturnToTheEssexCountyExpress",
    "return_to_blood_on_the_altar": "ReturnToBloodOnTheAltar",
    "return_to_undimensioned_and_unseen": "ReturnToUndimensionedAndUnseen",
    "return_to_where_doom_awaits": "ReturnToWhereDoomAwaits",
    "return_to_lost_in_time_and_space": "ReturnToLostInTimeAndSpace",
    "beyond_the_threshold": "BeyondTheThreshold",

    // Path to Carcosa
    "curtain_call": "CurtainCall",
    "the_last_king": "TheLastKing",
    "echoes_of_the_past": "EchoesOfThePast",
    "the_unspeakable_oath": "TheUnspeakableOath",
    "a_phantom_of_truth": "PhantomOfTruth",
    "the_pallid_mask": "ThePallidMask",
    "black_stars_rise": "BlackStarsRise",
    "dim_carcosa": "DimCarcosa",

    // Return to Carcosa
    "return_to_curtain_call": "ReturnToCurtainCall",
    "return_to_the_last_king": "ReturnToTheLastKing",
    "return_to_echoes_of_the_past": "ReturnToEchoesOfThePast",
    "return_to_the_unspeakable_oath": "ReturnToTheUnspeakableOath",
    "return_to_a_phantom_of_truth": "ReturnToPhantomOfTruth",
    "return_to_the_pallid_mask": "ReturnToThePallidMask",
    "return_to_black_stars_rise": "ReturnToBlackStarsRise",
    "return_to_dim_carcosa": "ReturnToDimCarcosa",

    // Forgotten Age
    "the_forgotten_age": "TheForgottenAge",
    "doom_of_eztli": "DoomOfEztli",
    "threads_of_fate": "ThreadsOfFate",
    "the_boundary_beyond": "TheBoundaryBeyond",
    "heart_of_the_elders": "HeartOfTheElders",
    "the_city_of_archives": "TheCityOfArchives",
    "the_depths_of_yoth": "TheDepthsOfYoth",
    "shattered_aeons": "ShatteredAeons",

    // Circle Undone
    "disappearance_at_the_twilight_estate": "TwilightEstate",
    "the_witching_hour": "TheWitchingHour",
    "the_secret_name": "TheSecretName",
    "the_wages_of_sin": "TheWagesOfSin",
    "for_the_greater_good": "ForTheGreaterGood",
    "union_and_disillusion": "UnionAndDisillusion",
    "in_the_clutches_of_chaos": "InTheClutchesOfChaos",
    "before_the_black_throne": "BeforeTheBlackThrone",

    // Dream Eaters
    "beyond_the_gates_of_sleep": "BeyondTheGatesOfSleep",
    "waking_nightmare": "WakingNightmare",
    "search_for_kadath": "SearchForKadath",
    "a_thousand_shapes_of_horror": "ThousandShapesOfHorror",
    "dark_side_of_the_moon": "DarkSideOfTheMoon",
    "point_of_no_return": "PointOfNoReturn",
    "where_the_gods_dwell": "WhereTheGodsDwell",
    "weaver_of_the_cosmos": "WeaverOfTheCosmos",

    // Innsmouth
    "the_pit_of_despair": "PitOfDespair",
    "in_too_deep": "InTooDeep",
    "devil_reef": "DevilReef",
    "horror_in_high_gear": "HorrorInHighGear",
    "a_light_in_the_fog": "LightInTheFog",
    "the_lair_of_dagon": "LairOfDagon",
    "into_the_maelstrom": "IntoTheMaelstrom",

    // Edge of the Earth
    "ice_and_death": "IceAndDeath",
    "fatal_mirage": "FatalMirage",
    "to_the_forbidden_peaks": "ForbiddenPeaks",
    "city_of_the_elder_things": "CityOfElderThings",
    "the_heart_of_madness": "HeartOfMadness",

    // Scarlet Keys
    "riddles_and_rain": "RiddlesAndRain",
    "dead_heat": "DeadHeat",
    "dancing_mad": "DancingMad",
    "dogs_of_war": "DogsOfWar",
    "shades_of_suffering": "ShadesOfSuffering",
    "without_a_trace": "WithoutATrace",
    "on_thin_ice": "OnThinIce"
};


var MOLDES = {
    "asset": "Template_Asset.eon",
    "investigator": "Template_Investigator.eon",
    "enemy": "Template_Enemy.eon",
    "event": "Template_Event.eon",
    "skill": "Template_Skill.eon",
    "treachery": "Template_Treachery.eon", // Este continua sendo o de cenário
    "weakness": "Template_Weakness.eon",   // O novo molde que você criou
    "location": "Template_Location.eon",
    "agenda": "Template_Agenda.eon",
    "act": "Template_Act.eon",
};
// ===========================================================================
// FUNÇÕES UTILITÁRIAS
// ===========================================================================

function snakeParaPascal(str) {
    if (!str) return "";
    
    return str
        .split("_")
        .map(function(p) {
            return p.charAt(0).toUpperCase() + p.slice(1);
        })
        .join("");
}

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

/**
 * Descobre a raiz do projeto de forma dinâmica (via sourcefile) 
 * ou estática (fallback para Windows).
 */
/**
 * Descobre a raiz do projeto de forma dinâmica.
 * Prioriza o local do script; se falhar, escala a partir da pasta do pack.
 */
function obterRaizProjeto(pastaPack) {
    var raiz = null;

    // 1. Tenta via sourcefile (Onde este script .js está salvo)
    try {
        if (typeof sourcefile !== 'undefined' && sourcefile !== null) {
            var arquivoScript = new java.io.File(sourcefile);
            // Se o script estiver na RAIZ, usamos getParentFile().
            // Se estiver em RAIZ/scripts/, precisaríamos de dois getParentFile().
            raiz = arquivoScript.getParentFile();
            println("🔎 Raiz detectada via sourcefile: " + raiz.getAbsolutePath());
        }
    } catch (e) {
        // Silencioso para não poluir o console caso sourcefile não exista no contexto
    }

    // 2. Fallback via Hierarquia (Sobe 3 níveis a partir do Pack)
    // Estrutura: [RAIZ] / campanhas / [NOME_EXPANSAO] / [PASTA_PACK]
    if (!raiz || !raiz.exists()) {
        try {
            if (pastaPack && pastaPack.exists()) {
                // Sobe: PACK (0) -> EXPANSAO (1) -> campanhas (2) -> RAIZ (3)
                raiz = pastaPack.getParentFile().getParentFile().getParentFile();
                println("📂 Raiz calculada via hierarquia do pack: " + raiz.getAbsolutePath());
            }
        } catch (e) {
            println("❌ Erro ao tentar escalar níveis de pasta a partir do pack.");
        }
    }

    // Validação final
    if (!raiz || !raiz.exists()) {
        println("🚨 CRÍTICO: Não foi possível determinar a raiz do projeto automaticamente!");
        // Aqui o script provavelmente vai dar erro ao tentar buscar os moldes,
        // o que é melhor do que salvar em caminhos fantasmas.
    }

    return raiz;
}

/**
 * Configura o retrato de uma carta de forma portátil e editável.
 * @param {GameComponent} comp O componente da carta.
 * @param {string} codigo O código da carta (ex: "01001").
 * @param {java.io.File} pastaImagens Pasta onde as imagens estão/serão salvas.
 * @param {number} indice O índice do retrato (0 para frente, 1 para verso).
 */
function configurarRetrato(comp, codigo, pastaImagens, indice) {
    var sufixo = (indice === 1) ? "b" : ""; // Adiciona 'b' para versos (ex: 01001b)
    var imgResult = obterImagem(codigo + sufixo, pastaImagens);
    
    if (imgResult) {
        var p = comp.getPortrait(indice);
        if (p) {
            // Força o carregamento mas limpa a trava do caminho absoluto
            p.setSource(new java.io.File(imgResult.toString()).getAbsolutePath());
            p.setScale(0.15);
            
            var chaveSetting = (indice === 0) ? "Portrait-Portrait" : "Portrait-" + indice + "-Portrait";
            comp.getSettings().remove(chaveSetting); 
            comp.markUnsavedChanges();
        }
    }
}

/**
 * Analisa os dados do JSON e decide qual arquivo .eon deve ser usado.
 * @param {Object} dadosJson - O objeto da carta vindo do ArkhamDB.
 * @returns {string} O nome do arquivo de molde definido no objeto MOLDES.
 */
/**
 * Analisa os dados da carta e decide qual arquivo .eon deve ser usado.
 */
function identificarMolde(dadosCarta) {
    var tipo = (dadosCarta.type_code || "").toLowerCase();
    var subtipo = (dadosCarta.subtype_code || "").toLowerCase();
    var textoFrente = (dadosCarta.text || "").toLowerCase();

    // 1. Fraquezas (Molda como Player Card de Treachery)
    if (subtipo.indexOf("weakness") !== -1) {
        return MOLDES["weakness"];
    }

    // 2. Especialização de Cenário
    if (tipo === "scenario") {
        var temIconesCaos = textoFrente.indexOf("[skull]") !== -1 || 
                           textoFrente.indexOf("[cultist]") !== -1;

        if (temIconesCaos) {
            return "Template_Scenario_Token.eon"; 
        } else {
            return "Template_Scenario_Setup.eon";
        }
    }

    // 3. Padrão para os demais tipos (Asset, Event, Enemy, etc)
    return MOLDES[tipo] || MOLDES["asset"];
}
// ===========================================================================
// FUNÇÃO PRINCIPAL
// ===========================================================================
const caminhoPack = "C:/Users/andre/PhpstormProjects/arkham_card_creator/campanhas/50_Retornos/Retorno_ao_Legado_de_Dunwich";
    
function tradutorArkhamFinal() {
    try {
        println("\n--- 🚀 INICIANDO TRADUÇÃO FINAL ---");
       // 1. Definição de Raiz e Pastas (Usando Namespace explícito do Java)

        var pastaPack = new java.io.File(caminhoPack);
        var RAIZ_PROJETO = obterRaizProjeto(pastaPack);
        // Verificação de segurança: A pasta de origem existe?
        if (!pastaPack.exists() || !pastaPack.isDirectory()) {
            println("❌ ERRO: A pasta do Pack não foi encontrada: " + caminhoPack);
            return;
        }

        var pastaExport = new java.io.File(pastaPack, "Exportados");
        if (!pastaExport.exists()) pastaExport.mkdir();
        
        var pastaImagens = new java.io.File(pastaExport, "Imagens");
        if (!pastaImagens.exists()) pastaImagens.mkdir();

        var ResourceKit = Packages.resources.ResourceKit;
        var arquivos = pastaPack.listFiles();
        
       println("🏠 Raiz do Projeto detectada: " + RAIZ_PROJETO.getAbsolutePath());
       println("📂 Pasta de Destino: " + pastaExport.getAbsolutePath());
        
       // --- PASSO 0: PRE-SCAN TOTAIS (CORRIGIDO) ---
		var mapaTotais = {};
		for (var i = 0; i < arquivos.length; i++) {
		    var arq = arquivos[i];
		    if (arq.isFile() && arq.getName().toLowerCase().endsWith(".json")) {
		        try {
		            var b = java.nio.file.Files.readAllBytes(arq.toPath());
		            var card = JSON.parse(new java.lang.String(b, "UTF-8"));
		            if (Array.isArray(card)) card = card[0];
		            
		            var chaveTotal = (card.encounter_code || card.pack_code || "").toLowerCase();
		            
		            if (chaveTotal && card.encounter_position) {
		                // Calculamos a última posição ocupada por esta carta
		                // Se pos é 30 e qtd é 2, ela ocupa 30 e 31. O total do set é 31.
		                var quantidadeCarta = parseInt(card.quantity || 1);
		                var ultimaPosicaoDestaCarta = parseInt(card.encounter_position) + (quantidadeCarta - 1);
		
		                if (!mapaTotais[chaveTotal] || ultimaPosicaoDestaCarta > mapaTotais[chaveTotal]) {
		                    mapaTotais[chaveTotal] = ultimaPosicaoDestaCarta;
		                }
		            }
		        } catch(e) {
		            println("Erro no pre-scan do arquivo " + arq.getName());
		        }
		    }
		}
        println("📊 Totais de Encontro mapeados: " + JSON.stringify(mapaTotais));
        var avisosFaltantes = []; // Lista para guardar códigos não encontrados
        var cartasCriadas = 0;
		for (var f = 0; f < arquivos.length; f++) {
		    var arquivoAtual = arquivos[f];
		    if (!arquivoAtual.isFile() || !arquivoAtual.getName().toLowerCase().endsWith(".json")) continue;
		
		    try {
		        var bytes = Files.readAllBytes(arquivoAtual.toPath());
				var dadosCarta = JSON.parse(new java.lang.String(bytes, "UTF-8"));
				if (Array.isArray(dadosCarta)) {
				    dadosCarta = dadosCarta[0];
				}
		        var tipo = (dadosCarta.type_code || "").toLowerCase();
				var subtipo = (dadosCarta.subtype_code || "").toLowerCase();
		
		       // --- 1. BUSCA DO MOLDE ---
				var nomeArquivoMolde = identificarMolde(dadosCarta);
				var arquivoMolde = new File(RAIZ_PROJETO, nomeArquivoMolde);
				
		        if (!arquivoMolde.exists()) {
		            println("❌ Molde não encontrado para tipo '" + tipo + "': " + arquivoMolde.getAbsolutePath());
		            continue;
		        }
		
		        var comp = ResourceKit.getGameComponentFromFile(arquivoMolde);
		        var s = comp.getSettings();
		
		        // --- 2. ATRIBUTOS GERAIS (PARA TODAS AS CARTAS) ---
		        // Identidade Básica
		        comp.setName(dadosCarta.name || "Sem Nome");
		        s.set("UpdateVisuals", "true");
		        s.set("Artist", dadosCarta.illustrator || "");
		        s.set("Copyright", "<i>arkhamBR</i>");
		
		        // Rodapé e Coleção (Geral)
		        var refPack = (dadosCarta.pack_code || "").toLowerCase();
		        s.set("Collection", MAPA_ICONES_COLECAO[refPack] || "CustomCollection");
		        var numeroCarta = dadosCarta.position;
		        if (numeroCarta)
		        {
		        	s.set("CollectionNumber", String(numeroCarta));
		        }
		        // --- 2.5 ATRIBUTOS DE JOGADOR (CLASSE, CUSTO, NÍVEL) ---
				// Define a Classe (Guardian, Seeker, etc.)
				if (dadosCarta.faction_code) {
				    var classeTraduzida = MAPA_CLASSES[dadosCarta.faction_code.toLowerCase()];
				    s.set("CardClass", classeTraduzida || "Neutral");
				}
				
				// Define o Nível (XP) - As bolinhas abaixo do custo
				s.set("Level", String(dadosCarta.xp || "0"));
				
				// Define o Custo (se houver)
				if (dadosCarta.cost !== undefined) {
				    s.set("ResourceCost", String(dadosCarta.cost));
				}
				
				// Define o Slot (Mão, Arcano, Aliado, etc.)
				if (dadosCarta.real_slot) {
				    var slotFormatado = MAPA_SLOTS[dadosCarta.real_slot.toLowerCase()];
				    if (slotFormatado) s.set("Slot", slotFormatado);
				}
		        // --- 3. ATRIBUTOS ESPECÍFICOS POR TIPO ---
				if (tipo === "scenario") {
				    var txtFrente = dadosCarta.text || "";
				    var txtVerso = dadosCarta.back_text || "";
				
				    // Se o molde for o de TOKENS, focamos nos símbolos de caos
				    if (nomeArquivoMolde === "Template_Scenario_Token.eon") {
				        // Frente: Fácil/Normal
				        s.set("Skull", limparTags(extrairSimbolo(txtFrente, "[skull]")));
				        s.set("Cultist", limparTags(extrairSimbolo(txtFrente, "[cultist]")));
				        s.set("Tablet", limparTags(extrairSimbolo(txtFrente, "[tablet]")));
				        s.set("ElderThing", limparTags(extrairSimbolo(txtFrente, "[elder_thing]")));
				        
				        // Verso: Difícil/Especialista (Usando sua descoberta do Skull2)
				        if (txtVerso !== "") {
				            s.set("Skull2", limparTags(extrairSimbolo(txtVerso, "[skull]")));
				            s.set("Cultist2", limparTags(extrairSimbolo(txtVerso, "[cultist]")));
				            s.set("Tablet2", limparTags(extrairSimbolo(txtVerso, "[tablet]")));
				            s.set("ElderThing2", limparTags(extrairSimbolo(txtVerso, "[elder_thing]")));
				        }
				        
				        s.set("ScenarioTitle", "Fácil / Normal");
				        s.set("ScenarioTitle2", "Difícil / Especialista");
				    } 
				    else if (nomeArquivoMolde === "Template_Scenario_Setup.eon") 
					{
				    // FRENTE (Side A)
				    // Usamos RulesA como o campo principal de regras
				    s.set("RulesA", limparTags(txtFrente));
				    
				    // Se houver texto de flavor na frente, você pode usar:
				    if (dadosCarta.flavor) {
				        s.set("AccentedStoryA", dadosCarta.flavor);
				    }
				
				    // VERSO (Side B/Back)
				    if (txtVerso !== "") {
				        // Pelo seu dump, o verso usa o sufixo "Back" após a letra
				        s.set("RulesABack", limparTags(txtVerso));
				        
				        if (dadosCarta.back_name) {
				            s.set("TitleBack", dadosCarta.back_name);
				        }
				        
				        if (dadosCarta.back_flavor) {
				            s.set("AccentedStoryABack", dadosCarta.back_flavor);
				        }
				    }
				    
				    // Garantir que a numeração da coleção apareça (conforme o seu dump)
				    s.set("ShowCollectionNumberFront", "1");
				    s.set("ShowCollectionNumberBack", "1");
				}
			}
		        else if (tipo === "act" || tipo === "agenda") {
		            s.set("ScenarioDeckID", dadosCarta.stage ? String(dadosCarta.stage) : "a");
		            s.set("Rules", limparTags(dadosCarta.text || ""));
		            if (tipo === "act") {
		                s.set("Clues", String(dadosCarta.clues || "0"));
		                s.set("ActStory", dadosCarta.flavor || "");
		            } else {
		                s.set("Doom", String(dadosCarta.doom || "0"));
		                s.set("AgendaStory", dadosCarta.flavor || "");
		            }
		            if (dadosCarta.back_name) s.set("TitleBack", dadosCarta.back_name);
		            if (dadosCarta.back_flavor) s.set("AccentedStoryABack", dadosCarta.back_flavor);
		            if (dadosCarta.back_text) s.set("RulesABack", limparTags(dadosCarta.back_text));
		        } 
		        else if (tipo === "location") {
				    // --- ATRIBUTOS DA FRENTE (Lado Não Revelado) ---
				    s.set("Shroud", String(dadosCarta.shroud !== undefined ? dadosCarta.shroud : "0"));
				    
				    // Clues: verifica se é valor fixo ou por investigador (<per>)
				    var pistas = String(dadosCarta.clues || "0");
				    if (dadosCarta.clues_fixed === false) pistas += " <per>";
				    s.set("Clues", pistas);
				    
				    s.set("LocationIcon", dadosCarta.location_symbol || "None");
				    s.set("Traits", dadosCarta.traits || ""); // Traits da frente
				    
				    // Texto de Regras e Flavor da Frente
				    s.set("Rules", limparTags(dadosCarta.text || ""));
				    if (dadosCarta.flavor) {
				        s.set("Flavor", dadosCarta.flavor); // Chave padrão de flavor no Eons
				    }
				
				    // --- ATRIBUTOS DO VERSO (Lado Revelado) ---
				    if (dadosCarta.back_text || dadosCarta.back_flavor || dadosCarta.back_name) {
				        if (dadosCarta.back_name) s.set("TitleBack", dadosCarta.back_name);
				        
				        s.set("RulesBack", limparTags(dadosCarta.back_text || ""));
				        
				        if (dadosCarta.back_flavor) {
				            s.set("FlavorBack", dadosCarta.back_flavor);
				        }
				        
				        // Algumas localidades mudam ou adicionam Traits no verso
				        if (dadosCarta.back_traits) {
				            s.set("TraitsBack", dadosCarta.back_traits);
				        } else {
				            // Se o verso não tem traits específicos, costuma-se repetir os da frente
				            s.set("TraitsBack", dadosCarta.traits || "");
				        }
				    }
				}
		        else if (tipo === "enemy") {
		            s.set("Fight", String(dadosCarta.enemy_fight !== undefined ? dadosCarta.enemy_fight : "0"));
		            s.set("Health", String(dadosCarta.health || "0") + (dadosCarta.health_per_investigator ? " <per>" : ""));
		            s.set("Evade", String(dadosCarta.enemy_evade !== undefined ? dadosCarta.enemy_evade : "0"));
		            s.set("Damage", String(dadosCarta.enemy_damage || "0"));
		            s.set("Horror", String(dadosCarta.enemy_horror || "0"));
		            s.set("Traits", dadosCarta.traits || "");
		            s.set("Rules", limparTags(dadosCarta.text || ""));
		        } 
		        else {
		            // Dentro do bloco de Treachery ou no else que trata Assets/Events/Treacheries:
					s.set("Traits", dadosCarta.traits || "");
					s.set("Rules", limparTags(dadosCarta.text || ""));
					
					// Adicione este tratamento para o Flavor Text
					if (dadosCarta.flavor) {
					    s.set("Flavor", dadosCarta.flavor);
					}
					
					// Se for uma Traição de Cenário (Treachery), ela pode ter verso em casos raros (como Retornos)
					if (tipo === "treachery" && dadosCarta.double_sided) {
					    if (dadosCarta.back_text) s.set("RulesBack", limparTags(dadosCarta.back_text));
					    if (dadosCarta.back_flavor) s.set("FlavorBack", dadosCarta.back_flavor);
					}
		        }
		
		        // --- 4. ÍCONES DE HABILIDADE (PARA QUEM NÃO É CENÁRIO) ---
		        if (tipo !== "scenario" && tipo !== "act" && tipo !== "agenda") {
					var listaIcones = [];
				    for (var k = 0; k < MAPA_SKILLS.length; k++) {
				        var nIcons = dadosCarta[MAPA_SKILLS[k].json] || 0; 
				        for (var n = 0; n < nIcons; n++) listaIcones.push(MAPA_SKILLS[k].eons);
				    }
		            for (var slotIdx = 1; slotIdx <= 6; slotIdx++) {
		                s.set("Skill" + slotIdx, (slotIdx <= listaIcones.length) ? listaIcones[slotIdx - 1] : "None");
		            }
		        }
		        
				// --- AJUSTE DE ÍCONE DE ENCONTRO ---
				var chaveEncontro = (dadosCarta.encounter_code || dadosCarta.pack_code || "").toLowerCase();
				
				if ((tipo === "scenario" || tipo === "act" || tipo === "agenda" || tipo === "enemy" || tipo === "treachery" || tipo === "location") 
    				&& (subtipo !== "basicweakness" && subtipo !== "weakness")) {
				    if (chaveEncontro !== "") {
				        var iconeEons = MAPA_ICONES_CENARIO[chaveEncontro];
				
				        // Se não está no mapa, tenta a conversão automática
				        if (!iconeEons) {
				            iconeEons = snakeParaPascal(chaveEncontro);
				            // Opcional: println("  ℹ️ Conversão automática: " + chaveEncontro + " -> " + iconeEons);
				        }
				
				        // Define no componente
				        s.set("Encounter", iconeEons || "CustomEncounter");
				
				        // Só gera log se você quiser monitorar o que está sendo automatizado 
				        // ou se o resultado for algo que você suspeita que não exista no plugin
				        if (!MAPA_ICONES_CENARIO[chaveEncontro]) {
				             var msg = "ℹ️ Código automatizado (não estava no mapa): '" + chaveEncontro + "' -> '" + iconeEons + "'";
				             if (avisosFaltantes.indexOf(msg) === -1) avisosFaltantes.push(msg);
				        }
				    }
				} else if (subtipo === "basicweakness" || subtipo === "weakness") {
    				s.set("Encounter", "None"); // Garante que fraquezas não tenham ícone de cenário no topo
				}
		
		        // --- 5. SALVAMENTO E FINALIZAÇÃO ---
				var qtd = parseInt(dadosCarta.quantity || 1);
				for (var j = 0; j < qtd; j++) {
				    if (dadosCarta.encounter_position && subtipo !== "basicweakness" && subtipo !== "weakness") {
				        var posAtu = parseInt(dadosCarta.encounter_position) + j;
				        s.set("EncounterNumber", String(posAtu));
				        var totalEnc = mapaTotais[chaveEncontro];
				        if (totalEnc) s.set("EncounterTotal", String(totalEnc));
				    } else {
				        // Se for fraqueza, limpamos os campos de encontro para não sujar o card
				        s.set("EncounterNumber", "");
				        s.set("EncounterTotal", "");
				    }
			
		            var sufixo = (qtd > 1) ? "_" + (j + 1) : "";
		            var nomeArquivo = numeroCarta.toString().padStart(3,'0') + " - " + (dadosCarta.name || "SemNome").replace(/[<>:"/\\|?*]/g, "") + sufixo + ".eon";	
		            comp.markChanged(0);
		            ResourceKit.writeGameComponentToFile(new File(pastaExport, nomeArquivo), comp);
		            cartasCriadas++;
		            println("✅ Gerada: " + nomeArquivo);
		        }
		
		    } catch (errCard) {
		        println("❌ Erro no arquivo " + arquivoAtual.getName() + ": " + errCard);
		    }
		}
		// --- GRAVAÇÃO DO RELATÓRIO DE ERROS ---
		// No lugar do bloco removido, deixe apenas isso:
		if (avisosFaltantes.length > 0) {
		    println("\ CÓDIGOS AUTOMATIZADOS/FALTANTES NO MAPA:");
		    for (var a = 0; a < avisosFaltantes.length; a++) {
		        println("   " + avisosFaltantes[a]);
		    }
		}
        alert("Fábrica Concluída!\n" + cartasCriadas + " cartas exportadas.");
    } catch (err) {
        println("💥 Erro Crítico: " + err);
    }
}
tradutorArkhamFinal();