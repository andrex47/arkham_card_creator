import json
import os
import re

# ==========================================
# 1. CONFIGURAÇÕES DE MAPEAMENTO
# ==========================================

MAPA_CICLOS = {
    "01": "01_Noite_do_Fanatico",
    "02": "02_Legado_de_Dunwich",
    "03": "03_Caminho_para_Carcosa",
    "04": "04_Era_de_Esquecimento",
    "05": "05_Circulo_Desfeito",
    "06": "06_Devoradores_de_Sonhos",
    "07": "07_Conspiracao_de_Innsmouth",
    "08": "08_Borda_da_Terra",
    "09": "09_Chaves_Escarlates",
    "10": "10_Banquete_de_Hemlock_Vale",
    "11": "11_A_Cidade_Afogada",
    "50": "50_Retornos", "51": "50_Retornos", "52": "50_Retornos",
    "53": "50_Retornos", "54": "50_Retornos",
    "60": "60_Investigadores_Iniciais",
    "80": "80_Cenarios_Independentes", "81": "80_Cenarios_Independentes",
    "82": "80_Cenarios_Independentes", "83": "80_Cenarios_Independentes",
    "84": "80_Cenarios_Independentes", "85": "80_Cenarios_Independentes",
    "86": "80_Cenarios_Independentes",
    "98": "98_Promos",
    "99": "99_Livros_e_Novels",
    "90": "90_Paralelos_e_PNP" # Adicionado para cobrir cartas paralelas soltas
}

MAPA_PACKS = {
    # ==================================================
    # CORE
    # ==================================================
    "core": "Caixa_Base",
    "rcore": "Caixa_Base_Revisada",

    # ==================================================
    # NOITE DO FANATICO (Night of the Zealot)
    # ==================================================
    "tnotz": "A_Noite_do_Fanatico",
    "eotn": "A_Reuniao",
    "ptc": "O_Mascarado",
    "lita": "A_Meia_Noite",

    "rtnotz": "Retorno_a_Noite_do_Fanatico",

    # ==================================================
    # LEGADO DE DUNWICH
    # ==================================================
    "dwl": "O_Legado_de_Dunwich",
    "tmm": "O_Museu_Miskatonic",
    "tece": "O_Expresso_do_Condado_de_Essex",
    "bota": "Sangue_no_Altar",
    "uau": "Indescritivel_e_Invisivel",
    "wda": "Onde_a_Ruina_Espera",
    "litas": "Perdidos_no_Tempo_e_no_Espaco",

    "rtdwl": "Retorno_ao_Legado_de_Dunwich",

    # ==================================================
    # CAMINHO PARA CARCOSA
    # ==================================================
    "ptc": "O_Caminho_para_Carcosa",
    "eotp": "Ecos_do_Passado",
    "uapa": "Juramento_de_Sangue",
    "tuo": "O_Fantasma_da_Verdade",
    "tpm": "A_Mascara_Palida",
    "bsr": "As_Estrelas_Negras_se_Elevam",
    "tdoy": "Carcosa_Sombria",

    "rtptc": "Retorno_ao_Caminho_para_Carcosa",

    # ==================================================
    # ERA DO ESQUECIMENTO (Forgotten Age)
    # ==================================================
    "tfa": "A_Era_do_Esquecimento",
    "tof": "Os_Fios_do_Destino",
    "tbb": "Alem_do_Limiar",
    "hote": "O_Coracao_dos_Ancioes",
    "tcoa": "A_Cidade_dos_Arquivos",
    "tdi": "As_Profundezas_do_Desespero",
    "sha": "Esmigalhar_e_Estilacar",

    "rttfa": "Retorno_a_Era_do_Esquecimento",

    # ==================================================
    # O CIRCULO DESFEITO (The Circle Undone)
    # ==================================================
    "tcu": "O_Circulo_Desfeito",
    "tsn": "O_Nome_Secreto",
    "pas": "O_Pecado_de_Todos",
    "wos": "Salarios_do_Pecado",
    "wvg": "Pelo_Bem_Comum",
    "fgg": "Pelo_Bem_Maior",
    "uau": "Uniao_e_Desilusao",
    "uad": "Uniao_e_Desilusao",
    "itd": "Nas_Garras_do_Caos",
    "icc": "Nas_Garras_do_Caos",
    "bof": "Antes_do_Apocalipse",
    "bbt": "Antes_do_Trono_Negro",

    "rttcu": "Retorno_ao_Circulo_Desfeito",

    # ==================================================
    # DEVORADORES DE SONHOS (Dream-Eaters)
    # ==================================================
    "tde": "Os_Devoradores_de_Sonhos",
    "sfk": "A_Busca_por_Kadath",
    "tsh": "Mil_Formas_de_Horror",
    "dsm": "O_Lado_Sombrio_da_Lua",
    "pnr": "Ponto_Sem_Retorno",
    "wgd": "Onde_os_Deuses_Habitam",
    "woc": "A_Tecela_do_Cosmos",

    # Subdivisão Campaign / Player (usada no ArkhamDB)
    "tdcc": "O_Lado_Sombrio_da_Lua_Campanha",
    "tdcp": "O_Lado_Sombrio_da_Lua_Investigadores",

    # ==================================================
    # CONSPIRACAO DE INNSMOUTH
    # ==================================================
    "tic": "A_Conspiracao_de_Innsmouth",
    "itdd": "Fundo_Demais",
    "tdg": "O_Recife_do_Diabo",
    "hoth": "Horror_em_Alta_Marcha",
    "dre": "Uma_Luz_no_Nevoeiro",
    "lod": "O_Covil_de_Dagon",
    "iotv": "Dentro_do_Maelstrom",

    # ==================================================
    # FORMATO NOVO – CAMPANHAS EM CAIXA
    # ==================================================
    "eote": "Borda_da_Terra",
    "eoep": "Borda_da_Terra_Investigadores",
    "eoec": "Borda_da_Terra_Campanha",

    "tsk": "As_Chaves_Escarlates",
    "tskp": "As_Chaves_Escarlates_Investigadores",
    "tskc": "As_Chaves_Escarlates_Campanha",

    "fhv": "O_Banquete_de_Hemlock_Vale",
    "fhvp": "Hemlock_Vale_Investigadores",
    "fhvc": "Hemlock_Vale_Campanha",
    "tftbw": "O_Banquete_de_Hemlock_Vale_Campanha",

    # ==================================================
    # DECKS INICIAIS DE INVESTIGADOR
    # ==================================================
    "snc": "Stella_Clark",
    "hwin": "Harvey_Walters",
    "jwin": "Jacqueline_Fine",
    "ncho": "Nathaniel_Cho",
    "wfir": "Winifred_Habbamock",

    # ==================================================
    # CENARIOS INDEPENDENTES
    # ==================================================
    "rou": "A_Maldicao_do_Rougarou",
    "car": "O_Carnevale_dos_Horrores",
    "lol": "Os_Labirintos_da_Loucura",

    "gop": "Guardioes_do_Abismo",
    "guardians": "Guardioes_do_Abismo",

    "meo": "Assassinato_no_Hotel_Excelsior",
    "hotel": "Assassinato_no_Hotel_Excelsior",

    "blob": "A_Bolha_que_Devorou_Tudo",
    "tmg": "A_Bolha_que_Devorou_Tudo",

    "mtt": "Maquinacoes_Atraves_do_Tempo",
    "fof": "Fortuna_ou_Loucura",
    "film_fatale": "Film_Fatale",

    # ==================================================
    # PROMOS / EPIC / PRINT & PLAY
    # ==================================================
    "blbe": "Promos_By_the_Book",
    "btb": "By_the_Book",

    "bob": "Bad_Blood",
    "bad": "Bad_Blood",

    "aof": "Across_the_Otherworlds",
    "enc": "Conteudo_Promocional",
    "otr": "Conteudo_Promocional",
    "rtr": "Retornos_Conteudo_Promocional",

    "rod": "Read_or_Die",
    "rop": "Read_or_Die",

    "ltr": "Labirintos_da_Loucura_Epic",
    "hfa": "Horror_em_Alta_Marcha_Promo",

    "tdor": "Conteudo_Promocional_Yoth",

    # ==================================================
    # PARALELOS (INVESTIGADORES)
    # ==================================================
    "parallel": "Investigadores_Paralelos",
    "ptr": "Investigadores_Paralelos",
    "pap": "Agnes_Baker_Paralela",
}

# ==========================================
# 2. FUNÇÕES AUXILIARES
# ==========================================

def sanitizar_nome_arquivo(nome: str) -> str:
    """Garante que o nome do arquivo seja válido para todos os SOs."""
    nome_limpo = re.sub(r'[^\w\s-]', '', nome)
    return re.sub(r'[-\s]+', '_', nome_limpo).strip('_')

# ==========================================
# 3. LÓGICA PRINCIPAL
# ==========================================

# ==========================================
# 3. LÓGICA PRINCIPAL (ATUALIZADA PARA SUBPASTAS)
# ==========================================

def split_arkham_data(caminho_json_unificado, pasta_destino):
    if not os.path.exists(caminho_json_unificado):
        print(f"❌ Erro: '{caminho_json_unificado}' não encontrado.")
        return

    print("⏳ Carregando o arquivo JSON principal...")
    with open(caminho_json_unificado, 'r', encoding='utf-8-sig') as f:
        try:
            todas_cartas = json.load(f)
        except json.JSONDecodeError as e:
            print(f"❌ Erro ao ler JSON: {e}")
            return

    packs_organizados = {}

    print("⚙️ Organizando cartas por Ciclo e Pack...")
    for carta in todas_cartas:
        pack_code = carta.get('pack_code', 'desconhecido')
        code = str(carta.get('code', '99999'))

        prefixo_ciclo = code[:2]
        nome_ciclo = MAPA_CICLOS.get(prefixo_ciclo, "Outros_Extras")

        if nome_ciclo not in packs_organizados:
            packs_organizados[nome_ciclo] = {}
        if pack_code not in packs_organizados[nome_ciclo]:
            packs_organizados[nome_ciclo][pack_code] = []

        packs_organizados[nome_ciclo][pack_code].append(carta)

    siglas_desconhecidas = set()

    print(f"📂 Iniciando a criação da estrutura de pastas e subpastas em '{pasta_destino}'...")
    for ciclo, packs in packs_organizados.items():
        pasta_ciclo = os.path.join(pasta_destino, ciclo)

        for pack_code, cartas in packs.items():
            if pack_code not in MAPA_PACKS:
                siglas_desconhecidas.add(pack_code)

            nome_base = MAPA_PACKS.get(pack_code, pack_code.capitalize())
            nome_pasta_pack = sanitizar_nome_arquivo(nome_base)

            # NOVIDADE: Criar a subpasta exclusiva para o pack
            pasta_pack = os.path.join(pasta_ciclo, nome_pasta_pack)
            os.makedirs(pasta_pack, exist_ok=True)

            # NOVIDADE: Salvar cada carta individualmente pelo seu código
            for carta in cartas:
                # Usamos o 'code' da carta como nome do arquivo para garantir que seja único
                codigo_carta = str(carta.get('code', 'sem_codigo'))
                caminho_final = os.path.join(pasta_pack, f"{codigo_carta}.json")

                with open(caminho_final, 'w', encoding='utf-8') as f:
                    json.dump(carta, f, ensure_ascii=False, indent=4)

    print("\n✅ Processo Concluído com Sucesso!")
    print(f"Estrutura gerada em: {os.path.abspath(pasta_destino)}")

    if siglas_desconhecidas:
        print("\n⚠️ AVISO: As seguintes siglas foram encontradas, mas não estão no MAPA_PACKS:")
        print(list(siglas_desconhecidas))

# ==========================================
# 4. EXECUÇÃO
# ==========================================
if __name__ == "__main__":
    ORIGEM = 'arkham_unificado.json'
    DESTINO = 'arkham_db_arvore_completa' # Nome novo para evitar conflitos

    split_arkham_data(ORIGEM, DESTINO)