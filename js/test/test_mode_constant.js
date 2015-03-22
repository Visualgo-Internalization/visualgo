// definitions of question terminology
var definitionsArr = new Array();
definitionsArr.push(['sequence', 'The order matters. Do not forget to include the starting point (if given) as the first selection']);
definitionsArr.push(['subset', 'One or more vertices in any order']);
definitionsArr.push(['height', 'Height is defined as the number of edges from the root to the deepest leaf']);
definitionsArr.push(['rank', 'Rank is defined as the 1-based index in the sorted list of elements of the tree']);
definitionsArr.push(['O(n) Build Heap', 'As defined in the VisuAlgo heap visualisation']);
definitionsArr.push(['Adjacency Matrix', 'The smallest Adjacency Matrix representation for the graph']);
definitionsArr.push(['Second Best Minimum Spanning Tree', 'A Second Best Minimum Spanning Tree is a tree whose total weight of the edges is greater than the minimum spanning tree and lesser than any other spanning tree of the graph']);
definitionsArr.push(['type of graph', 'Only take into account properties of the graph. Your answer should apply to all graphs with the same properties as the graph below']);
definitionsArr.push(['balance factor', 'Balance Factor is defined as the difference between the height of the left subtree and the height of the right subtree.']);
definitionsArr.push(['Original Dijkstra\'s', 'Original Dijkstra\'s algorithm: a graph search algorithm that solves the single-source shortest path problem for a graph with non-negative edge path costs']);
definitionsArr.push(['Modified Dijkstra\'s', 'Similar to Original Dijkstra\'s algorithm but employs Lazy Data Structure strategy to re-enqueue and re-process edges']);

const QUESTION_DIFFICULTY_EASY = "Easy";
const QUESTION_DIFFICULTY_MEDIUM = "Medium";
const QUESTION_DIFFICULTY_HARD = "Hard";

const ANSWER_TYPE_VERTEX = "vertex";
const ANSWER_TYPE_VERTEX_MCQ = "vertexMcq";
const ANSWER_TYPE_EDGE = "edge";
const ANSWER_TYPE_MCQ = "mcq";
const ANSWER_TYPE_FILL_BLANKS = "fillBlanks";
const ANSWER_TYPE_GRAPH_DRAWING = "graphDrawing";

const ANSWER_AMT_ONE = 1;
const ANSWER_AMT_MULTIPLE = 2;
const ANSWER_GRAPH_WEIGHTED_UNDIRECTED = 3;
const ANSWER_GRAPH_UNWEIGHTED_UNDIRECTED = 4;
const ANSWER_GRAPH_UNWEIGHTED_DIRECTED = 5;
const ANSWER_GRAPH_WEIGHTED_DIRECTED = 6;

const MODE_GENERATE_QUESTIONS = 0;      //for training and control panel
const MODE_TEST_GENERATE_QUESTIONS = 1;   //for test and ans key
const MODE_GET_ANSWERS = 3;         //for training and control panel
const MODE_GET_STUDENT_ANSWERS = 4;     //for future use
const MODE_CHECK_TEST_OPEN = 5;
const MODE_GET_ALL_OPEN_TESTS = 7;         //for test
const MODE_GET_ALL_OPEN_ANSWERS = 8;         //for test
const MODE_TEST_SUBMIT = 9;         //for test
const MODE_TEST_GET_INFO = 10;       //for test and ans key
const MODE_TEST_GET_ANSWERS = 11;      //for ans key
const MODE_TEST_GET_STUDENT_ANSWERS = 12; //for ans key
const MODE_ADMIN = 13;            //for control panel
const MODE_ADMIN_GET_CONFIG = 14;     //for control panel
const MODE_ADMIN_GET_ALL_TESTS = 15;      //for control panel
const MODE_ADMIN_ADD_TEST_CONFIG = 16;
const MODE_ADMIN_EDIT_CONFIG = 17;      //for control panel
const MODE_ADMIN_RESET_ATTEMPT = 18;    //for control panel
const MODE_GET_SCOREBOARD = 19;
const MODE_GET_PUBLIC_SCOREBOARD = 20;
const MODE_ADMIN_GET_TRAINING_SESSION_STATS = 31; // for control panel
const MODE_USER_TEST_LOGIN = 32; // for test
const MODE_USER_ANSWER_LOGIN = 33; // for test
const MODE_SUBMIT_BUG_REPORT = 34;
const MODE_GET_ALL_BUG_REPORTS = 35;
const MODE_CHANGE_PASSWORD = 36; // for user

const UNANSWERED = "unanswered";
const NO_ANSWER = "noAnswer";
const CORRECT = "correct";

const TEST_GENERATE_QUESTIONS_TYPE_TEST = "test";
const TEST_GENERATE_QUESTIONS_TYPE_ANSWER = "answer";