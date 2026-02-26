const { Client, GatewayIntentBits, Events, REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// --- CONFIGURAÇÃO DAS RESPOSTAS ---
// Adicione novas palavras aqui. A chave deve ser sempre minúscula.
const RESPOSTAS = {
    'mente': 'https://media.discordapp.net/attachments/1331797808319037451/1460806208821657723/ABS2GSlidiXWczEIztJHQZgyBy_e2e8-J5_5RIXFUPqTIH46xuR6pbPS8gW6xqPlcRzGZV7grL_tlo6kJcSxX6Qit6nKjrd0-G6oZn4JDk-FvckT907RGlo2-AJwyPw2j1xHSpyo6cK1xeCjcJNAlBXXmC5SnK8R-GpDrrkBiPRRVw2_Fyjrs1024-rj.png?ex=6968414c&is=6966efcc&hm=f7686e3551332f871898a01ea26daa00e53e54ce3ff9deb6cc686baac5f25e08&=&format=webp&quality=lossless',
    'logistikon': 'https://media.discordapp.net/attachments/1331797808319037451/1460802658137936103/ABS2GSn-s09nUq-XZRUP7gWSHQheg0-J77AbuUjvWthVQcxcAqCK7EXnofHaRK3hSs9enaF9uAcRXboBTUpgNUe3oEvfCCg3fZZzwGzvHYGy9jpgrik2p6xAlBnZ6K718ZITKDpnWEEC1KK-dB5p_8CTU5ZDbw0QATImeEBt80ng9FahtyP5QQs1024-rj.png?ex=69683dfe&is=6966ec7e&hm=487fbe0470eaae8b9f773d63fa5d98c4b41eeb3a16ea24a7169d6faff852089c&=&format=webp&quality=lossless',
    'arche': 'https://media.discordapp.net/attachments/1331797808319037451/1460801925816778927/ABS2GSmCAzORF3FOlV_2w9wrzWFVzjHhUozgmBp8zTkPrGWvVYRxaHsOcwGfYM2SOc9aTGaNV3Sk5wwPbl0yGN-GXCrJzD0HRWunyhrsnlgRuLFdczsikTw9lBhMlhEv76yg2v2Wq7mGBod3JKF7OMyZxGRjC6pESxf83OpOnYAkWroxShvPs1024-rj.png?ex=69683d4f&is=6966ebcf&hm=528e121d9f17a27715ba4a901ac44afcfe933a7b070eba77d101228d3cc2e282&=&format=webp&quality=lossless',
    'álogon': 'o desconhecido nos mantém humanos, o absurdo nos mantém livres',
    'álogos': 'o desconhecido nos mantém humanos, o absurdo nos mantém livres', // Mapeando variações para a mesma resposta
    'revolta': 'https://media.discordapp.net/attachments/782767939756621844/1461341237943468146/O_Desespero.png?ex=696a3395&is=6968e215&hm=ab676d1dc1315429af8dcc3c564a096a7762fff4eb2f895aae3998a88f8d3a7a&=&format=webp&quality=lossless',
    'livinier': 'A Origem do Real entre Razão, Princípio e Mistério...',
    'logos': 'https://media.discordapp.net/attachments/1331797808319037451/1460821848223907961/ABS2GSm1IJnEEKSTS047-t3ySX5Ku-cKm78ONcebnCF9RsqlTP0RgrDkFHIhDO7mqDbhT8ehHD9SQsvIfZ-xorSR16uZOjD-3o5ic4ET0XZm3zzcbDYebqe_nJyIe9tH2LY15HeDavFwQGgT63Lphtu7vGEEw9kLY4HhlJhceNz-ScKk6Z9EXAs1024-rj.png?ex=69684fdd&is=6966fe5d&hm=e008d3468196eef4548f4c7375759ea3d9b14851fcb6681159a5939de77f0496&=&format=webp&quality=lossless',
    'teurgia': 'conhecimento...',
    'alogia': 'Não procure sobre a alogia...'

};

const ELEMENTOS = {
    'nuclear': 'Força Nuclear\n\n(Ligação entre partículas subatômicas)\nTemática: Ligação, resistência e controle estrutural.\nPoderes e Habilidades:\nManipulação Molecular: Personagens podem reforçar ou enfraquecer ligações moleculares, tornando materiais mais resistentes ou quebradiços.\nCriação de Barreiras: Construção de campos quase indestrutíveis ou armaduras ultra-resistentes.\nExplosões Controladas: Desencadeamento de reações nucleares para causar dano massivo.\nForça Interior: Aumentar a resiliência física e mental de si mesmo ou de aliados.\nInterpretação no RPG: Poderes baseados na manipulação do "núcleo" das coisas, focados em resist~encia e poder bruto.\nhttps://media.discordapp.net/attachments/947951796188500100/1468290470483464213/image.png?ex=69837b8f&is=69822a0f&hm=cfa2c0cd399a579bb55c06b410a385428ab01f355b3a4779734386b673a74e2b&=&format=webp&quality=lossless&width=245&height=261 ',
    'decaitiva': 'Força Decaitiva\n\n(Decaimento radiotativo e transformação de partículas)\nTemática: Ligação, resistência e controle estrutural.\nPoderes e Habilidades:\nManipulação molecular: Personagens podem reforçar ou enfraquecer ligações moleculares, tornando materiais mais resistentes ou quebradiços.\nCriação de Barreiras: Construção de campos quase indestrutíveis ou armaduras ultra-resistentes.\nExplosões Controladas: Desencadeamento de reações nucleares para causar dano massivo.\nForça Interior: Aumentar a resiliência física e mental de si mesmo ou de aliados.\nInterpretação no RPG: Poderes baseados na manipulação do "núcleo" das coisas, focados em resistência e poder bruto.\nhttps://cdn.discordapp.com/attachments/947951796188500100/1468309990786732142/image.png?ex=69838dbd&is=69823c3d&hm=4c5da55eee47157f8fca4b70122c59b2ec14a716c30ee4bb30c4e5585dcace0d& ',
    'eletromagnética': 'Força Eletromagnética\n\n(Interação entre partículas carregadas)\nTemática: Magnetismo, eletricidade e luz.\nPoderes e Habilidades:\nManipulação Elétrica: Gerar e controlar raios, interferir em aparelhos eletrônicos\nControle de Campo Magnético: Atrair ou repelir objetos meetálicos, criar campos defensivos.\nIlusão Óptica: Dobrar luz para criar hologramas ou camuflagem.\nvelocidade Relâmpago: Movimentar-se rapidamentnte ou realizar ações em alta velocidade.\ninterpretação no RPG: Poderes dinâmicos e versáteis, com grande potencial para ataque e suporte.\nhttps://media.discordapp.net/attachments/947951796188500100/1468598911416668233/image.png?ex=69849ad1&is=69834951&hm=d4d84455334bb6cfa38b9d50aed96dac704bcaef012608bb8eacb9b0f1fa3cf0&=&format=webp&quality=lossless&width=263&height=275',
    'gravitacional': 'Força Gravitacional\n\n(interação entre massas)\nTemática: Movimentos, peso e controle de espaço,\nPoderes e Habilidades:\nManipulação Gravitacional: Aumentar ou diminuir a gravidade em uma área, esmagando ou aliviando o peso.\nVoo e Levitação: Controlar a gravidade ao redor do corpo para voar ou flutuar.\nCriação de Singularidades: invocar buracos negros em miniatura para causar dano massivo.\nControle de Trajetória: alterar a direção de projeteis ou objetos em movimento.\nInterpretação no RPG: poderes de conrole de campo, afetando grandes areas ou manipulando objetos massivos.\nhttps://media.discordapp.net/attachments/947951796188500100/1468600664690004122/image.png?ex=69849c73&is=69834af3&hm=31a22b5ef9d0961d5de819e04320f444f74175d67d9d48b1e5420209e5438c32&=&format=webp&quality=lossless&width=265&height=266',
    'teurgica': 'Força Teurgica\n\n(Descrição da consciencia)\nTemática: Conhecer, saber, interpretar e perceber a consciencia e mente da teurgia.\nPoderes e Habilidades:\nConhecimento da Verdade: Permite conhecer e descobrir teurgias próximas.\nLinguagem: Permite ler terugias e manipula-las sem porta-las.\nCriar Teurgias: Permite criar suas próprias manipulações.\nContato com a Verdade: permite ter um breve conhecimento absoluto sobre o tempo.\ninterpretação no RPG: Poderes de entendimento e conhecimento sobre as teurgias, permitindo le-las, entende-las e cria-las.\nhttps://media.discordapp.net/attachments/947951796188500100/1468604716366823444/image.png?ex=6984a039&is=69834eb9&hm=1c9351b9a4f06800f402f262bee25ece9e5c58bb93d0a8c82666753d06dd41a6&=&format=webp&quality=lossless&width=265&height=288',
    'alogia': 'Não procure sobre a alogia...'
};

const CHAR = {
  'robert': '**Robert Palmer**\n\nRobert Palmer é um geneticista americano de 33 anos que trabalha em pesquisas de desenvolvimento genético e clonagem. Robert tem como principal hobbie praticar artes marciais e possui uma obsseção com o conceito de imortalidade. Sua teurgia é Nuclear e está atualmente atuando como um agente da *M.A.T.A.*. \nhttps://media.discordapp.net/attachments/1458105160642466007/1461925175221289125/from-PixAI-1967665948584600330-0-Photoroom.png?ex=698608ab&is=6984b72b&hm=aa8491abd9ed6b867f3f2a54183170e1e555b4b6b14894593aba3e0d1414faeb&=&format=webp&quality=lossless&width=364&height=607',
  'livinier': '3º filho da Verdade',
  'zerofuku': 'Não se apegue ao acaso, apenas a verdade vôs libertará...'
};

client.once(Events.ClientReady, () => {
  console.log(`✅ Logado como ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
    return;
  }

  if (commandName === 'palavra') {
    const palavraRaw = interaction.options.getString('busca');
    const entrada = (palavraRaw || '').toLowerCase();
    const resposta = RESPOSTAS[entrada];

    if (resposta) {
      await interaction.reply(resposta);
    } else {
      await interaction.reply('...');
    }
  }

  if (commandName === 'força') {
    const forcaRaw = interaction.options.getString('busca');
    const entrada = (forcaRaw || '').toLowerCase();
    const resposta = ELEMENTOS[entrada];

    if (resposta) {
      await interaction.reply(resposta);
    } else {
      await interaction.reply('...');
    }
  }

  if (commandName === 'personagem') {
    const personagemRaw = interaction.options.getString('busca');
    const entrada = (personagemRaw || '').toLowerCase();
    const resposta = CHAR[entrada];

    if (resposta) {
      await interaction.reply(resposta);
    } else {
      await interaction.reply('...');
    }
  }
});

// --- REGISTRO DE COMANDOS (Deploy) ---
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Responde com Pong!'),
  new SlashCommandBuilder()
    .setName('palavra')
    .setDescription('Busca uma palavra no banco de dados de respostas')
    .addStringOption(option =>
      option.setName('busca')
        .setDescription('A palavra que você quer buscar')
        .setRequired(true)),
  new SlashCommandBuilder()
    .setName('força')
    .setDescription('Busca informações sobre as forças teúrgicas')
    .addStringOption(option =>
      option.setName('busca')
        .setDescription('A força que você quer conhecer')
        .setRequired(true)),
  new SlashCommandBuilder()
    .setName('personagem')
    .setDescription('Saiba mais sobre os personagens')
    .addStringOption(option =>
      option.setName('busca')
        .setDescription('O personagem que você quer conhecer')
        .setRequired(true))
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('🔄 Atualizando comandos...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('✅ Comandos registrados!');
  } catch (error) {
    console.error(error);
  }
})();

client.login(process.env.TOKEN);