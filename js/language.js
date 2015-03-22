// Last file update: 09 Feb 2015, 6.21pm (Chinese, Indonesian, German, Dutch languages are separated to raw HTML files)
// This data is from http://en.wikipedia.org/wiki/World_language
// 1. English -> approximately 2 Billion speakers (VisuAlgo default language)
// 2. Chinese/Mandarin -> approximately 1 Billion speakers (3 translators)
//   Spanish -> approximately 520 Million speakers (not available yet, waiting for volunteers)
//   Hindustani -> approximately 480 Million speakers (not available yet, waiting for volunteers)
//   Arabic -> approximately 350 Million speakers (not available yet, waiting for volunteers)
// 3. Russian -> approximately 270 Million speakers (1 translator)
// 4. Indonesian/Malay -> approximately 250 Million speakers (3 translators)
//   French -> approximately 230 Million speakers (not available yet, waiting for volunteers)
//   Portuguese -> approximately 220 Million speakers (not available yet, waiting for volunteers)
// 5. Bengali -> approximately 210 Million speakers (3 translators)
// 6. Japanese -> approximately 100 Million speakers (1 translator)
// 7. German -> approximately 86 Million speakers (2 translators)
// 8. Korean -> approximately 77 Million speakers (2 translators)
// 9. Vietnamese -> approximately 75 Million speakers (1 translator)
// 10. Thai -> approximately 40 Million speakers (1 translator)
// 11. Dutch -> approximately 28 Million speakers (1 translator)

var language = 'en'; // the default language is en-US (English)
var searchtext = 'Search...';
var sorting, bitmask, linked, hashtable, heap, bst, graphs, union, segment, bit, recursion, traversal, mst, sssp, maxflow, matching, suffixtree, suffixarray, geometry;

function changeLanguage() {
  // console.log('I am called, language = ' + language + ' window = ' +  window.navigator.language.substring(0, 2));
  if (language == 'zh') { // Chinese: zh-Hans, zh-cn, zh-hans-cn, zh-hans-sg, zh-Hant, zh-hk, zh-tw, zh-hant-hk, zh-hant-mo, zh-hant-tw, Contributors: Wang Zi, Pan Long, Huang Da
    sorting = new Array("sorting", "冒泡", "选择", "插入", "归并", "快速", "随机快速", "选择", "插入", "计数", "基数", "排序", "cs2020", "cs1020", "cs1010", "cs3230", "数组", "链表", "数据结构", "算法", "排序");
    bitmask = new Array("bitmask", "位操作", "布尔值", "数组", "小型集合", "cs3233", "cs2020", "cs2010", "链表", "数据结构", "位运算");
    linked = new Array("linked", "栈", "队列", "单向", "双向", "双端队列", "cs2020", "cs1020", "数组", "数据结构", "链接", "线性表");
    hashtable = new Array("hashtable", "open addressing", "separate chaining", "linear", "quadratic", "double hashing", "cs2020", "cs1020", "array", "data structure", "hash", "table"); // not translated yet
    heap = new Array("heap", "堆","优先队列","堆排序","递归","cs2020", "cs2010","递归","数据结构", "树", "二叉堆");
    bst = new Array("bst", "表","集合(set)","对应表(map)","二叉搜索树","Adelson-Velskii Landis (AVL)","cs2020","cs2010","cs3230", "递归","递归","数据结构","AVL","平衡二叉查找树");
    graphs = new Array("graphs", "树", "完全图","二分图","有向无环图 (DAG)","邻接矩阵","邻接表","边表","cs2010","cs2020","图");
    union = new Array("union", "并查集","树","压缩","秩","路径压缩","按秩合并","cs3233","cs2020","cs2010","数组","集合","递归","递归","数据结构","并查集");
    segment = new Array("segmenttree", "区间","最小/最大/求和","惰性更新","递归","cs3233","递归","数据结构","线段树");
    bit = new Array("bit", "树状数组", "区间", "树状数组", "区间/点的查询/更新", "cs3233", "递归","递归","数据结构","树状数组");
    recursion = new Array("recursion", "动态规划","树","有向无环图","cs1010", "cs1020", "cs2010","cs2020","cs3230","cs3233","递归","递归");
    traversal = new Array("traversal", "遍历","深度优先搜索","广度优先搜索","拓扑排序","强连通分量","2-SAT","拓扑排序","强连通分量","二分图校验", "cs2010", "cs2020","cs3230","算法","Tarjan","Kosaraju","Kahn","图形","遍历");
    mst = new Array("mst", "Prim", "Kruskal", "算法", "cs2020", "cs2010", "图", "最小", "生成", "树");
    sssp = new Array("sssp", "广度优先搜索", "Bellman Ford", "Dijkstra", "cs2010", "cs2020", "图", "算法", "单源最短路径");
    maxflow = new Array("maxflow", "最大流", "最小割", "Edmonds Karp", "Dinic", "Ford Fulkerson", "图", "cs2020", "cs3233", "算法", "网络流");
    matching = new Array("matching", "增广路径", "Hopcroft Karp", "Edmonds", "cs3233", "图","算法", "匹配");
    suffixtree = new Array("suffixtree", "匹配", "重复", "共有", "字符串", "cs3233", "树","后缀","数据结构","后缀树");
    suffixarray = new Array("suffixarray", "排序", "最长公共前缀", "字符串","排序","匹配","重复","共有","后缀数组", "cs3233", "后缀", "数组", "数据结构");
    geometry = new Array("geometry", "多边形","周长","凸多边形","卷数","多边形包含","多边形切割","凹多边形","凸包","Graham 扫描", "cs3233","算法","计算几何");
  }
  else if (language == 'ru') { // Russian: ru, ru-ru. Contributors: Mikhail Goncharov
    $("#training-link").html("Пройти тест!");
    $("#test-link").html("Присоединиться к текущему тесту");
    $("#ans-link").html("Ответы на последний тест");

    searchtext = "Найти...";

    sorting = new Array("sorting", "пузырьком", "выбором", "вставками", "слиянием", "быстрая", "быстрая со случайностью", "выбор", "вставка", "подсчет", "поразраздная", "сортировка", "cs2020", "cs1020", "cs1010", "cs3230", "массив", "лист", "структура данных", "алгоритм", "сортировка");
    bitmask = new Array("bitmask", "битовые операции", "логическое", "массив", "небольшое множество", "cs3233", "cs2020", "cs2010", "список", "структура данных", "битовая маска");
    linked = new Array("linked", "стек", "очередь", "односвязный", "двусвязный", "дек", "cs2020", "cs1020", "массив", "структура данных", "связный", "лист");
    hashtable = new Array("hashtable", "open addressing", "separate chaining", "linear", "quadratic", "double hashing", "cs2020", "cs1020", "array", "data structure", "hash", "table"); // not translated yet
    heap = new Array("heap", "очередь с приоритетами", "сортировка кучей", "рекурсивная", "cs2020", "cs2010", "рекурсия", "структура данных", "бинарная куча");
    bst = new Array("bst", "таблица", "множество", "словарь", "BST", "Адельсон-Вельский Ландис", "cs2020", "cs2010", "cs3230", "рекурсия", "рекурсивная", "структура данных", "АВЛ", "двоичное дерево поиска");
    graphs = new Array("graphs", "дерево", "полный", "двудольный (биграф)", "направленный ациклический граф", "матрица смежности", "список смежности", "список ребер", "cs2010", "cs2020", "структура данных", "графы");
    union = new Array("union", "UFDS", "дерево", "сжатие", "ранг", "сжатие пути", "объединение по рангу", "cs3233", "cs2020", "cs2010", "массив", "множество", "рекурсия", "рекурсивная", "структура данных", "система непересекающихся множеств");
    segment = new Array("segmenttree", "отрезок", "минимум/максимум/сумма", "ленивое обновление", "рекурсивная", "cs3233", "рекурсия", "структура данных", "дерево отрезков");
    bit = new Array("bit", "Фенвик", "отрезок", "BIT", "отрезок/запрос в точке/обновление", "cs3233", "рекурсия", "рекурсивный", "структура данных", "двоичное индексированное дерево");
    recursion = new Array("recursion", "динамическое программирование", "дерево", "направленный ациклический граф (DAG)", "cs1010", "cs1020", "cs2010", "cs2020", "cs3230", "cs3233", "рекурсивная", "рекурсия");
    traversal = new Array("traversal", "поиск в глубину", "поиск в ширину", "toposort", "SCC", "задача выполнимости 2-КНФ", "топологическая сортировка", "сильно связные компоненты", "проверка на двудольность", "cs2010", "cs2020", "cs3230", "алгоритм", "Тарьян", "Косараджи", "Кан", "графы", "обход");
    mst = new Array("mst", "MST", "Прим", "Крускал", "алгоритм", "cs2020", "cs2010", "графы", "минимальное", "остовное", "дерево");
    sssp = new Array("sssp", "SSSP", "Беллман — Форд", "Дейкстра", "поиск в ширину", "cs2010", "cs2020", "графы", "алгоритм", "кратчайшие пути из одной вершины");
    maxflow = new Array("maxflow", "максимальный поток", "минимальный разрез", "Эдмондс Карп", "Диниц", "Форд Фалкерсон", "графы", "cs2020", "cs3233", "алгоритм", "поток в сети");
    matching = new Array("matching", "увеличивающий путь", "Хопкрофт Карп", "Эдмондс", "cs3233", "графы", "алгоритм", "сопоставление")
    suffixtree = new Array("suffixtree", "сопоставление", "повторяющийся", "общий", "строка", "cs3233", "дерево", "суффикс", "структура данных", "дерево суффиксов");
    suffixarray = new Array("suffixarray", "сортировка", "общий префикс", "строка", "наибольшай общий префикс", "сопоставление", "сортировка", "повторяющийся", "общий", "cs3233", "структура данных", "суффикс", "массив", "массив суффиксов");
    geometry = new Array("geometry", "многоугольник", "индекс контура", "внутри полигона", "разрез многоугольника", "периметр", "выпуклый", "невыпуклый", "выпуклая оболочка", "алгоритм Грэхема", "cs3233", "алгоритм", "вычислительная геометрия");

    $("#subtitle").html("анимированные визуализации структур данных (Russian)");
    $("#sortingtext").html("Сортировка");
    $("#bitmasktext").html("Битовая маска");
    $("#linkedtext").html("Связный список, стек, очередь, дек");
    $("#bsttext").html("Двоичное дерево поиска, АВЛ-дерево");
    $("#heaptext").html("Двоичная куча");
    $("#graphstext").html("Структуры данных для представления графов");
    $("#uniontext").html("Система непересекающихся множеств");
    $("#segmenttreetext").html("Дерево отрезков");
    $("#bittext").html("Двоичное индексированное дерево");
    $("#recursiontext").html("Дерево рекурсии/направленный ациклический граф");
    $("#traversaltext").html("Обход графа");
    $("#msttext").html("Минимальное остовное дерево");
    $("#sssptext").html("Кратчайшие пути из одной вершины");
    $("#maxflowtext").html("Поток в сети");
    $("#matchingtext").html("Сопоставление графов");
    $("#suffixtreetext").html("Дерево суффиксов");
    $("#suffixarraytext").html("Массив суффиксов");
    $("#geometrytext").html("(Вычислительная) геометрия");
    $("#abouttext").html("О VisuAlgo");

    $("#motivation").html("<h2>Причина создания</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">Концепция VisuAlgo была придумана в 2011 доктором Steven Halim (Стивен Халим) как инструмент для его студентов для помогающий лучше разобраться в структурах данных и алгоритмах. " +
    "Студенты могут изучать основы самостоятельно и в комфотном темпе. VisuAlgo — это постоянно доступный двойник доктора. " +
    "Вместе с несколькими из своих студентов из Национального Университета Сингапура (NUS, см. 'Team'), им были разработаны и объединены в коллекцию визуализации — " +
    "от простых алгоритмов сортировки до комплексных структур представления графов и алгоритмов на них, а также алгоритмы над строками и из вычислительной геометрии.<br></p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em\" align=\"left\">VisuAlgo содержит <b>множество нетривиальных алгоритмов</b>, которые обсуждаются в книге д-р Steven Halim-а и не только " +
    "(прим.: книга <a href=\"http://sites.google.com/site/stevenhalim/\">'Competitive Programming 3'</a>, написанная в соавторстве со своим братом д-р Felix Halim). " +
    "В настоящий момент некоторые из визуализаций и анимаций нетривиальных алгоритмов могут быть найдены <b>только</b> на VisuAlgo. " +
    "Например, на <a href=\"dfsbfs.html\">визуализации обходов графа</a>, мы не только показываем стандартные алгоритмы поиска в глубину и в ширину, но и их вариации, такие как " +
    "модификация поиска в глубину для поиска шарниров (разделяющих вершин) и мостов, алгоритмы Тарьяна и Косараджи (подобные обходу в глубину) для поиска сильно связных компонент направленного графа, " +
    "а также даем возможность увидеть неявный граф для задачи выполнимости формулы 2-коньюктивной нормальной формы (2-КНФ) небольшого размера и проверить её выполнимость.</p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em\" align=\"left\">Несмотря на то, что сайт создан специально для студентов NUS посещающих различные курсы о структурах данных и алгоритмах (см. " +
    "<a href=\"http://nusmods.com/modules/CS1010\" target=\"_blank\">CS1010</a>, " +
    "<a href=\"http://nusmods.com/modules/CS1020\" target=\"_blank\">CS1020</a>, " +
    "<a href=\"http://nusmods.com/modules/CS2010\" target=\"_blank\">CS2010</a>, " +
    "<a href=\"http://nusmods.com/modules/CS2020\" target=\"_blank\">CS2020</a>, " +
    "<a href=\"http://nusmods.com/modules/CS3230\" target=\"_blank\">CS3230</a>, и " +
    "<a href=\"http://nusmods.com/modules/CS3233\" target=\"_blank\">CS3233</a>), как пропогандисты онлайн-обучения мы надеемся, что пытливые умы со всего мира также найдут наши визуализации полезными.<br><br></p>");

    $("#developments").html("<h2>В разработке</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">VisuAlgo находится разработке и мы создаем все более сложные визуализации. " +
    "Визуализации создаваемые нашей командой в настоящий момент: хеш-таблица (с использованием нескольких способов хеширования), алгоритм Джека Эдмондса (Jack Edmonds') для сопоставления графов, алгоритм Чу-Лю — Эдмонса (Chu-Liu Edmonds') для нахождения минимального остовного дерева направленного графа, и т.д.<br></p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">Однако, наиболее захватывающий прогресс — в создании автоматического генератора вопросов (для системы онлайн-тестирования), " +
    "который позволяет студенту проверить свои знания базовых структур данных и алгоритмов. " +
    "Вопросы <b>создаются случайным образом</b> с использованием некоторых правил и студенты <b>мгновенно и автоматически узнают оценку</b> после отправки ответа на наш сервер оценок. " +
    "Такой онлайн-опросник, когда созреет, теоретически может избавить от <b>ручных</b> проверок знаний о базовых структурах данных и алгоритмах на типичных экзаменах по информатике во многих университетех. " +
    "Придав небольшой (однако ненулевой) вес прохождению онлайн-теста, преподаватель информатики сможет (существенно? — это выяснится после того как д-р Steven Halim закончит свой эксперимент над курсом алгоритмов в текущем семестре) " +
    "увеличить мастерство своих студентов в подобных вопросах, поскольку им будет дана возможность ответить на практически неограниченное количество вопросов, правильность ответов на которые можно проверить моментально, прежде чем они возмуться проходить онлайн-экзамен. " +
    "Чтобы воспользоваться замечательной возможностью пройти тест, нажмите на кнопку 'Начать тест!' в правом верхнем углу страницы (на английском языке).<br><br></p>");

    $("#bug").html("<h2>Найденные ошибки или предложения улучшений</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">VisuAlgo — незаконченный проект. Д-р Steven Halim и его команда активно работают над улучшением VisuAlgo. " +
    "Если вы заметили ошибку в любой из наших визуализаций/тесте или если вы хотели бы увидеть что-то новое, пожалуйста, свяжитесь с д-р Steven Halim. " +
    "Адрес почты — его полное имя (без пробелов) собака gmail точка com.<br></p><br>");

    $("#publications").html("<h2>Публикации</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">Данная работа была коротко представлена на CLI Workshop во время мирового финала ACM ICPC 2012 (Польша, Варшива) " +
    "и на IOI Conference во время IOI 2012 (Сирмионе-Монтичиари, Италия). " +
    "Нажмите на <a href=\"http://www.ioinformatics.org/oi/shtm/INFOL099.shtml\" target=\"_blank\">эту ссылку</a> чтобы прочесть нашу публикацию 2012 года о данной системе (в 2012 она еще не имела имени VisuAlgo).<br><br></p>");
  }
  else if (language == 'id') { // Indonesian: id, id-id, Contributors: Steven Halim, Frederikus Hudi, Ashar Fuadi
    sorting = new Array("sorting", "pengurutan", "gelembung", "pilih", "sisipkan", "gabungkan", "cepat", "cepat teracak", "pemilihan", "penyisipan", "perhitungan", "basis", "urutkan", "cs2020", "cs1020", "cs1010", "cs3230", "larik", "senarai", "struktur data", "algoritma", "pengurutan");
    bitmask = new Array("bitmask", "manipulasi bit", "Boolean", "larik", "set kecil", "masker bit", "cs3233", "cs2020", "cs2010", "senarai", "struktur data", "bitmask");
    linked = new Array("linked", "tumpukan", "antrean", "tunggal", "ganda", "cs2020", "cs1020", "larik", "struktur data", "senarai", "berantai");
    hashtable = new Array("hashtable", "open addressing", "separate chaining", "linear", "quadratic", "double hashing", "cs2020", "cs1020", "array", "data structure", "hash", "table"); // not translated yet
    heap = new Array("heap", "antrean berprioritas", "rekursif", "pengurutan timbunan", "cs2020", "cs2010", "rekursi", "struktur data", "pohon", "timbunan biner");
    bst = new Array("bst", "tabel", "himpunan", "BST", "himpunan bersekutu", "Adelson-Velskii Landis", "cs2020", "cs2010", "cs3230", "rekursi", "rekursif", "struktur data", "pohon AVL", "pohon biner terurut"); // catatan: ga yakin himpunan bersekutu = map
    graphs = new Array("graphs", "graf", "pohon", "lengkap", "bipartite", "DAG", "Adjacency Matriks", "Adjacency List", "Senarai Sisi", "cs2010", "cs2020", "struktur data", "graf"); // catatan: (simpul, sisi, busur) = (vertex, edge, arc); Ga yakin senarai sisi = edge list
    union = new Array("union", "gabung", "cari", "UFDS", "pohon", "kompres", "ranking", "kompresi path", "gabung berdasarkan ranking", "cs3233", "cs2020", "cs2010", "array", "himpunan", "rekursi", "rekursif", "struktur data", "Himpunan Saling Lepas Gabung-Cari");
    segment = new Array("segmenttree", "rentang", "Minimum/Maksimum/Jumlah", "lazy update", "rekursi", "rekursif", "cs3233", "struktur data", "Pohon Segmen"); // catatan: range = rentang? apa bahasa Indonesia dari "lazy update"?
    bit = new Array("bit", "Fenwick", "BIT", "Rentang", "Titik", "Permintaan", "Pembaruan", "rentang", "cs3233", "rekursi", "rekursif", "struktur data", "Pohon Indeks Biner");
    recursion = new Array("recursion", "Pemrograman Dinamis", "pohon", "DAG", "cs1010", "cs1020", "cs2010", "cs2020", "cs3230", "cs3233", "algorithma", "rekursif", "rekursi");
    traversal = new Array("traversal", "DFS", "BFS", "toposort", "SCC", "2-SAT", "pengurutan topologi", "Komponen Berkait Kuat", "pengecekan bipartite", "cs2010", "cs2020", "cs3230", "algoritma", "graf", "eksplorasi", "Tarjan", "Kosaraju", "Kahn");
    mst = new Array("mst", "MST", "Prim", "Kruskal", "algoritma", "cs2020", "cs2010", "graf", "pohon", "rentangan", "terkecil");
    sssp = new Array("sssp", "SSSP", "BFS", "Bellman Ford", "Dijkstra", "cs2010", "cs2020", "graf", "algoritma", "Jarak Terpendek Sumber Tunggal");
    maxflow = new Array("maxflow", "aliran terbesar", "potongan terkecil", "Dinic", "Edmonds Karp", "Ford Fulkerson", "graf", "cs2020", "cs3233", "algoritma", "Jaringan Aliran");
    matching = new Array("matching", "augmenting path", "Hopcroft Karp", "Edmonds", "cs3233", "algoritma", "graf", "pencocokan")
    suffixtree = new Array("suffixtree", "matching", "berulang", "sama", "string", "cs3233", "pohon", "akhiran", "struktur data", "pohon akhiran");
    suffixarray = new Array("suffixarray", "pengurutan", "LCP", "pencocokan", "string", "berulang", "sama", "cs3233", "struktur data", "larik", "akhiran", "larik akhiran");
    geometry = new Array("geometry", "polygon", "keliling", "cembung", "winding number", "inPolygon", "potong polygon", "cekung", "hull cembung", "Graham scan", "cs3233", "algoritma", "Geometri Komputasional");
  }
  else if (language == 'bn')  { // Bangla: bn, Contributors: Abdullah-Al-Imran, Ahmad Faiyaz and Moshiur Rahman
    $("#training-link").html("প্রশিক্ষণ শুরু করুন!");
    $("#test-link").html("চলমান পরীক্ষায় যোগ দিন");
    $("#ans-link").html("সর্বশেষ পরীক্ষার উত্তরসমূহ");
 
    searchtext = "অনুসন্ধান...";
 
    sorting = new Array("sorting", "বাবল", "সিলেক্ট", "ইনসার্ট", "মার্জ", "কুইক", "র‍্যান্ডোমাইজড কুইক", "সিলেকশন", "ইনসার্টশন", "কাউন্টিং", "রেডিক্স", "সর্ট", "cs2020", "cs1020", "cs1010", "cs3230", "অ্যারে", "লিস্ট", "ডাটা স্ট্রাকচার", "অ্যালগোরিদম", "সর্টিং");
    bitmask = new Array("bitmask", "বিট ম্যানিপুলেশন", "বুলিয়ান", "অ্যারে", "স্মল সেট", "cs3233", "cs2020", "cs2010", "লিস্ট", "ডাটা স্ট্রাকচার", "বিটমাস্ক");
    linked = new Array("linked", "স্ট্যাক", "কিউ", "সিঙ্গেল", "ডবল", "ডিকিউ", "cs2020", "cs1020", "অ্যারে", "ডাটা স্ট্রাকচার", "লিঙ্কড", "লিস্ট");
    hashtable = new Array("hashtable", "open addressing", "separate chaining", "linear", "quadratic", "double hashing", "cs2020", "cs1020", "array", "data structure", "hash", "table"); // not translated yet
    heap = new Array("heap", "প্রাইওরিটি কিউ", "হিপ সর্ট", "রিকারসিভ", "cs2020", "cs2010", "রিকারসন", "ডাটা স্ট্রাকচার", "বাইনারি হিপ");
    bst = new Array("bst", "টেবিল", "সেট", "ম্যাপ", "BST", "Adelson-Velskii Landis", "cs2020", "cs2010", "cs3230", "রিকারসন", "রিকারসিভ", "ডাটা স্ট্রাকচার", "AVL", "বাইনারি সার্চ ট্রি");
    graphs = new Array("graphs", "ট্রি", "কমপ্লিট", "বাইপারটাইট", "DAG", "অ্যাডজেসেন্সি ম্যাট্রিক্স", "অ্যাডজেসেন্সি লিস্ট", "এজ লিস্ট", "cs2010", "cs2020", "ডাটা স্ট্রাকচার", "গ্রাফসমূহ");
    union = new Array("union", "UFDS", "ট্রি", "কম্প্রেশ", "র‍্যাংক", "পাথ কম্প্রেশন", "ইউনিয়ন বাই র‍্যাঙ্ক", "cs3233", "cs2020", "cs2010", "অ্যাারে", "সেট", "রিকারসন", "রিকারসিভ", "ডাটা স্ট্রাকচার", "ইউনিয়ন-ফাইন্ড ডিসজয়েন্ট সেটস");
    segment = new Array("segmenttree", "রেঞ্জ", "সর্বনিম্ন/সর্বোচ্চ/যোগফল", "লেজি আপডেট", "রিকারসিভ", "cs3233", "রিকারসন", "ডাটা স্ট্রাকচার", "সেগমেন্ট ট্রি");
    bit = new Array("bit", "Fenwick", "রেঞ্জ", "BIT", "রেঞ্জ/পয়েন্ট কুয়েরি/আপডেট", "cs3233", "রিকারসন", "রিকারসিভ", "ডাটা স্ট্রাকচার", "বাইনারি ইনডেক্সড ট্রি");
    recursion = new Array("recursion", "ডাইনামিক প্রোগ্রামিং", "ট্রি", "DAG", "cs1010", "cs1020", "cs2010", "cs2020", "cs3230", "cs3233", "রিকারসিভ", "রিকারসন");
    traversal = new Array("traversal", "DFS", "BFS", "টপোসর্ট", "SCC", "2-SAT", "টপোলজিকাল সর্ট", "স্ট্রংলি কানেক্টেড কম্পোনেন্ট", "বাইপারটাইট চেক", "cs2010", "cs2020", "cs3230", "অ্যালগোরিদম", "টারজান", "কসারাজু", "খান", "গ্রাফসমূহ", "ট্রাভার্সাল");
    mst = new Array("mst", "MST", "প্রিম", "ক্রুসকাল", "অ্যালগোরিদম", "cs2020", "cs2010", "গ্রাফসমূহ", "মিন", "স্প্যানিং", "ট্রি");
    sssp = new Array("sssp", "SSSP", "বেলম্যান  ফোর্ড", "ডায়াক্সট্রা", "BFS", "cs2010", "cs2020", "গ্রাফসমূহ", "অ্যালগোরিদম", "সিঙ্গেল সোর্স শর্টেস্ট পাথ");
    maxflow = new Array("maxflow", "ম্যাক্স ফ্লো", "মিন কাট", "এডমন্ড কার্প", "ডিনিক", "ফোর্ড ফুলকারসন", "গ্রাফসমূহ", "cs2020", "cs3233", "অ্যালগোরিদম", "নেটওয়ার্ক ফ্লো");
    matching = new Array("matching", "অগমেন্টিং পাথ", "হপক্রফট কার্প", "এডমন্ড", "cs3233", "গ্রাফসমূহ", "অ্যালগোরিদম", "ম্যাচিং")
    suffixtree = new Array("suffixtree", "ম্যাচিং", "রিপিটেড", "কমন", "স্ট্রিং", "cs3233", "ট্রি", "সাফিক্স", "ডাটা স্ট্রাকচার", "সাফিক্স ট্রি");
    suffixarray = new Array("suffixarray", "সর্টিং", "কমন প্রিফিক্স", "স্ট্রিং", "LCP", "ম্যাচিং", "সর্টিং", "রিপিটেড", "কমন", "cs3233", "ডাটা স্ট্রাকচার", "সাফিক্স", "অ্যারে", "সাফিক্স অ্যারে");
    geometry = new Array("geometry", "বহুভুজ", "ওয়াইন্ডিং নাম্বার", "ইনপলিগন", "কাট পলিগন", "পরিসীমা", "কনভেক্স", "কনকেভ", "কনভেক্স হাল", "গ্রাহাম স্ক্যান", "cs3233", "অ্যালগোরিদম", "কম্পিউটেশনাল ত্রিকোণমিতি");
 
    $("#subtitle").html("অ্যানিমেশন এর মাধ্যমে অ্যালগোরিদম এবং ডাটা স্ট্রাকচার গুলোর কার্যপ্রক্রিয়া প্রদর্শন (Bengali)");
    $("#sortingtext").html("সর্টিং");
    $("#bitmasktext").html("বিটমাস্ক");
    $("#linkedtext").html("লিংকড লিস্ট, স্ট্যাক, কিউ, ডিকিউ");
    $("#bsttext").html("বাইনারি সার্চ ট্রি, AVL ট্রি");
    $("#heaptext").html("বাইনারি হিপ");
    $("#graphstext").html("গ্রাফ ডাটা স্ট্রাকচারস");
    $("#uniontext").html("ইউনিয়ন-ফাইন্ড ডিসজয়েন্ট সেটস");
    $("#segmenttreetext").html("সেগমেন্ট ট্রি");
    $("#bittext").html("বাইনারি ইন্ডেক্সড ট্রি");
    $("#recursiontext").html("জেনেরিক রিকারসন/DAG");
 
    $("#traversaltext").html("গ্রাফ ট্রাভারসাল");
    $("#msttext").html("মিনিমাম স্প্যানিং ট্রি");
    $("#sssptext").html("সিঙ্গেল-সোর্স শর্টেস্ট পাথ");
    $("#maxflowtext").html("নেটওয়ার্ক ফ্লো");
    $("#matchingtext").html("গ্রাফ ম্যাচিং");
    $("#suffixtreetext").html("সাফিক্স ট্রি");
    $("#suffixarraytext").html("সাফিক্স অ্যারে");
    $("#geometrytext").html("(কম্পিউটেশনাল) জ্যামিতি");
 
    $("#abouttext").html("VisuAlgo সম্পর্কে");
 
    $("#motivation").html("<h2>অনুপ্রেরণা</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">২০১১ সালে ড.স্টিভেন হালিম তার ছাত্রদের ডাটাস্ট্রাকচার এবং অ্যালগোরিদম ভালো করে বোঝানোর সুবিধার জন্য VisuAlgo কে একটা টুল হিসেবে ব্যবহার করার চিন্তা করেন, " +
    "যাতে তারা নিজেরা নিজেদের উৎসাহে শিখতে পারে। VisuAlgo ড.স্টিভেনের ২৪ ঘণ্টা উপস্থিতির মতোই।" +
    "তিনি ন্যাশনাল ইউনিভার্সিটি অফ সিঙ্গাপুর এর তার কিছু ছাত্রদের সাথে একত্রে মিলে (দেখুন 'টীম'), সাধারণ সর্টিং অ্যালগোরিদম থেকে শুরু করে জটিল গ্রাফ ডাটা স্ট্রাকচার ও অ্যালগোরিদম এবং স্ট্রিং+জিওমেট্রি অ্যালগোরিদম ভিজ্যুয়ালাইজেশনের একটি সিরিজ ডেভেলপ করেন।<br></p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em\" align=\"left\">VisuAlgo তে আছে<b>অনেক অ্যাডভান্সড অ্যালগোরিদম</b> যা ড.স্টিভেন এর বইয়ে আলোচনা করা হয়েছে " +
    "(Note: This <a href=\"http://sites.google.com/site/stevenhalim/\">'Competitive Programming 3'</a> বইটির সহ-লেখক হলেন তার ভাই ড.ফেলিক্স হালিম।) ।" +
    "বর্তমান সময়ে এরকম অ্যাডভান্সড অ্যালগোরিদমগুলোর ভিজ্যুয়ালাইজেশন/অ্যানিমেশন <b>শুধু</b> VisuAlgo তেই পাওয়া যাবে।" +
    "যেমনঃ, <a href=\"dfsbfs.html\">গ্রাফ ট্রাভারসাল ভিজ্যুয়ালাইজেশনে</a>, স্ট্যান্ডার্ড ডেপথ-ফার্স্ট সার্চ (DFS) এবং ব্রেডথ-ফার্স্ট সার্চ (BFS) অ্যালগোরিদমগুলো নিয়েই শুধু আলোচনা করা হয়নি, তাদের বিকল্প পদ্ধতিগুলো নিয়েও আলোচনা করা হয়েছে।, যেমনঃ " +
    "আরটিকুলেশন পয়েন্ট খোঁজার জন্য (কাট ভারটেক্স) DFS এর পরিবর্তন এবং ডিরেক্টেড গ্রাফের স্ট্রংলি কানেক্টেড কম্পোনেন্টসগুলো (SCCs) খোঁজার জন্য ব্রিজ, টারজান'স এবং কসারাজু'স DFS এর মতো অ্যালগোরিদমগুলো, " +
    " এবং small 2-SAT(isfiablity) ইন্সট্যান্স এর ইমপ্লিকেশন গ্রাফ ভিজ্যুয়ালাইজ করা এবং ইন্সট্যান্সের যথার্থতা পরীক্ষা করার ফিচার রয়েছে এখানে।</p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em\" align=\"left\">বিভিন্ন ডাটা স্ট্রাকচার এবং অ্যালগোরিদম ক্লাস নিয়ে, যদিও বিশেষভাবে  NUS ছাত্র-ছাত্রীদের  জন্য পরিকল্পনা করা হয়েছে (যেমনঃ" +
    "<a href=\"http://nusmods.com/modules/CS1010\" target=\"_blank\">CS1010</a>, " +
    "<a href=\"http://nusmods.com/modules/CS1020\" target=\"_blank\">CS1020</a>, " +
    "<a href=\"http://nusmods.com/modules/CS2010\" target=\"_blank\">CS2010</a>, " +
    "<a href=\"http://nusmods.com/modules/CS2020\" target=\"_blank\">CS2020</a>, " +
    "<a href=\"http://nusmods.com/modules/CS3230\" target=\"_blank\">CS3230</a>, and " +
    "<a href=\"http://nusmods.com/modules/CS3233\" target=\"_blank\">CS3233</a>), অনলাইনে শিক্ষার সমর্থক হিসাবে, আমরা আশা করি সারা বিশ্বের উৎসাহী মানুষ এই ভিজ্যুয়ালাইজেশনগুলোর মাধ্যমে অনেক উপকৃত হবেন।<br><br></p>");
     
    $("#developments").html("<h2>চলমান উন্নয়ন</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">VisuAlgo একটি চলমান প্রোজেক্ট এবং আরো জটিল ভিজ্যুয়ালাইজেশন এখনও ডেভেলপ করা হচ্ছে।" +
    "এই ভিজ্যুয়ালাইজেশনগুলো পরবর্তীতে আমাদের দলের মাধ্যমে ডেভেলপ করা হবেঃ হ্যাশ টেবিল (বিভিন্ন হ্যাশিং প্রক্রিয়া ব্যাবহার করে), জ্যাক এডমন্ড এর গ্রাফ ম্যাচিং অ্যালগোরিদম, ডিরেক্টেড এমএসটি এর জন্য চু-লুই এর অ্যালগোরিদম, ইত্যাদি।<br></p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">যাই হোক, সবচেয়ে আনন্দদায়ক ডেভেলপমেন্ট হলো স্বয়ংক্রিয় প্রশ্ন তৈরিকারক এবং নিরীক্ষক (অনলাইন কুইজ প্রক্রিয়া )" +
    "যা ছাত্র-ছাত্রীদেরকে বেসিক ডাটা স্ট্রাকচার এবং অ্যালগোরিদম এর উপর তাদের জ্ঞান যাচাই করতে সাহায্য করবে।" +
    "প্রশ্নগুলো কিছু নিয়মের মাধ্যমে <b>র‍্যান্ডমলি তৈরি</b>এবং ছাত্র-ছত্রীদের  উত্তরগুলো<b>সাথেসাথে এবং স্বয়ংক্রিয়ভাবে গ্রেডিং করা হবে </b> আমাদের গ্রেডিং সার্ভার এ জমা দেয়ার পর ।" +
    "<b>এই অনলাইন কুইজ প্রক্রিয়া  যখন সম্পন্ন হবে, বিভিন্ন বিশ্ববিদ্যালয়ের  বিভিন্ন কম্পিউটার  সাইন্স  পরীক্ষার বেসিক ডাটা স্ট্রাকচার এবং অ্যালগোরিদম প্রশ্ন  যাচাই  করতে পারবে ।</b>" +
    "অনলাইন কুইজ এর সামান্য  (কিন্তু  অশূন্য) গুরুত্ব  দ্বারা, একজন সিএস প্রশিক্ষক  (উল্লেখযোগ্যভাবে - ডঃ স্টিভেন হালিম এর  এই সেমিস্টারে অ্যালগোরিদম ক্লাসে এটি  পরীক্ষা করার পর প্রমানিত হবে)" +
    " এই সাধারন প্রশ্নগুলোর উপর তার ছাত্র-ছাত্রীদের আধিপত্য বাড়াতে পারবেন ,যেহেতু ছাত্র-ছত্রীরা ভারচুয়ালী অসংখ্য প্রশিক্ষণ প্রশ্ন পাবেন যা তারা  অনলাইন কুইজ এ  অংশগ্রহণ করার পূর্বেই সাথেসাথে যাচাই করতে পারবেন।" +
    "এই আনন্দদায়ক অনলাইন কুইজ ফিচারটি দেখতে,এই পেজ এর উপরে ডান কোনায়  'প্রশিক্ষন শুরু!' বাটন এ ক্লিক করুন।<br><br></p>");
 
    $("#bug").html("<h2>ত্রুটি সম্পর্কে জানাতে অথবা নতুন ফিচার এর জন্য অনুরোধ করুন</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">VisuAlgo প্রোজেক্ট এর কাজ এখনও শেষ হয়নি। ডঃ স্টিভেন হালিম এবং তার দল VisuAlgo কে ডেভেলপ করার জন্য সক্রিয়ভাবে কাজ করে যাচ্ছেন । " +
    "আপনি যদি আমাদের VisuAlgo পাতায়/ অনলাইন কুইজ টুল এ কোন ত্রুটি খুঁজে পান অথবা নতুন কোন ফিচার এর জন্য অনুরোধ করতে চান  তাহলে দয়া করে ডঃ স্টিভেন হালিম এর সাথে যোগাযোগ করুন।" +
    "তার সাথে যোগাযোগের জন্যঃ stevenhalim@gmail.com<br></p><br>");
 
    $("#publications").html("<h2>প্রকাশনাসমুহ </h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">এই কাজটি  এসিএম  আইসিপিসি ২০১২ (পোল্যান্ড ,ওয়ারসাও) এর  সিএলআই ওয়ার্কশপ এ পুরনাঙ্গভাবে উপস্থাপন করা হয়েছে।" +
    "এবং আইওআই  ২০১২ তে আইওআই কনফারেন্স এও (সিরমিওন-মন্টিচিয়ারি, ইতালি). " +
    "এই লিঙ্কে <a href=\"http://www.ioinformatics.org/oi/shtm/INFOL099.shtml\" target=\"_blank\">ক্লিক করুন </a> এই ব্যাবস্থা সম্পর্কে আমাদের ২০১২ সালের  পেপার  পড়তে (২০১২ সালে এটিকে VisuAlgo বলা হয়নি).<br><br></p>");
  }
  else if (language == 'ja') { // Japanese: ja-jp, Contributors: Seiichi Tani
    $("#training-link").html("トレーニングを開始!");
    $("#test-link").html("進行中のテストに参加");
    $("#ans-link").html("最後のテストへの回答");

    searchtext = "検索...";

    sorting = new Array("sorting", "ソート", "バブル", "選択", "挿入", "マージ", "クイック", "乱拓クイック", "選択", "挿入", "数え上げ", "基数", "ソート", "cs2020", "cs1020", "cs1010", "cs3230", "配列", "リスト", "データ構造", "ソーティング");
    bitmask = new Array("bitmask", "ビットマスク", "ビット操作", "ブール演算", "配列", "小さい集合", "cs3233", "cs2020", "cs2010", "リスト", "データ構造", "ビットマスク");
    linked = new Array("linked", "連結リスト", "スタック", "キュー", "単方向", "双方向", "両端キュー", "連結", "リスト", "cs2020", "cs1020", "array", "データ構造");
    hashtable = new Array("hashtable", "open addressing", "separate chaining", "linear", "quadratic", "double hashing", "cs2020", "cs1020", "array", "data structure", "hash", "table"); // not translated yet
    heap = new Array("heap", "ヒープ", "優先度付きキュー", "ヒープソート", "再帰的", "cs2020", "cs2010", "再帰", "データ構造", "木", "二分ヒープ");
    bst = new Array("bst", "テーブル", "set", "map", "BST", "Adelson-Velskii Landis", "cs2020", "cs2010", "cs3230", "再帰", "再帰的", "データ構造", "二分探索木", "AVL"); 
    graphs = new Array("graphs", "グラフ", "木", "完全", "二部", "DAG", "隣接行列", "隣接リスト", "辺リスト", "cs2010", "cs2020", "グラフ");
    union = new Array("union", "UFDS", "木", "圧縮", "ランク", "パス圧縮", "ランクによる併合", "cs3233", "cs2020", "cs2010", "配列", "set", "再帰", "再帰的", "データ構造", "Union-Find 素集合");
    segment = new Array("segmenttree", "セグメント木", "レンジ", "Min/Max/Sum", "遅延アップデート", "再帰的", "cs3233", "再帰", "データ構造", "セグメント木");
    bit = new Array("bit", "Fenwick", "レンジ", "BIT", "レンジ/ポイント クエリ/アップデート", "cs3233", "再帰", "再帰的", "データ構造", "バイナリインデックス付き木");
    recursion = new Array("recursion", "再帰", "動的計画法", "木", "DAG", "cs1010", "cs1020", "cs2010", "cs2020", "cs3230", "cs3233", "再帰的", "再帰");
    traversal = new Array("traversal", "トラバーサル", "DFS", "BFS", "トポロジカルソート", "SCC", "2-SAT", "トポロジカルソート", "強連結成分", "二部グラフチェック", "cs2010", "cs2020", "cs3230", "アルゴリズム", "グラフ", "トラバーサル", "タージャン", "Kosaraju", "Kahn");
    mst = new Array("mst", "MST", "プリム", "クルスカル", "アルゴリズム", "cs2020", "cs2010", "最小", "全域", "木", "グラフ");
    sssp = new Array("sssp", "SSSP", "BFS", "ベルマン-フォード", "ダイクストラ", "cs2010", "cs2020", "単一始点最短経路", "グラフ", "アルゴリズム");
    maxflow = new Array("maxflow", "最大流", "最小カット", "エドモンズ-カープ", "ディニック", "フォード-ファウカーソン", "グラフ", "cs2020", "cs3233", "アルゴリズム");
    matching = new Array("matching", "マッチング", "増加道", "ホップクロフト-カープ", "エドモンズ", "cs3233", "マッチング", "グラフ", "アルゴリズム")
    suffixtree = new Array("suffixtree", "接尾辞木", "マッチング", "繰り返し", "共通", "文字列", "cs3233", "木", "接尾辞", "データ構造", "接尾辞木");
    suffixarray = new Array("suffixarray", "接尾辞配列", "整列", "LCP", "文字列", "整列", "マッチング", "繰り返し", "共通", "接尾辞配列", "cs3233", "配列", "接尾辞", "データ構造");
    geometry = new Array("geometry", "幾何", "多角形", "周", "凸", "巻き数", "多角形内", "多角形切断", "凹", "凸包", "グラハムスキャン", "cs3233", "計算幾何");

    $("#subtitle").html("アニメーションを介してデータ構造とアルゴリズムを可視化する (Japanese)");
    $("#sortingtext").html("ソート");
    $("#bitmasktext").html("ビットマスク");
    $("#linkedtext").html("連結リスト, スタック, キュー、 デック");
    $("#bsttext").html("二分探索木, AVL木");
    $("#heaptext").html("二分ヒープ");
    $("#graphstext").html("グラフデータ構造");
    $("#uniontext").html("Union-Find 素集合");
    $("#segmenttreetext").html("セグメント木");
    $("#bittext").html("バイナリインデックス付き木");
    $("#recursiontext").html("一般的再帰木/DAG");

    $("#traversaltext").html("グラフトラバーサル");
    $("#msttext").html("最小全域木");
    $("#sssptext").html("単一始点最短経路");
    $("#maxflowtext").html("最大流");
    $("#matchingtext").html("マッチング");
    $("#suffixtreetext").html("接尾辞木");
    $("#suffixarraytext").html("接尾辞配列");
    $("#geometrytext").html("計算幾何");

    $("#abouttext").html("About VisuAlgo");

    $("#motivation").html("<h2>動機</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">VisuAlgo は, 学生が自分のペースで自習することでデータ構造とアルゴリズムをより理解できるためのツールとして 2011 年に Steven Halim により構想されました. " +
    "VisuAlgo は 24 時間いつでも教えてくれる Halim 博士のクローンのようなものです. " +
    "Halim 博士は何人かの National University of Singapore の学生 ('Team' を参照) と協力して, 様々なアルゴリズムの可視化を開発してきまいた. " +
    "それは, 簡単なソートアルゴリズムから始まり, 複雑なデータ構造やアルゴリズムへと, そして, 文字列アルゴリズムや幾何アルゴリズムへと広がりました.<br></p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em\" align=\"left\">VisuAlgo は Steven Halim 博士の本で扱っているアルゴリズムやそれ以外の<b>多くの高度なアルゴリズム</b>を含んでいます." +
    "(注意: この <a href=\"http://sites.google.com/site/stevenhalim/\">'Competitive Programming 3'</a> という本は, Halim 博士の兄弟である Felix Halim との共著です.) " +
    "現時点では, これらの高度なアルゴリズムの中には, それらに対する可視化/アニメーションが VisuAlgo <b>だけ</b>で用意されているものがあります. " +
    "例えば, <a href=\"dfsbfs.html\">グラフトラバーサル可視化</a>では, 標準的な深さ優先探索 (DFS) アルゴリズムや幅優先探索 (BFS) アルゴリズムだけでなく, それらのバリエーションも取り扱っています. " +
    "例えば, DFS の変形として Articulation Points (Cut Vertex) やブリッジを発見するアルゴリズムや, 有向グラフの強連結成分 (Strongly Connected Components, SCCs) を発見する Tarjan や Kosaraju の DFS 風のアルゴリズムも扱っています. " +
    "そればかりか, 2-SAT(isfiablity) のサイズの小さい入力に対して,  implication graph を可視化し, 充足可能 (satisfiable) かどうかの判定を扱っています.</p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em\" align=\"left\">特に NUS の様々なデータ構造やアルゴリズムの講義 (例えば,  " +
    "<a href=\"http://nusmods.com/modules/CS1010\" target=\"_blank\">CS1010</a>, " +
    "<a href=\"http://nusmods.com/modules/CS1020\" target=\"_blank\">CS1020</a>, " +
    "<a href=\"http://nusmods.com/modules/CS2010\" target=\"_blank\">CS2010</a>, " +
    "<a href=\"http://nusmods.com/modules/CS2020\" target=\"_blank\">CS2020</a>, " +
    "<a href=\"http://nusmods.com/modules/CS3230\" target=\"_blank\">CS3230</a>, and " +
    "<a href=\"http://nusmods.com/modules/CS3233\" target=\"_blank\">CS3233</a>), を履修している学生を対象に設計されていますが, オンライン学習の推進者として, 世界中の興味のある人にも有用だと思ってもらえると幸いです.<br><br></p>");

    $("#developments").html("<h2>進行中の開発</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">VisuAlgo は進行中のプロジェクトで, より複雑な可視化の開発が今も進められています. " + 
    "開発チームが開発を予定している可視化は, (種々のハッシュ化手法を用いた) ハッシュテーブル, Jack Edmonds のグラムマッチングアルゴリズム, Chu-Liu Edmonds の有向 MST アルゴリズムなどです.<br></p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">しかしながら, もっともワクワクさせられる開発課題は問題自動生成と自動評価 (オンライン問題システム) です. " +
    "これにより, 学生が基礎的なデータ構造とアルゴリズムに関する知識を自分で確かめられるようになります. " +
    "問題はある規則に基づき<b>ランダムに生成</b>され, 学生の解答が評価サーバに提出されると, <b>即座に, そして, 自動的に</b>評価されます. " +
    "このオンライン問題システムが今後成熟していくと, 多くの大学における典型的なコンピュータサイエンスの試験から, 基礎的なデータ構造とアルゴリズムに関するこれまでのような<b>マニュアルの</b>問題は消えてしまうに違いありません. " +
    "学生はオンライン問題システムを使うことで即座に評価される実質的に無数の練習問題に取り組めることになるので, オンライン問題に合格することに (ゼロはない) 小さな重みを設定することで, コンピュータサイエンスの教員は学生の基礎的なデータ構造やアルゴリズムの理解を向上させることができます.  " +
    "(その向上が著しいかどうかは, Steven Halim 博士が今セメスターのアルゴリズムの講義で行っている実験終了後に判明するでしょう.) " +
    "このワクワクするオンライン問題に挑戦したい方は, このページの右上の 'トレーニングを開始!' ボタンをクリックしてください.<br><br></p>");

    $("#bug").html("<h2>バグレポートや新項目のリクエスト</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">VisuAlgo は完了したプロジェクトではありません. Steven Halim 博士と彼のチームは引き続き VisuAlgo の改善に取り組んでいます. " +
    "可視化ページやオンライン問題ツールを使って, もし, バグに気づいたり, 新しい項目や機能についてリクエストが生じたりすれば, Steven Halim 博士に連絡してください. " +
    "彼の連絡先は, 彼の名前をつなげてそれにアットマークと gmail.com を加えたものです.<br></p><br>");

    $("#publications").html("<h2>発表</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">この成果は ACM ICPC World Finals 2012 (Poland, Warsaw) の CLI Workshop と," +
    "IOI 2012 (Sirmione-Montichiari, Italy) の IOI Conference で発表されています. " +
    "You can click <a href=\"http://www.ioinformatics.org/oi/shtm/INFOL099.shtml\" target=\"_blank\">this link</a> to read our 2012 paper about this system (it was not yet called VisuAlgo back in 2012).<br><br></p>");
  }
  else if (language == 'de') { // German: de, Contributors: Lukas Fritzsche, Wolfgang Pohl
    sorting = new Array("sorting", "bubble", "select", "insert", "merge", "quick", "randomized quick", "selection", "insertion", "counting", "radix", "sort", "cs2020", "cs1020", "cs1010", "cs3230", "Reihung", "Liste", "Datenstruktur", "Algorithmus", "sorting");
    bitmask = new Array("bitmask", "Bitmanipulation", "Boolean", "Reihung", "small set", "cs3233", "cs2020", "cs2010", "Liste", "Datenstruktur", "Bitmaske");
    linked = new Array("linked", "Stapelspeicher", "Warteschlange", "einfach", "doppelt", "deque", "cs2020", "cs1020", "Reihung", "Datenstruktur", "verkettet", "Liste");
    hashtable = new Array("hashtable", "open addressing", "separate chaining", "linear", "quadratic", "double hashing", "cs2020", "cs1020", "array", "data structure", "hash", "table"); // not translated yet
    heap = new Array("heap", "Vorrangwarteschlange", "Heapsort", "rekursiv", "cs2020", "cs2010", "Rekursion", "Datenstruktur", "Baum", "Binärer Heap");
    bst = new Array("bst", "Tabelle", "Menge", "map", "BST", "Adelson-Velskii Landis", "cs2020", "cs2010", "cs3230", "Rekursion", "rekursiv", "Datenstruktur", "AVL", "Binärersuchbaum");
    graphs = new Array("graphs", "Baum", "vollständig", "bipartit", "DAG", "Adjazenzmatrix", "Adjazenzliste", "Kantenliste", "cs2010", "cs2020", "Datenstruktur", "Graphen");
    union = new Array("union", "UFDS", "Baum", "komprimieren", "rank", "Pfadkompression", "union by rank", "cs3233", "cs2020", "cs2010", "Reihung", "Menge", "Rekursion", "rekursiv", "Datenstruktur", "Union-Find Disjoint Sets");
    segment = new Array("segmenttree", "Bereich", "Min/Max/Sum", "lazy update", "rekursiv", "cs3233", "Rekursion", "data structure", "Segment Tree");
    bit = new Array("bit", "Fenwick", "Bereich", "BIT", "Range/Point Query/Update", "cs3233", "Rekursion", "rekursiv", "Datenstruktur", "Binary Indexed Tree");
    recursion = new Array("recursion", "Dynamisches Programmieren", "Baum", "DAG", "cs1010", "cs1020", "cs2010", "cs2020", "cs3230", "cs3233", "rekursiv", "Rekursion");
    traversal = new Array("traversal", "DFS", "BFS", "toposort", "SCC", "2-SAT", "topologisches Sortieren", "Starke Zusammenhangskomponente", "bipartite check", "cs2010", "cs2020", "cs3230", "Algorithmus", "Tarjan", "Kosaraju", "Kahn", "Graph", "Traversierung");
    mst = new Array("mst", "MST", "Prim", "Kruskal", "Algorithmus", "cs2020", "cs2010", "Graphen", "minimal", "spannender", "Baum");
    sssp = new Array("sssp", "SSSP", "Bellman Ford", "Dijkstra", "BFS", "cs2010", "cs2020", "graphs", "algorithm", "Single-Source Shortest Paths");
    maxflow = new Array("maxflow", "maximaler Fluss", "minimaler Schnitt", "Edmonds Karp", "Dinic", "Ford Fulkerson", "Graphen", "cs2020", "cs3233", "Algorithmus", "Netzwerkfluss");
    matching = new Array("matching", "augmenting path", "Hopcroft Karp", "Edmonds", "cs3233", "Graphen", "Algorithmen", "Matching")
    suffixtree = new Array("suffixtree", "Matching", "wiederholt", "häufig", "String", "cs3233", "tree", "suffix", "Datenstruktur", "Suffixbaum");
    suffixarray = new Array("suffixarray", "Sortieren", "common prefix", "String", "LCP", "Matching", "Sortieren", "wiederholt", "häufig", "cs3233", "Datenstruktur", "Suffix", "Reihung", "Suffixreihung");
    geometry = new Array("geometry", "Polygon", "winding number", "inPolygon", "Schnitt-Polygon", "Umfang", "konvex", "konkav", "konvexe Hülle", "Graham Scan", "cs3233", "Algorithmus", "algorithmische Geometrie");
  }
  else if (language == 'ko') { // Korean: ko, ko-kr, Contributors: Gyun Woo, Moon Seokmin
    $("#training-link").html("연습 시작!");
    $("#test-link").html("진행중인 테스트");
    $("#ans-link").html("이전 테스트 정답");

    searchtext = "검색...";

    sorting = new Array("sorting", "정렬", "거품", "선택", "삽입", "병합", "퀵", "퀵(무작위 피봇 선택)", "선택", "삽입", "계수", "자릿수", "정렬", "cs2020", "cs1020", "cs1010", "cs3230", "배열", "리스트", "자료구조", "정렬");
    bitmask = new Array("bitmask", "비트매스크", "비트 다루기", "Boolean", "배열", "작은 집합", "cs3233", "cs2020", "cs2010", "리스트", "자료구조", "비트매스크");
    linked = new Array("linked", "연결", "스택", "큐", "단방향", "양방향", "deque", "연결", "리스트", "cs2020", "cs1020", "배열", "자료구조");
    hashtable = new Array("hashtable", "open addressing", "separate chaining", "linear", "quadratic", "double hashing", "cs2020", "cs1020", "array", "data structure", "hash", "table"); // not translated yet
    heap = new Array("heap", "힙", "우선순위 큐", "힙 정렬", "재귀적", "cs2020", "cs2010", "재귀호출", "자료구조", "트리", "이진 힙");
    bst = new Array("bst", "테이블", "집합", "맵", "BST", "Adelson-Velskii Landis", "cs2020", "cs2010", "cs3230", "재귀호출", "재귀적", "자료구조", "이진 탐색 트리", "AVL");
    graphs = new Array("graphs", "그래프", "트리", "완전", "이분", "DAG", "인접 행렬", "인접 리스트", "간선 리스트", "cs2010", "cs2020", "그래프");
    union = new Array("union", "합집합", "UFDS", "트리", "압축", "랭크", "경로 압축", "랭크를 이용한 합집합", "cs3233", "cs2020", "cs2010", "배열", "집합", "재귀호출", "재귀적", "자료구조", "Union Find Disjoint Sets");
    segment = new Array("segmenttree", "범위", "Min/Max/Sum", "지연 갱신", "재귀적", "cs3233", "재귀호출", "자료구조", "세그먼트 트리");
    bit = new Array("bit", "비트", "Fenwick", "범위", "BIT", "Range/Point Query/Update", "cs3233", "재귀호출", "재귀적", "자료구조", "이진 색인 트리");
    recursion = new Array("recursion", "재귀호출", "동적 프로그래밍", "트리", "DAG", "cs1010", "cs1020", "cs2010", "cs2020", "cs3230", "cs3233", "재귀적", "재귀호출");
    traversal = new Array("traversal", "순회", "DFS", "BFS", "toposort", "SCC", "2-SAT", "위상정렬", "강연결성분", "이분 검사", "cs2010", "cs2020", "cs3230", "알고리즘", "그래프", "순회", "Tarjan", "Kosaraju", "Kahn");
    mst = new Array("mst", "MST", "프림(Prim)", "크루스칼(Kruskal)", "알고리즘", "cs2020", "cs2010", "min", "신장", "트리", "그래프");
    sssp = new Array("sssp", "SSSP", "BFS", "벨만포드(Bellman Ford)", "댁스트라(Dijkstra)", "cs2010", "cs2020", "한 점에서 시작되는 최단경로", "그래프", "알고리즘");
    maxflow = new Array("maxflow", "max flow", "min cut", "Edmonds Karp", "Dinic", "Ford Fulkerson", "그래프", "cs2020", "cs3233", "알고리즘");
    matching = new Array("matching", "매칭", "augmenting path", "Hopcroft Karp", "Edmonds", "cs3233", "매칭", "그래프", "알고리즘")
    suffixtree = new Array("suffixtree", "매칭", "반복된", "공통의", "문자열", "cs3233", "트리", "접미사", "자료구조", "접미사 트리");
    suffixarray = new Array("suffixarray", "정렬", "LCP", "string", "정렬", "매칭", "반복된", "공통의", "접미사 배열", "cs3233", "배열", "접미사", "자료구조");
    geometry = new Array("geometry", "기하", "다각형", "둘레", "볼록", "winding number", "inPolygon", "cut polygon", "오목", "convex hull", "Graham 스캔", "cs3233", "계산기하학");

    $("#subtitle").html("영상을 통한 자료구조와 알고리즘의 시각화 (한국어판) (Korean)");
    $("#sortingtext").html("정렬");
    $("#bitmasktext").html("비트매스크");
    $("#linkedtext").html("연결");
    $("#bsttext").html("재귀호출");
    $("#heaptext").html("힙");
    $("#graphstext").html("그래프");
    $("#uniontext").html("Union-Find Disjoint Sets");
    $("#segmenttreetext").html("Segment Tree");
    $("#bittext").html("비트");
    $("#recursiontext").html("재귀호출");

    $("#traversaltext").html("순회");
    $("#msttext").html("신장트리");
    $("#sssptext").html("한 점에서 시작되는 최단경로");
    $("#maxflowtext").html("Network Flow");
    $("#matchingtext").html("매칭");
    $("#suffixtreetext").html("접미사 트리");
    $("#suffixarraytext").html("접미사 배열");
    $("#geometrytext").html("계산기하학");

    $("#abouttext").html("VisuAlgo에 대하여");

    $("#motivation").html("<h2>동기</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">" +
    "VisuAlgo는2011년에 Steven Halim 박사에 의해 고안된 도구로써, 자료구조와 알고리즘의 기본을 스스로 배울 수 있게 해주어 학생들의 이해를 돕기 위해 만들어진 Steven 박사의 분신과도 같습니다." +
    "싱가폴 국립 대학교의 학생들(Team 참조)과 함께 간단한 정렬 알고리즘부터 복잡한 그래프 구조와 알고리즘, 그리고 문자열과 기하 알고리즘까지 일련의 시각화를 개발하였습니다.<br></p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em\" align=\"left\">" +
    "VisuAlgo는Steven Halim 박사의 책(박사의 동생인 Felix Halim과 공저한 'Competitive Programming 3')등에서의 다양한 고급 알고리즘이 들어으며, 이들중 일부 고급 알고리즘의 시각화는 현재 오로지 VisuAlgo를 통해서만 만나실 수 있습니다." +
    "예를들어, 그래프 순회 알고리즘의 경우 일반적인 깊이우선 탐색(DFS)와 너비우선 탐색(BFS)뿐만 아니라 그 변형 또한 다루고 있습니다." +
    "(e.g  DFS를 변형하여 분할 정점(articulation point; Cut Vertex)이나 브릿지를 찾는 알고리즘, 방향 그래프에서 강연결성분(SCC)을 찾기 위한 Tarjan 알고리즘, Kosaraju 알고리즘, 간단한 2-SAT 추론 그래프를 통해 논리식이 만족될 수 있는지 검사하는 과정 등등<br><br></p>" +
    "<p style=\"margin-left:5em; margin-right:5em\" align=\"left\">" +
    "VisuAlgo는 싱가폴 국립 대학교의 자료구조와 알고리즘 과목들(e.g. " +
    "<a href=\"http://nusmods.com/modules/CS1010\" target=\"_blank\">CS1010</a>, " +
    "<a href=\"http://nusmods.com/modules/CS1020\" target=\"_blank\">CS1020</a>, " +
    "<a href=\"http://nusmods.com/modules/CS2010\" target=\"_blank\">CS2010</a>, " +
    "<a href=\"http://nusmods.com/modules/CS2020\" target=\"_blank\">CS2020</a>, " +
    "<a href=\"http://nusmods.com/modules/CS3230\" target=\"_blank\">CS3230</a>, " +
    "<a href=\"http://nusmods.com/modules/CS3233\" target=\"_blank\">CS3233</a> 등))의 학생들을 위해 개발되었으나, 온라인 교육의 지지자로서 저희는 VisuAlgo가 전세계의 지식의 탐구자들에게 도움이 되길 바랍니다.<br><br></p>");

    $("#developments").html("<h2>개발 현황</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">" +
    "VisuAlgo는 현재진행중인 프로젝트로, 더 복잡한 시각화의 개발을 하고 있습니다. " + 
    "현재 작업중인 시각화는 다음과 같습니다: 해시테이블 (여러가지 테크닉을 활용할 예정), 잭 에드몬드의 그래프 매칭 알고리즘, 류추 에드몬드의 Directed MST 알로리즘 등등.<br></p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">하지만 가장 기대되는 개발은 문제 생성기와 검정기(온라인 퀴즈 시스템) 로, 학생들이 기본적인 자료구조와 알고리즘을스스로 테스트 할 수 있게 해주는 시스템입니다. " +
    "짜여진 규칙들을 통해 문제들이 <b>무작위</b>로 생성되며, 학생들의 답변은 <b>답변 제출 즉시 체점</b>되게 됩니다.  " +
    "온라인 퀴즈 시스템이 활성화 되면 많은 대학교에서 쓰이는 일반적인 자료구조와 알고리즘 문제들이 사실상 필요 없게 됩니다. " +
    "사실상 무한한 연습 문제가 있기 때문에, 컴퓨터 공학 강사가 온라인 퀴즈에 약간의 점수를 배점하는것만으로 기본적인 문제들에 대한 학생들의 숙련도를 향상시킬 수 있습니다. " +
    "(Steven Halim 박사가 이번 학기 학생들을 통해 효과를 확인해 보고 있는중) " +
    "온라인 퀴즈는 사이트 우측 상단의 \"연습 시작!\" 버튼을 눌러 해보실 수 있습니다.<br><br></p>");

    $("#bug").html("<h2>버그 리포트와 새로운 기능 건의</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">VisuAlgo 프로젝트는 아직 끝나지 않았습니다. Steven Halim박사와 팀원들이 현재도 계속해서 VisuAlgo를 향상시키고 있습니다. " +
    "혹시나 시각화나 온라인 퀴즈에서 버그를 발견하시거나 새로운 기능을 건의하고 싶으시다면 Steven Halim 박사에게 문의하시기 바랍니다. " +
    "Steven Halim박사의 이메일은 stevenhalim@gmail.com입니다.<br></p><br>");

    $("#publications").html("<h2>공개</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">VisuAlgo는 폴란드 뱌르샤바에서 열린 ACM ICPC World Finals 2012의 CLI 워크샵과 " +
    "이탈리아의 Sirmione-Montichiari에서 열린 IOI Conference at IOI 2012에서 간략하게  공개되었습니다. " +
    "<b><a href=\"http://www.ioinformatics.org/oi/shtm/INFOL099.shtml\" target=\"_blank\">링크</a></b>를 통해 이 시스템에 대해 2012년에 발표된 내용을 확인하실 수 있습니다.(당시는 VisuAlgo라고 불리지 않았음).<br><br></p>");
  }
  else if (language == 'vi') { // Vietnamese: vi, vi-vn, Contributors: Le Xuan Manh
    $("#training-link").html("Bắt đầu luyện tập!");
    $("#test-link").html("Tham gia thử nghiệm");
    $("#ans-link").html("Trả lời câu hỏi cuối cùng");

    searchtext = "Tìm kiếm...";

    sorting = new Array("sorting", "Nổi bọt", "Lựa chọn", "Chèn", "Sắp xếp trộn", "Sắp xếp nhanh", "Sắp xếp ngẫu nhiên nhanh", "Lựa chọn", "Chèn", "Đếm phân phối", "Sắp xếp theo cơ số", "Sắp xếp", "cs2020", "cs1020", "cs1010", "cs3230", "Mảng", "Danh sách", "Cấu trúc dữ liệu", "Sắp xếp");
    bitmask = new Array("bitmask", "Thao tác bit", "Boolean", "Mảng", "Tập hợp nhỏ", "cs3233", "cs2020", "cs2010", "Danh sách", "Cấu trúc dữ liệu", "bitmask");
    linked = new Array("linked", "Ngăn xếp (Stack)", "Hàng đợi (Queue)", "Móc nối", "Một chiều", "Hai chiều", "Hai chiều", "Móc nối (Linked)", "Danh sách (List)", "cs2020", "cs1020", "Mảng", "Cấu trúc dữ liệu");
    hashtable = new Array("hashtable", "open addressing", "separate chaining", "linear", "quadratic", "double hashing", "cs2020", "cs1020", "array", "data structure", "hash", "table"); // not translated yet
    heap = new Array("heap", "Hàng đợi ưu tiên", "Heap sort", "Đệ quy", "cs2020", "cs2010", "Đệ quy", "Cấu trúc dữ liệu", "Cây", "Heap nhị phân");
    bst = new Array("bst", "table", "set", "map", "BST", "Adelson-Velskii Landis", "cs2020", "cs2010", "cs3230", "đệ quy", "đệ quy", "Cấu trúc dữ liệu", "Cây tìm kiếm nhị phân", "Cây cân bằng AVL"); 
    graphs = new Array("graphs", "Cây", "Đầy đủ", "Hai phía", "DAG", "Ma trận kề", "Đồ thị", "Danh sách kề", "Danh sách cạnh", "cs2010", "cs2020", "Đồ thị");
    union = new Array("union", "Union-Find Disjoint Sets", "Hợp nhất", "UFDS", "Cây", "Nén", "Bậc", "Nén đường", "Hợp nhất theo bậc", "cs3233", "cs2020", "cs2010", "Mảng", "Tập hợp", "Đệ quy", "Đệ quy", "Cấu trúc dữ liệu", "Tìm kiếm – Hợp nhất các tập rời rạc");
    segment = new Array("segmenttree", "Min/Max/Sum", "lazy update", "Cây phân đoạn (IT)", "Phân đoạn", "Đệ quy", "cs3233", "Đệ quy", "Cấu trúc dữ liệu", "Cây phân đoạn");
    bit = new Array("bit", "Binary Indexed Tree", "BIT", "Xếp loai (range)", "Xếp loại (range)/Truy vấn điểm (Point Query)/Cập nhật (update)", "cs3233", "Đệ quy", "Đệ quy", "Cấu trúc dữ liệu", "Cây chỉ số nhị phân (BIT)");
 
    recursion = new Array("recursion", "Đệ quy", "Dynamic Programming", "Cây", "DAG", "cs1010", "cs1020", "cs2010", "cs2020", "cs3230", "cs3233", "Đệ quy", "Đệ quy");
 
    traversal = new Array("traversal", "DFS", "BFS", "Toposort", "SCC", "Đường đi", "2-SAT", "Sắp xếp topo", "Thành phần liên thông mạnh", "bipartite check", "cs2010", "cs2020", "cs3230", "Thuật toán", "Đồ thị", "Đường đi", "Tarjan", "Kosaraju", "Kahn");
    mst = new Array("mst", "MST", "Prim", "Kruskal", "Thuật toán", "cs2020", "cs2010", "nhỏ nhất", "Cây khung", "Cây", "Đồ thị");
    sssp = new Array("sssp", "SSSP", "Bellman Ford", "Dijkstra", "BFS", "cs2010", "cs2020", "Đường đi đơn ngắn nhất", "Đồ thị", "Thuật toán");
    maxflow = new Array("maxflow", "Edmonds Karp", "Dinic", "Ford Fulkerson", "Luồng cực đại", "Lát cắt nhỏ nhất (Min cut)", "Đồ thị", "cs2020", "cs3233", "Thuật toán");
    matching = new Array("matching", "Đường tăng", "Hopcroft Karp", "Edmonds", "Cặp ghép", "cs3233", "Cặp ghép", "Đồ thị", "thuật toán");
 
    suffixtree = new Array("suffixtree", "Cây hậu tố (Suffix-tree)", "Cặp ghép", "Lặp lại (repeated)", "Phổ biến (common)", "Chuỗi", "cs3233", "Cây", "Hậu tố", "Cấu trúc dữ liệu", "Cây hậu tố (Suffix-tree)");
    suffixarray = new Array("suffixarray", "Mảng hậu tố (Suffix-array)", "sắp xếp", "LCP", "Xâu", "Sắp xếp", "Ghép cặp", "Lặp lại (repeated)", "Phổ biến (common)", "Mảng hậu tố (Suffix-array)", "cs3233", "Mảng", "Hậu tố", "Cấu trúc dữ liệu");
 
    geometry = new Array("geometry", "Hình học", "Đa giác", "Chu vi", "Lồi", "winding number", "Trong đa giác", "Cắt đa giác", "Lõm", "Bao lồi", "Quét Graham", "cs3233", "Hình học tính toán");
 
    $("#subtitle").html("Hình dung cấu trúc dữ liệu và thuật toán thông qua hình ảnh trực quan (Vietnamese)");
    $("#sortingtext").html("Sắp xếp (Sorting)");
    $("#bitmasktext").html("Bitmask");
    $("#linkedtext").html("Danh sách liên kết (Linked-list)");
    $("#bsttext").html("Cây tìm kiếm nhị phân, AVL Tree");
    $("#heaptext").html("Heap nhị phân");
    $("#graphstext").html("Cấu trúc dữ liệu đồ thị");
    $("#uniontext").html("Tìm kiếm - Hợp nhất các tập rời rạc");
    $("#segmenttreetext").html("Cây phân đoạn (Interval Tree)");
    $("#bittext").html("Cây chỉ số nhị phân (Fenwick Tree)");
    $("#recursiontext").html("Generic Recursion Tree/DAG");
 
    $("#traversaltext").html("Đường đi trên đồ thị");
    $("#msttext").html("Cây khung nhỏ nhất");
    $("#sssptext").html("Đường đi đơn ngắn nhất");
    $("#maxflowtext").html("Luồng trên mạng");
    $("#matchingtext").html("Cặp ghép trên đồ thị");
    $("#suffixtreetext").html("Cây hậu tố (Suffix-tree)");
    $("#suffixarraytext").html("Mảng hậu tố (Suffix-array)");
    $("#geometrytext").html("(Tính toán) Hình học");
 
    $("#abouttext").html("Giới thiệu VisuAlgo");

    $("#motivation").html("<h2>Nguồn gốc</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">VisuAlgo được thiết kế vào năm 2011 bởi Dr Steven Halim như một công cụ để giúp học sinh hiểu rõ hơn về cấu trúc dữ liệu và giải thuật, " +
    "bằng cách cho phép họ tìm hiểu từ mức cơ bản theo cách và tốc độ của riêng mình. VisuAlgo giống như một bản sao 24/7. " +
    "Cùng với một số sinh viên của trường Đại học Quốc Gia Singapore NUS (xem ở 'Team'), một loạt các hình ảnh trực quan đã và đang được xây dựng, củng cố; " +
    "từ những thuật toán sắp xếp đơn giản cho đến những cấu trúc dữ liệu phức tạp, bên cạnh đó còn có chuỗi và một số thuật toán về hình học.<br></p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em\" align=\"left\">VisuAlgo chứa <b>nhiều thuật toán cao cấp</b> được thảo luận trong cuốn sách của Dr Steven Halim" +
    "(Note: Cuốn sách <a href=\"http://sites.google.com/site/stevenhalim/\">'Competitive Programming 3'</a> với đồng tác giả Dr Felix Halim (em trai của Dr Steven Halim)). " +
    "Tại thời điểm này, hình ảnh trực quan của một số thuật toán cao cấp có thể <b>only</b> được tìm thấy ở VisuAlgo. " +
    "Ví dụ, trong <a href=\"dfsbfs.html\">Đường đi trên đồ thị </a>, chúng ta không chỉ thảo luận về thuật toán Depth-First Search (DFS) và Breadth-First Search (BFS) mà còn về sự khác nhau giữa chúng, e.g. " +
    "sự biến đổi trong DFS về tìm kiếm khớp (Cut Vertex) và cầu, DFS Tarjan và Kosaraju giống như thuật toán tìm thành phần liên thông mạnh (SCCs) của một đồ thị có hướng, " +
    "chúng ta còn có thể hình dung sự hoạt động của một đồ thị 2-SAT(isfiablity) và kiểm tra ví dụ có thỏa mãn.</p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em\" align=\"left\">Mặc dù được thiết kế riêng cho học sinh NUS thảo luận trong những khóa học về cấu trúc dữ liệu và giải thuật (ví dụ " +
    "<a href=\"http://nusmods.com/modules/CS1010\" target=\"_blank\">CS1010</a>, " +
    "<a href=\"http://nusmods.com/modules/CS1020\" target=\"_blank\">CS1020</a>, " +
    "<a href=\"http://nusmods.com/modules/CS2010\" target=\"_blank\">CS2010</a>, " +
    "<a href=\"http://nusmods.com/modules/CS2020\" target=\"_blank\">CS2020</a>, " +
    "<a href=\"http://nusmods.com/modules/CS3230\" target=\"_blank\">CS3230</a>, và " +
    "<a href=\"http://nusmods.com/modules/CS3233\" target=\"_blank\">CS3233</a>), là những người ủng hộ việc nghiên cứu trực tuyến, chúng tôi hi vọng những người đam mê nghiên cứu trên toàn thế giới sẽ tìm thấy những hình ảnh trực quan hữu ích.<br><br></p>");

    $("#developments").html("<h2>Ongoing developments</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">VisuAlgo là một dự án đang phát triển và nhiều hình ảnh trực quan phức tạp hơn vẫn đang được tiếp tục mở rộng. " + 
    "The following visualizations are next in line to be developed by our team: Hash trên bảng (sử dụng nhiều kĩ thuật hashing khác nhau), Jack Edmonds' thuật toán Cặp ghép trên đồ thị, Chu-Liu Edmonds' thuật toán cho Directed MST, etc.<br></p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">However, the most exciting development is an automated question generator and verifier (the online quiz system) " +
    "that allows student to test their knowledge of basic data structures and algorithms. " +
    "The questions are <b>randomly generated</b> via some rules and students' answers are <b>instantly and automatically graded</b> upon submission to our grading server. " +
    "This online quiz system, when it matures, should technically eliminate <b>manual</b> basic data structure and algorithm questions from typical Computer Science examinations in many Universities. " +
    "By setting a small (but non-zero) weightage on passing the online quiz, a CS instructor can (significantly? -- to be proven after Dr Steven Halim finished this experiment with his algorithm class this semester) " +
    "increase his/her students mastery on these basic questions as the students have virtually infinite number of training questions that can be verified instantly before they take the online quiz. " +
    "To try this exciting online quiz feature, click the 'Start training!' button on the top right corner of this page.<br><br></p>");

    $("#bug").html("<h2>Bug Reports or Request for New Features</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">VisuAlgo is not a finished project. Dr Steven Halim and his team are still actively improving VisuAlgo. " +
    "If you spot a bug in any of our visualization page/online quiz tool or if you want to request for new features, please contact Dr Steven Halim. " +
    "His contact is the concatenation of his name and add gmail dot com.<br></p><br>");

    $("#publications").html("<h2>Publications</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">This work has been presented briefly at the CLI Workshop at the ACM ICPC World Finals 2012 (Poland, Warsaw) " +
    "and at the IOI Conference at IOI 2012 (Sirmione-Montichiari, Italy). " +
    "You can click <a href=\"http://www.ioinformatics.org/oi/shtm/INFOL099.shtml\" target=\"_blank\">this link</a> to read our 2012 paper about this system (it was not yet called VisuAlgo back in 2012).<br><br></p>");
  }
  else if (language == 'th') { // Thai: th, th-th Contributors: Ramon Bespinyowong
    $("#training-link").html("เริ่มต้นการฝึก!");
    $("#test-link").html("เข้าร่วมบททดสอบ");
    $("#ans-link").html("คำตอบบททดสอบ");

    searchtext = "ค้นหา";

    sorting = new Array("sorting", "การเรียงลำดับ", "การเรียงแบบฟอง", "การเรียงแบบเลือก", "การเรียงแบบลำดับแทรก", "การเรียงแบบผสาน", "การเรียงแบบเร็ว", "การเรียงแบบเร็ว", "การเรียงแบบเลือก", "การเรียงแบบแทรก", "การเรียงแบบนับจำนวน", "การเรียงแบบเรดิกซ์", "การเรียง", "cs2020", "cs1020", "cs1010", "cs3230", "อาร์เรย์", "ลิสต์", "โครงสร้างข้อมูล", "อัลกอริทึม", "การจัดเรียง");
    bitmask = new Array("bitmask", "ตัวดำเนินการระดับบิท", "การจัดการบิท", "บูลีน", "อาร์เรย์", "เซทเล็ก", "cs3233", "cs2020", "cs2010", "ลิสต์", "โครงสร้างข้อมูล", "ตัวดำเนินการระดับบิท");
    linked = new Array("linked", "ลิงค์", "แสตก", "คิว", "แบบทิศทางเดียว", "แบบสองทิศทาง", "เดค", "cs2020", "cs1020", "อาร์เรย์", "โครงสร้างข้อมูล", "ลิงค์", "ลิสต์");
    hashtable = new Array("hashtable", "open addressing", "separate chaining", "linear", "quadratic", "double hashing", "cs2020", "cs1020", "array", "data structure", "hash", "table"); // not translated yet
    heap = new Array("heap", "ฮีพ", "แถวคอยลำดับความสำคัญ", "การเรียงแบบฮีพ", "ที่เวียนเกิด", "cs2020", "cs2010", "การเวียนเกิด", "โครงสร้างข้อมูล", "กราฟ", "ฮีพทวินาม");
    bst = new Array("bst", "ต้นไม้ค้นหาแบบทวิภาค", "ตาราง", "เซท", "แมพ", "ต้นไม้ค้นหาแบบทวิภาค", "Adelson-Velskii Landis", "cs2020", "cs2010", "cs3230", "การเวียนเกิด", "ที่เวียนเกิด", "โครงสร้างข้อมูล", "AVL", "ต้นไม้ค้นหาแบบทวิภาค"); 
    graphs = new Array("graphs", "กราฟ", "ต้นไม้", "สมบูรณ์", "กราฟสองส่วน", "กราฟระบุทิศทาง", "เมทริกซ์ประชิด (Adjacency Matrix)", "รายการประชิด (Adjacency list)", "รายการด้าน (edge list)", "cs2010", "cs2020", "โครงสร้างข้อมูล", "กราฟ");
    union = new Array("union", "ยูเนียน", "โครงสร้างข้อมูลเซตไม่มีส่วนร่วม", "ต้นไม้", "บีบอัด", "ลำดับ", "การบีบอัดวิถี (Path compression)", "ยูเนียนโดยลำดับ (union by rank)", "cs3233", "cs2020", "cs2010", "อาร์เรย์", "เซต", "การเวียนเกิด", "ที่เวียนเกิด", "โครงสร้างข้อมูล", "โครงสร้างข้อมูลเซตไม่มีส่วนร่วม");
    segment = new Array("segmenttree", "ต้นไม้เซกเมนต์", "ขอบเขต", "น้อยสุด/มากสุด/ผลรวย", "การอัพเดตอย่างขี้เกียจ", "ที่เวียนเกิด", "cs3233", "การเวียนเกิด", "โครงสร้างข้อมูล", "ต้นไม้เซกเมนต์");
    bit = new Array("bit", "บิท", "เฟนวิค", "ขอบเขต", "BIT", "ค้นหาขอบเขต/ค้นหาจุด/อัพเดต", "cs3233", "การเวียนเกิด", "ที่เวียนเกิด", "โครงสร้างข้อมูล", "ต้นไม้ดัชนีทวิภาค");

    recursion = new Array("recursion", "การเวียนเกิด", "การกำหนดการเชิงพลวัต (Dynamic Programming)", "ต้นไม้", "กราฟระบุทิศทาง", "cs1010", "cs1020", "cs2010", "cs2020", "cs3230", "cs3233", "ที่เวียนเกิด", "การเวียนเกิด");

    traversal = new Array("traversal", "การท่องกราฟ", "การท่องกราฟแบบลึก", "การท่องกราฟแบบกว้าง", "การเรียงลำดับแบบทอพอโลยี", "ส่วนประกอบที่เชื่อมกันแบบเข้ม", "2-SAT", "การเรียงลำดับแบบทอพอโลยี ", "ส่วนประกอบที่เชื่อมกันแบบเข้ม", "การตรวจสอบกราฟสองส่วน", "cs2010", "cs2020", "cs3230", "อัลกอริทึม", "Tarjan", "Kosaraju", "Kahn", "กราฟ", "การท่องกราฟ");
    mst = new Array("mst", "ต้นไม้แบบทอดข้ามน้อยสุด", "ต้นไม้แบบทอดข้ามน้อยสุด (MST)", "Prim", "Kruskal", "อัลกอริทึม", "cs2020", "cs2010", "กราฟ", "น้อยสุด", "แนวกว้าง", "ต้นไม้");
    sssp = new Array("sssp", "วิถีสั้นสุดจุดกำเนิดเดียว", "วิถีสั้นสุดจุดกำเนิดเดียว", "การค้นหาในแนวกว้าง", "Bellman Ford", "Dijkstra", "cs2010", "cs2020", "กราฟ", "อัลกอริทึม", "วิถีสั้นสุดจุดกำเนิดเดียว");
    maxflow = new Array("maxflow", "การไหลมากที่สุด", "การไหลมากที่สุด", "การตัดต่ำสุด", "Edmonds Karp", "Dinic", "Ford Fulkerson", "กราฟ", "cs2020", "cs3233", "อัลกอริทึม", "การไหลของเครือข่าย (network flow)");
    matching = new Array("matching", "การจับคู่", "วิถีแต่งเติม (augmenting path)", "Hopcroft Karp", "Edmonds", "cs3233", "กราฟ", "อัลกอริทึม", "การจับคู่")

    suffixtree = new Array("suffixtree", "ซัฟฟิกซ์ทรี", "การจับคู่", "ซ้ำ", "ร่วมกัน", "สตริง", "cs3233", "ต้นไม้", "ส่วนเสริมท้าย", "โครงสร้างข้อมูล", "ซัฟฟิกซ์ทรี");
    suffixarray = new Array("suffixarray", "ซัฟฟิกซ์อาร์เรย์ ", "การจัดเรียง", "การเชื่อมต่อระหว่างลำดับย่อยร่วมยาวสุด (LCP)", "สตริง", "การจัดเรียง", "การจับคู่", "ซ้ำ", "ร่วมกัน", "cs3233", "โครงสร้างข้อมูล", "ส่วนเสริมท้าย", "อาร์เรย์", "ซัฟฟิกซ์อาร์เรย์");

    geometry = new Array("geometry", "เรขาคณิต", "รูปหลายมุม", "เส้นผ่าศูนย์กลาง", "เว้า (convex)", "ตัวเลขวีนดิ้ง (winding number)", "รูปหลายเหลี่ยมใน (inPolygon)", "รูปตัดหลายเหลี่ยม (cut polygon)", "นูน (concave)", "คอนเวกซ์ฮัลล์ (convex hull)", "เกรแฮมสแกน (Graham scan)", "cs3233", "algorithm", "Computational Geometry");

    $("#subtitle").html("จำลองโครงสร้างข้อมูลและอัลกอริทึมผ่านภาพเคลื่อนไหว (Thai)");
    $("#sortingtext").html("การจัดเรียง (Sorting)");
    $("#bitmasktext").html("ตัวดำเนินการระดับบิต (Bitmask)");
    $("#linkedtext").html("รายการโยง (Linked List)"); //, กองซ้อน (Stack), แถวคอย (Queue), เดค (Deque)");
    $("#bsttext").html("ต้นไม้ค้นหาแบบทวิภาค (BST)"); // inary Search Tree)");
    $("#heaptext").html("ฮีพทวินาม (Binary Heap)");
    $("#graphstext").html("โครงสร้างข้อมูลกราฟ");
    $("#uniontext").html("โครงสร้างข้อมูลเซตไม่มีส่วนร่วม (UFDS)"); // Union-Find Disjoint Sets)");
    $("#segmenttreetext").html("ต้นไม้เซกเมนต์ (Segment Tree)");
    $("#bittext").html("ต้นไม้ดัชนีทวิภาค (BIT)"); // inary Index Tree)");
    $("#recursiontext").html("กราฟระบุทิศทาง (DAG)");

    $("#traversaltext").html("การค้นกราฟ(Graph Traversal)");
    $("#msttext").html("ต้นไม้แบบทอดข้ามน้อยสุด (MST)"); // inimum Spanning Tree)");
    $("#sssptext").html("วิถีสั้นสุดของแหล่งต้นทางเดียว (SSSP)"); // ingle-Source Shortest Paths)");
    $("#maxflowtext").html("การไหลในเครือข่าย (Network Flow)");
    $("#matchingtext").html("การจับคู่ของกราฟ (Graph Matching)");  
    $("#suffixtreetext").html("ซัฟฟิกซ์ทรี (Suffix Tree)"); 
    $("#suffixarraytext").html("ซัฟฟิกซ์อาร์เรย์(Suffix Array)"); 
    $("#geometrytext").html("เรขาคณิตเชิงคำนวณ (C. Geometry)"); // Computational

    $("#abouttext").html("เกี่ยวกับ VisuAlgo");

    $("#motivation").html("<h2>แรงจูงใจ</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">ดร. Steven Halim คิดค้น VisuAlgo ในปี 2011 เพื่อเป็นเครื่องมือจำลองภาพให้นักเรียนเข้าใจโครงสร้างข้อมูลและอัลกอริทึมมากขึ้น" +
    "โดยให้นักเรียนเรียนรู้พื้นฐานด้วยตัวเองในความเร็วที่เหมาะสม การใช้ VisuAlgo เปรียบเสมือนกับมีดร. Steven Halim ที่สามารถสอนได้ตลอด 24 ชั่วโมง " +
    "เครื่องมือนี้ได้รับการพัฒนาด้วยความช่วยเหลือจากนักเรียนจากมหาวิทยาลัยแห่งชาติสิงคโปร์ (กรุณาดูที่ 'ทีมงาน') " +
    "VisuAlgo มีตั้งแต่อัลกอริทึมในการจัดเรียงอย่างง่ายๆ จนถึงอัลกอริทึมกราฟที่ยากและซับซ้อน นอกจากนี้ยังมีอัลกอริทึมเกี่ยวกับสตริงและเรขาคณิตอีกด้วย<br></p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em\" align=\"left\">VisuAlgo มี<b>อัลกอริทึมที่ซับซ้อมจำนวนมาก</b>ซึ่งถูกอ้างถึงในหนังสือของ Steven Halim และหนังสือเล่มอื่นๆ" +
    "(เขาและพี่ชายเขา Felix Halim ได้เขียนหนังสือเล่นนี้ <a href=\"http://sites.google.com/site/stevenhalim/\">'Competitive Programming 3'</a>) " +
    "ขณะนี้ แบบจำลองหลายๆอัลกอริทึมสามารถค้นพบได้เพียงที่ VisuAlgo<b>เท่านั้น</b> " +
    "ยกตัวอย่างเช่น ใน<a href=\"dfsbfs.html\">ขั้นตอนวิธีในการท่องกราฟ(Graph Traversal)</a> เราไม่ได้เพียงแค่แสดงแค่อัลกอริทึมที่ง่าย อย่างเช่น การค้นหาแนวกว้าง(Breadth First Search) และการค้นในแนวลึก (Depth First Search) เท่านั้น หากแต่เรายังแสดงการประยุกต์ใช้ที่ซับซ้อนอีกด้วย เช่น " +
    "การค้นหาจุดตัด (Cut Vertex) และ  เส้นตัด(Bridge) อัลกอริทึมของ Tarjan และ Kosaraju ในการหาส่วนประกอบที่เชื่อมกันแบบเข้ม (strongly connected component)ของกราฟระบุทิศทาง(directed graph) " +
    "นอกจากนี้พวกเรายังเพิ่มความสามารถในการใช้กราฟแก้ปัญหา 2-SAT ด้วย</p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em\" align=\"left\"> เวปไซต์นี้ถูกออกแบบมาเพื่อนักเรียนมหาวิทยาลัยแห่งชาติสิงคโปร์ที่เรียนโครงสร้างข้อมูลและอัลกอริทึม (เช่นนักเรียนของคอร์ส " +
    "<a href=\"http://nusmods.com/modules/CS1010\" target=\"_blank\">CS1010</a>, " +
    "<a href=\"http://nusmods.com/modules/CS1020\" target=\"_blank\">CS1020</a>, " +
    "<a href=\"http://nusmods.com/modules/CS2010\" target=\"_blank\">CS2010</a>, " +
    "<a href=\"http://nusmods.com/modules/CS2020\" target=\"_blank\">CS2020</a>, " +
    "<a href=\"http://nusmods.com/modules/CS3230\" target=\"_blank\">CS3230</a>, และ " +
    "<a href=\"http://nusmods.com/modules/CS3233\" target=\"_blank\">CS3233</a>) เพื่อสนับสนุนการเรียนรู้ออนไลน์ ทว่า คณะผู้จัดทำหวังว่า ผลงานนี้จะเป็นประโยชน์ต่อนักศึกษามหาวิทยาลัยอื่นทั่วโลกด้วยเช่นกัน<br><br></p>");

    $("#developments").html("<h2>การพัฒนาที่ดำเนินอยู่</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">VisuAlgo เป็นโปรเจคที่ดำเนินการอยู่ แบบจำลองต่างๆกำลังอยู่ในช่วงพัฒนา " + 
    "ทีมของเรากำลังพัฒนาแบบจำลองต่อไปนี้: โครงสร้างแบบแฮช (โดยใช้เทคนิคการแฮชหลายชนิด) อัลกอริทึมจับคู่ของกราฟโดย Jack Edmond(Jack Edmonds' Graph Matching algorithm) อัลกอริทึมของ Chu-Liu Edmonds ในการหาต้นไม้แผ่ขยายต่ำสุด (Minimum Spanning Tree) และอื่นๆ<br></p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">อย่างไรก็ตาม สิ่งที่น่าสนใจที่สุดที่ได้รับการพัฒนาอยู่ คือ แบบทดสอบออนไลน์" +
    "ซึ่งอนุญาตให้นักเรียนได้ทดสอบความรู้ด้านโครงสร้างข้อมูลและอัลกอริทึม " +
    "แบบทดสอบออนไลน์นี้ทำการ<b>สุ่มคำถาม</b> นักเรียนจะได้รับการ<b>ตรวจคำตอบอัติโนมัติทันที</b>ที่ส่งคำตอบเข้าไปในระบบของเรา " +
    "เมื่อแบบทดสอบออนไลน์นี้เสร็จสมบูรณ์ มหาวิทยาลัยสามารถใช้แบบทดสอบออนไลน์ในการวัดความเข้าใจในโครงสร้างข้อมูลและอัลกอริทึม " +
    "ครูผู้สอนสามารถทำให้นักเรียนเข้าใจพื้นฐานของโครงสร้างข้อมูลและอัลกอริทึม โดยให้นักเรียนทำแบบทดสอบออนไลน์นี้หลายๆครั้ง เพราะแต่ละครั้ง ระบบจะสุ่มคำถามที่ต่างกันออกไป " +
    "(ขณะนี้ดร. Steven Halim กำลังทดสอบความสามารถของแบบทดสอบออนไลน์นี้ในวิชาของเขา และเขาคิดว่า ระบบนี้สามารถช่วยนักเรียนได้มาก) " +
    "หากอยากทดลองแบบทดสอบออนไลน์นี้ กรุณาคลิก 'เริ่มต้นการฝึก!' ด้านขวาบนของหน้านี้<br><br></p>");

    $("#bug").html("<h2>รายงานบัคและเพิ่มฟีเจอร์ใหม่</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">VisuAlgo ยังอยู่ในระหว่างการพัฒนาโดย ดร. Steven Halim และทีมงาน " +
    "ถ้าคุณพบบัค หรือคุณอยากเพิ่มฟีเจอร์ใหม่ กรุณาติดต่ด ดร. Steven Halim " +
    "คุณสามารถติดต่อได้ทางอีเมล คุณสามารถหาที่อยู่อีเมลได้โดยนำชื่อนามสกุลของดร. Steven Halim มาเรียงต่อกันและลงท้ายด้วย gmail จุด com<br></p><br>");

    $("#publications").html("<h2>ผลงานตีพิมพ์</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">ผลงานนี้ได้รับการนำเสนอที่ CLI Workshop ที่ ACM ICPC World Finals 2012 (โปแลนด์, วอร์ซอร์) " +
    "และในการสัมมนาที่ IOI 2012 (อิตาลี)" +
    "คุณสามารถคลิก<a href=\"http://www.ioinformatics.org/oi/shtm/INFOL099.shtml\" target=\"_blank\">ที่นี่</a> เพื่ออ่านเกี่ยวกับผลงานชิ้นนี้(ในปี 2012 ผลงานนี้ยังไม่ได้เรียกว่า VisuAlgo)<br><br></p>");
  }
  else if (language == 'nl') { // Dutch: nl, Contributors: Eljakim Schrijvers
    sorting = new Array("sorting", "bubble", "select", "insert", "merge", "quick", "randomized quick", "selection", "insertion", "counting", "radix", "sort", "cs2020", "cs1020", "cs1010", "cs3230", "array", "list", "datastructuur", "algoritme", "sorteren");
    bitmask = new Array("bitmask", "bit manipulation", "Boolean", "array", "kleine set", "cs3233", "cs2020", "cs2010", "lijst", "datastructuur", "bitmask");
    linked = new Array("linked", "stack", "queue", "single", "doubly", "deque", "cs2020", "cs1020", "array", "datastructuur", "linked", "list");
    hashtable = new Array("hashtable", "open addressing", "separate chaining", "linear", "quadratic", "double hashing", "cs2020", "cs1020", "array", "data structure", "hash", "table"); // not translated yet
    heap = new Array("heap", "priority queue", "heap sort", "recursieve", "cs2020", "cs2010", "recursie", "datastructuur", "tree", "binary heap");
    bst = new Array("bst", "table", "set", "map", "BST", "Adelson-Velskii Landis", "cs2020", "cs2010", "cs3230", "recursie", "recursieve", "datastructuur", "AVL", "binary search tree");
    graphs = new Array("graphs", "grafen", "tree", "complete", "bipartite", "DAG", "Adjacency Matrix", "Adjacency List", "Edge List", "cs2010", "cs2020", "datastructuur", "grafen");
    union = new Array("union", "UFDS", "tree", "compress", "rank", "path compression", "union by rank", "cs3233", "cs2020", "cs2010", "array", "set", "recursie", "recursieve", "datastructuur", "Union-Find Disjoint Sets");
    segment = new Array("segmenttree", "range", "Min/Max/Sum", "lazy update", "recursieve", "cs3233", "recursie", "datastructuur", "Segment Tree");
    bit = new Array("bit", "Fenwick", "range", "BIT", "Range/Point Query/Update", "cs3233", "recursie", "recursieve", "datastructuur", "Binary Indexed Tree");

    recursion = new Array("recursion", "Dynamic Programming", "tree", "DAG", "cs1010", "cs1020", "cs2010", "cs2020", "cs3230", "cs3233", "recursieve", "recursie");

    traversal = new Array("traversal", "DFS", "BFS", "toposort", "SCC", "2-SAT", "topologische sortering", "Strongly Connected Components", "bipartite check", "cs2010", "cs2020", "cs3230", "algoritme", "Tarjan", "Kosaraju", "Kahn", "grafen", "traversal");
    mst = new Array("mst", "MST", "Prim", "Kruskal", "algoritme", "cs2020", "cs2010", "grafen", "min", "spanning", "tree");
    sssp = new Array("sssp", "SSSP", "Bellman Ford", "Dijkstra", "BFS", "cs2010", "cs2020", "grafen", "algoritme", "Single-Source Shortest Paths");
    maxflow = new Array("maxflow", "max flow", "min cut", "Edmonds Karp", "Dinic", "Ford Fulkerson", "grafen", "cs2020", "cs3233", "algoritme", "network flow");
    matching = new Array("matching", "augmenting path", "Hopcroft Karp", "Edmonds", "cs3233", "grafen", "algoritme", "matching")

    suffixtree = new Array("suffixtree", "matching", "repeated", "common", "string", "cs3233", "tree", "suffix", "datastructuur", "suffix tree");
    suffixarray = new Array("suffixarray", "sorting", "common prefix", "string", "LCP", "matching", "sorting", "repeated", "common", "cs3233", "datastructuur", "suffix", "array", "suffix array");

    geometry = new Array("geometry", "polygoon", "winding number", "inPolygon", "cut polygon", "perimeter", "convex", "concave", "convex hull", "Graham scan", "cs3233", "algoritme", "Computational Geometry");
  }
  else { // default: English, Contributors: Steven Halim
    $("#training-link").html("Start training!");
    $("#test-link").html("Join ongoing test");
    $("#ans-link").html("Answers to last test");

    searchtext = "Search...";

    sorting = new Array("sorting", "bubble", "select", "insert", "merge", "quick", "randomized quick", "selection", "insertion", "counting", "radix", "sort", "cs2020", "cs1020", "cs1010", "cs3230", "array", "list", "data structure", "algorithm", "sorting");
    bitmask = new Array("bitmask", "bit manipulation", "Boolean", "array", "small set", "cs3233", "cs2020", "cs2010", "list", "data structure", "bitmask");
    linked = new Array("linked", "stack", "queue", "single", "doubly", "deque", "cs2020", "cs1020", "array", "data structure", "linked", "list");
    hashtable = new Array("hashtable", "open addressing", "separate chaining", "linear", "quadratic", "double hashing", "cs2020", "cs1020", "array", "data structure", "hash", "table");
    heap = new Array("heap", "priority queue", "heap sort", "recursive", "cs2020", "cs2010", "recursion", "data structure", "tree", "binary heap");
    bst = new Array("bst", "table", "set", "map", "BST", "Adelson-Velskii Landis", "cs2020", "cs2010", "cs3230", "recursion", "recursive", "data structure", "AVL", "binary search tree"); 
    graphs = new Array("graphs", "tree", "complete", "bipartite", "DAG", "Adjacency Matrix", "Adjacency List", "Edge List", "cs2010", "cs2020", "data structure", "graphs");
    union = new Array("union", "UFDS", "tree", "compress", "rank", "path compression", "union by rank", "cs3233", "cs2020", "cs2010", "array", "set", "recursion", "recursive", "data structure", "Union-Find Disjoint Sets");
    segment = new Array("segmenttree", "range", "Min/Max/Sum", "lazy update", "recursive", "cs3233", "recursion", "data structure", "Segment Tree");
    bit = new Array("bit", "Fenwick", "range", "BIT", "Range/Point Query/Update", "cs3233", "recursion", "recursive", "data structure", "Binary Indexed Tree");

    recursion = new Array("recursion", "Dynamic Programming", "tree", "DAG", "cs1010", "cs1020", "cs2010", "cs2020", "cs3230", "cs3233", "recursive", "recursion");

    traversal = new Array("traversal", "DFS", "BFS", "toposort", "SCC", "2-SAT", "topological sort", "Strongly Connected Components", "bipartite check", "cs2010", "cs2020", "cs3230", "algorithm", "Tarjan", "Kosaraju", "Kahn", "graphs", "traversal");
    mst = new Array("mst", "MST", "Prim", "Kruskal", "algorithm", "cs2020", "cs2010", "graphs", "min", "spanning", "tree");
    sssp = new Array("sssp", "SSSP", "Bellman Ford", "Dijkstra", "BFS", "cs2010", "cs2020", "graphs", "algorithm", "Single-Source Shortest Paths");
    maxflow = new Array("maxflow", "max flow", "min cut", "Edmonds Karp", "Dinic", "Ford Fulkerson", "graphs", "cs2020", "cs3233", "algorithm", "network flow");
    matching = new Array("matching", "augmenting path", "Hopcroft Karp", "Edmonds", "cs3233", "graphs", "algorithm", "matching")

    suffixtree = new Array("suffixtree", "matching", "repeated", "common", "string", "cs3233", "tree", "suffix", "data structure", "suffix tree");
    suffixarray = new Array("suffixarray", "sorting", "common prefix", "string", "LCP", "matching", "sorting", "repeated", "common", "cs3233", "data structure", "suffix", "array", "suffix array");

    geometry = new Array("geometry", "polygon", "winding number", "inPolygon", "cut polygon", "perimeter", "convex", "concave", "convex hull", "Graham scan", "cs3233", "algorithm", "Computational Geometry");

    $("#subtitle").html("visualising data structures and algorithms through animation");
    $("#sortingtext").html("Sorting");
    $("#bitmasktext").html("Bitmask");
    $("#linkedtext").html("Linked List, Stack, Queue, Deque");
    $("#bsttext").html("Binary Search Tree, AVL Tree");
    $("#heaptext").html("Binary Heap");
    $("#graphstext").html("Graph Data Structures");
    $("#uniontext").html("Union-Find Disjoint Sets");
    $("#segmenttreetext").html("Segment Tree");
    $("#bittext").html("Binary Indexed Tree");
    $("#recursiontext").html("Generic Recursion Tree/DAG");

    $("#traversaltext").html("Graph Traversal");
    $("#msttext").html("Minimum Spanning Tree");
    $("#sssptext").html("Single-Source Shortest Paths");
    $("#maxflowtext").html("Network Flow");
    $("#matchingtext").html("Graph Matching");
    $("#suffixtreetext").html("Suffix Tree");
    $("#suffixarraytext").html("Suffix Array");
    $("#geometrytext").html("(Computational) Geometry");

    $("#abouttext").html("About VisuAlgo");

    $("#motivation").html("<h2>Motivation</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">VisuAlgo was conceptualised in 2011 by Dr Steven Halim as a tool to help his students better understand data structures and algorithms, " +
    "by allowing them to learn the basics on their own and at their own pace. VisuAlgo is like a 24/7 copy of himself. " +
    "Together with some of his students from the National University of Singapore (see the 'Team'), a series of visualisations were developed and consolidated, " +
    "from simple sorting algorithms to complex graph data structures and algorithms, and also string+geometry algorithms.<br></p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em\" align=\"left\">VisuAlgo contains <b>many advanced algorithms</b> that are discussed in Dr Steven Halim's book and beyond " +
    "(Note: This <a href=\"http://sites.google.com/site/stevenhalim/\">'Competitive Programming 3'</a> book is co-authored with his brother Dr Felix Halim). " +
    "At this point of time, some of these advanced algorithms visualization/animation can <b>only</b> be found in VisuAlgo. " +
    "For example, in <a href=\"dfsbfs.html\">Graph Traversal visualization</a>, we do not just discuss the standard Depth-First Search (DFS) and Breadth-First Search (BFS) algorithms, but also their variants, e.g. " +
    "the modifications of DFS for finding Articulation Points (Cut Vertex) and Bridges, Tarjan's and Kosaraju's DFS-like algorithms for finding Strongly Connected Components (SCCs) of a directed graph, " +
    "and we also have feature to visualize the implication graph of a small 2-SAT(isfiablity) instance and check if the instance is satisfiable.</p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em\" align=\"left\">Though specifically designed for NUS students taking various data structure and algorithm classes (e.g. " +
    "<a href=\"http://nusmods.com/modules/CS1010\" target=\"_blank\">CS1010</a>, " +
    "<a href=\"http://nusmods.com/modules/CS1020\" target=\"_blank\">CS1020</a>, " +
    "<a href=\"http://nusmods.com/modules/CS2010\" target=\"_blank\">CS2010</a>, " +
    "<a href=\"http://nusmods.com/modules/CS2020\" target=\"_blank\">CS2020</a>, " +
    "<a href=\"http://nusmods.com/modules/CS3230\" target=\"_blank\">CS3230</a>, and " +
    "<a href=\"http://nusmods.com/modules/CS3233\" target=\"_blank\">CS3233</a>), as advocators of online learning, we hope that curious minds around the world will find these visualisations useful as well.<br><br></p>");

    $("#developments").html("<h2>Ongoing developments</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">VisuAlgo is an ongoing project and more complex visualisations are still being developed. " + 
    "The following visualizations are next in line to be developed by our team: Hash Table (using several hashing techniques), Jack Edmonds' Graph Matching algorithm, Chu-Liu Edmonds' algorithm for Directed MST, etc.<br></p><br>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">However, the most exciting development is an automated question generator and verifier (the online quiz system) " +
    "that allows student to test their knowledge of basic data structures and algorithms. " +
    "The questions are <b>randomly generated</b> via some rules and students' answers are <b>instantly and automatically graded</b> upon submission to our grading server. " +
    "This online quiz system, when it matures, should technically eliminate <b>manual</b> basic data structure and algorithm questions from typical Computer Science examinations in many Universities. " +
    "By setting a small (but non-zero) weightage on passing the online quiz, a CS instructor can (significantly? -- to be proven after Dr Steven Halim finished this experiment with his algorithm class this semester) " +
    "increase his/her students mastery on these basic questions as the students have virtually infinite number of training questions that can be verified instantly before they take the online quiz. " +
    "To try this exciting online quiz feature, click the 'Start training!' button on the top right corner of this page.<br><br></p>");

    $("#bug").html("<h2>Bug Reports or Request for New Features</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">VisuAlgo is not a finished project. Dr Steven Halim and his team are still actively improving VisuAlgo. " +
    "If you spot a bug in any of our visualization page/online quiz tool or if you want to request for new features, please contact Dr Steven Halim. " +
    "His contact is the concatenation of his name and add gmail dot com.<br></p><br>");

    $("#publications").html("<h2>Publications</h2>" +
    "<p style=\"margin-left:5em; margin-right:5em;\" align=\"left\">This work has been presented briefly at the CLI Workshop at the ACM ICPC World Finals 2012 (Poland, Warsaw) " +
    "and at the IOI Conference at IOI 2012 (Sirmione-Montichiari, Italy). " +
    "You can click <a href=\"http://www.ioinformatics.org/oi/shtm/INFOL099.shtml\" target=\"_blank\">this link</a> to read our 2012 paper about this system (it was not yet called VisuAlgo back in 2012).<br><br></p>");
  }

  $("#search").val(searchtext);
  document.title = "VisuAlgo - " + $("#subtitle").html(); // dynamically change the title bar also
}
