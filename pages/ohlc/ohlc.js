var stockChart = require('../../utils/ohlchart.js')
var ctx;
var touchPosition = 180;//initialize default touch position within the canvas coordinate
var startPosition = 50; //default starting index of ohlc array(aka data) == length of response data - points within canvas
var scrollPosition = 50; //used to store last index(startposition) within a single swipe
var scrollLength = 0, offsetWatcher = 0;
var maxPrice, minPrice = 0;
var reDraw, anchorPoint;
Page({
  data:{
    canvasWidth : 355,
    dataCount : 50,
    scrollLength : 0,
    touchPosition : 180,
    chunckSeq : 0,
    touchOffset : 0,
    dataStartPosition : 0,
    timeStamp : 0,
    redrawFlag : 0,
    kLine : {"result":{"code":"SZ002264","type":"1","candle_period":"6","candle_mode":"0","search_direction":"1","date":"","min_time":"","data_count":50,"start_date":"","end_date":"","detail_list":[{"min_time":"20160404","open_px":"8.61","high_px":"8.73","low_px":"8.11","close_px":"8.11","business_amount":"37317177","business_balance":"314602604","ma5":"9.17","ma10":"8.96","ma20":"8.37"},{"min_time":"20160405","open_px":"8.11","high_px":"8.27","low_px":"7.91","close_px":"8.10","business_amount":"19717461","business_balance":"160040608","ma5":"8.85","ma10":"8.99","ma20":"8.39"},{"min_time":"20160406","open_px":"7.96","high_px":"8.45","low_px":"7.90","close_px":"8.35","business_amount":"23173074","business_balance":"191707231","ma5":"8.59","ma10":"9.02","ma20":"8.41"},{"min_time":"20160407","open_px":"8.35","high_px":"8.62","low_px":"8.25","close_px":"8.47","business_amount":"22029330","business_balance":"185883247","ma5":"8.41","ma10":"8.99","ma20":"8.44"},{"min_time":"20160408","open_px":"8.48","high_px":"8.50","low_px":"8.23","close_px":"8.29","business_amount":"15142995","business_balance":"126842346","ma5":"8.26","ma10":"8.85","ma20":"8.44"},{"min_time":"20160411","open_px":"8.30","high_px":"8.32","low_px":"8.00","close_px":"8.09","business_amount":"15245398","business_balance":"123517881","ma5":"8.26","ma10":"8.72","ma20":"8.46"},{"min_time":"20160412","open_px":"8.18","high_px":"8.45","low_px":"8.12","close_px":"8.16","business_amount":"15544415","business_balance":"128655583","ma5":"8.27","ma10":"8.56","ma20":"8.5"},{"min_time":"20160413","open_px":"8.13","high_px":"8.34","low_px":"8.00","close_px":"8.29","business_amount":"12923235","business_balance":"105874115","ma5":"8.26","ma10":"8.42","ma20":"8.53"},{"min_time":"20160414","open_px":"8.30","high_px":"8.41","low_px":"8.10","close_px":"8.16","business_amount":"11872827","business_balance":"97856684","ma5":"8.2","ma10":"8.3","ma20":"8.56"},{"min_time":"20160415","open_px":"8.16","high_px":"8.40","low_px":"7.79","close_px":"8.26","business_amount":"20494611","business_balance":"168266045","ma5":"8.19","ma10":"8.23","ma20":"8.58"},{"min_time":"20160418","open_px":"8.13","high_px":"8.45","low_px":"8.13","close_px":"8.44","business_amount":"15300938","business_balance":"127567598","ma5":"8.26","ma10":"8.26","ma20":"8.61"},{"min_time":"20160419","open_px":"8.40","high_px":"8.48","low_px":"8.31","close_px":"8.45","business_amount":"12325598","business_balance":"103391658","ma5":"8.32","ma10":"8.3","ma20":"8.64"},{"min_time":"20160420","open_px":"8.52","high_px":"8.81","low_px":"8.46","close_px":"8.54","business_amount":"17886479","business_balance":"154191968","ma5":"8.37","ma10":"8.32","ma20":"8.67"},{"min_time":"20160421","open_px":"8.48","high_px":"8.56","low_px":"8.35","close_px":"8.55","business_amount":"10681128","business_balance":"90023169","ma5":"8.45","ma10":"8.32","ma20":"8.66"},{"min_time":"20160422","open_px":"8.55","high_px":"8.68","low_px":"8.41","close_px":"8.50","business_amount":"10381524","business_balance":"88725889","ma5":"8.5","ma10":"8.34","ma20":"8.6"},{"min_time":"20160425","open_px":"8.40","high_px":"8.65","low_px":"8.31","close_px":"8.63","business_amount":"11813663","business_balance":"100679634","ma5":"8.53","ma10":"8.4","ma20":"8.56"},{"min_time":"20160426","open_px":"8.63","high_px":"8.75","low_px":"8.54","close_px":"8.59","business_amount":"8845988","business_balance":"76123070","ma5":"8.56","ma10":"8.44","ma20":"8.5"},{"min_time":"20160427","open_px":"8.61","high_px":"8.89","low_px":"8.52","close_px":"8.88","business_amount":"15277041","business_balance":"132811366","ma5":"8.63","ma10":"8.5","ma20":"8.46"},{"min_time":"20160428","open_px":"8.85","high_px":"8.89","low_px":"8.62","close_px":"8.71","business_amount":"12146338","business_balance":"106256845","ma5":"8.66","ma10":"8.55","ma20":"8.43"},{"min_time":"20160429","open_px":"8.69","high_px":"8.74","low_px":"8.50","close_px":"8.64","business_amount":"9713741","business_balance":"83691216","ma5":"8.69","ma10":"8.59","ma20":"8.41"},{"min_time":"20160502","open_px":"8.51","high_px":"8.58","low_px":"8.28","close_px":"8.30","business_amount":"15021947","business_balance":"126936852","ma5":"8.62","ma10":"8.58","ma20":"8.42"},{"min_time":"20160503","open_px":"8.30","high_px":"8.35","low_px":"8.15","close_px":"8.32","business_amount":"11601838","business_balance":"95906019","ma5":"8.57","ma10":"8.57","ma20":"8.43"},{"min_time":"20160504","open_px":"8.30","high_px":"8.33","low_px":"8.20","close_px":"8.27","business_amount":"11857372","business_balance":"97918342","ma5":"8.45","ma10":"8.54","ma20":"8.43"},{"min_time":"20160505","open_px":"8.22","high_px":"8.37","low_px":"8.20","close_px":"8.32","business_amount":"9802544","business_balance":"81194325","ma5":"8.37","ma10":"8.52","ma20":"8.42"},{"min_time":"20160506","open_px":"8.29","high_px":"8.38","low_px":"8.24","close_px":"8.25","business_amount":"7066290","business_balance":"58542010","ma5":"8.29","ma10":"8.49","ma20":"8.42"},{"min_time":"20160509","open_px":"8.25","high_px":"8.28","low_px":"8.18","close_px":"8.27","business_amount":"5268950","business_balance":"43414013","ma5":"8.29","ma10":"8.46","ma20":"8.43"},{"min_time":"20160510","open_px":"8.25","high_px":"8.65","low_px":"8.21","close_px":"8.63","business_amount":"14249676","business_balance":"120436113","ma5":"8.35","ma10":"8.46","ma20":"8.45"},{"min_time":"20160511","open_px":"8.63","high_px":"8.81","low_px":"8.53","close_px":"8.65","business_amount":"14181557","business_balance":"123019564","ma5":"8.42","ma10":"8.44","ma20":"8.47"},{"min_time":"20160512","open_px":"8.65","high_px":"9.06","low_px":"8.55","close_px":"8.94","business_amount":"24003795","business_balance":"213663565","ma5":"8.55","ma10":"8.46","ma20":"8.51"},{"min_time":"20160513","open_px":"8.97","high_px":"9.10","low_px":"8.76","close_px":"8.78","business_amount":"14157932","business_balance":"126170518","ma5":"8.65","ma10":"8.47","ma20":"8.53"},{"min_time":"20160516","open_px":"8.82","high_px":"8.88","low_px":"8.66","close_px":"8.76","business_amount":"8100583","business_balance":"70918484","ma5":"8.75","ma10":"8.52","ma20":"8.55"},{"min_time":"20160517","open_px":"8.77","high_px":"8.95","low_px":"8.69","close_px":"8.81","business_amount":"9178106","business_balance":"80872191","ma5":"8.79","ma10":"8.57","ma20":"8.57"},{"min_time":"20160518","open_px":"8.82","high_px":"8.90","low_px":"7.98","close_px":"8.01","business_amount":"16293684","business_balance":"135974326","ma5":"8.66","ma10":"8.54","ma20":"8.54"},{"min_time":"20160519","open_px":"8.10","high_px":"8.43","low_px":"8.00","close_px":"8.28","business_amount":"10146862","business_balance":"83143549","ma5":"8.53","ma10":"8.54","ma20":"8.53"},{"min_time":"20160520","open_px":"8.30","high_px":"8.75","low_px":"8.23","close_px":"8.59","business_amount":"22520819","business_balance":"191947020","ma5":"8.49","ma10":"8.57","ma20":"8.53"},{"min_time":"20160523","open_px":"8.50","high_px":"8.54","low_px":"8.21","close_px":"8.31","business_amount":"13823762","business_balance":"115619522","ma5":"8.4","ma10":"8.58","ma20":"8.52"},{"min_time":"20160524","open_px":"8.26","high_px":"8.41","low_px":"8.24","close_px":"8.41","business_amount":"5706973","business_balance":"47628329","ma5":"8.32","ma10":"8.55","ma20":"8.51"},{"min_time":"20160525","open_px":"8.36","high_px":"8.75","low_px":"8.34","close_px":"8.68","business_amount":"13273643","business_balance":"114461672","ma5":"8.45","ma10":"8.56","ma20":"8.5"},{"min_time":"20160526","open_px":"8.70","high_px":"8.85","low_px":"8.58","close_px":"8.74","business_amount":"11928602","business_balance":"104230874","ma5":"8.55","ma10":"8.54","ma20":"8.5"},{"min_time":"20160527","open_px":"8.78","high_px":"8.78","low_px":"8.56","close_px":"8.66","business_amount":"7730902","business_balance":"66813909","ma5":"8.56","ma10":"8.52","ma20":"8.5"},{"min_time":"20160530","open_px":"8.58","high_px":"8.68","low_px":"8.38","close_px":"8.68","business_amount":"7422674","business_balance":"63312499","ma5":"8.63","ma10":"8.52","ma20":"8.52"},{"min_time":"20160531","open_px":"8.63","high_px":"8.97","low_px":"8.62","close_px":"8.85","business_amount":"14174409","business_balance":"124657191","ma5":"8.72","ma10":"8.52","ma20":"8.54"},{"min_time":"20160601","open_px":"8.81","high_px":"8.91","low_px":"8.73","close_px":"8.79","business_amount":"8999294","business_balance":"79279958","ma5":"8.74","ma10":"8.6","ma20":"8.57"},{"min_time":"20160602","open_px":"8.70","high_px":"8.84","low_px":"8.60","close_px":"8.60","business_amount":"6540802","business_balance":"56688915","ma5":"8.72","ma10":"8.63","ma20":"8.58"},{"min_time":"20160603","open_px":"8.57","high_px":"8.74","low_px":"8.52","close_px":"8.71","business_amount":"5186884","business_balance":"44919429","ma5":"8.73","ma10":"8.64","ma20":"8.61"},{"min_time":"20160606","open_px":"8.77","high_px":"8.88","low_px":"8.50","close_px":"8.87","business_amount":"14000651","business_balance":"122336784","ma5":"8.76","ma10":"8.7","ma20":"8.64"},{"min_time":"20160607","open_px":"8.86","high_px":"8.95","low_px":"8.78","close_px":"8.84","business_amount":"9943381","business_balance":"87905567","ma5":"8.76","ma10":"8.74","ma20":"8.65"},{"min_time":"20160608","open_px":"8.81","high_px":"9.51","low_px":"8.75","close_px":"9.38","business_amount":"25846542","business_balance":"238694410","ma5":"8.88","ma10":"8.81","ma20":"8.68"},{"min_time":"20160609","open_px":"9.76","high_px":"9.89","low_px":"9.40","close_px":"9.66","business_amount":"49017484","business_balance":"473040418","ma5":"9.09","ma10":"8.9","ma20":"8.72"},{"min_time":"20160610","open_px":"9.80","high_px":"10.63","low_px":"9.69","close_px":"10.63","business_amount":"69325570","business_balance":"724158574","ma5":"9.48","ma10":"9.1","ma20":"8.81"},{"min_time":"20160613","open_px":"8.61","high_px":"8.73","low_px":"8.11","close_px":"8.11","business_amount":"37317177","business_balance":"314602604","ma5":"9.17","ma10":"8.96","ma20":"8.37"},{"min_time":"20160614","open_px":"8.11","high_px":"8.27","low_px":"7.91","close_px":"8.10","business_amount":"19717461","business_balance":"160040608","ma5":"8.85","ma10":"8.99","ma20":"8.39"},{"min_time":"20160615","open_px":"7.96","high_px":"8.45","low_px":"7.90","close_px":"8.35","business_amount":"23173074","business_balance":"191707231","ma5":"8.59","ma10":"9.02","ma20":"8.41"},{"min_time":"20160616","open_px":"8.35","high_px":"8.62","low_px":"8.25","close_px":"8.47","business_amount":"22029330","business_balance":"185883247","ma5":"8.41","ma10":"8.99","ma20":"8.44"},{"min_time":"20160617","open_px":"8.48","high_px":"8.50","low_px":"8.23","close_px":"8.29","business_amount":"15142995","business_balance":"126842346","ma5":"8.26","ma10":"8.85","ma20":"8.44"},{"min_time":"20160620","open_px":"8.30","high_px":"8.32","low_px":"8.00","close_px":"8.09","business_amount":"15245398","business_balance":"123517881","ma5":"8.26","ma10":"8.72","ma20":"8.46"},{"min_time":"20160621","open_px":"8.18","high_px":"8.45","low_px":"8.12","close_px":"8.16","business_amount":"15544415","business_balance":"128655583","ma5":"8.27","ma10":"8.56","ma20":"8.5"},{"min_time":"20160622","open_px":"8.13","high_px":"8.34","low_px":"8.00","close_px":"8.29","business_amount":"12923235","business_balance":"105874115","ma5":"8.26","ma10":"8.42","ma20":"8.53"},{"min_time":"20160623","open_px":"8.30","high_px":"8.41","low_px":"8.10","close_px":"8.16","business_amount":"11872827","business_balance":"97856684","ma5":"8.2","ma10":"8.3","ma20":"8.56"},{"min_time":"20160624","open_px":"8.16","high_px":"8.40","low_px":"7.79","close_px":"8.26","business_amount":"20494611","business_balance":"168266045","ma5":"8.19","ma10":"8.23","ma20":"8.58"},{"min_time":"20160627","open_px":"8.13","high_px":"8.45","low_px":"8.13","close_px":"8.44","business_amount":"15300938","business_balance":"127567598","ma5":"8.26","ma10":"8.26","ma20":"8.61"},{"min_time":"20160628","open_px":"8.40","high_px":"8.48","low_px":"8.31","close_px":"8.45","business_amount":"12325598","business_balance":"103391658","ma5":"8.32","ma10":"8.3","ma20":"8.64"},{"min_time":"20160629","open_px":"8.52","high_px":"8.81","low_px":"8.46","close_px":"8.54","business_amount":"17886479","business_balance":"154191968","ma5":"8.37","ma10":"8.32","ma20":"8.67"},{"min_time":"20160630","open_px":"8.48","high_px":"8.56","low_px":"8.35","close_px":"8.55","business_amount":"10681128","business_balance":"90023169","ma5":"8.45","ma10":"8.32","ma20":"8.66"},{"min_time":"20160701","open_px":"8.55","high_px":"8.68","low_px":"8.41","close_px":"8.50","business_amount":"10381524","business_balance":"88725889","ma5":"8.5","ma10":"8.34","ma20":"8.6"},{"min_time":"20160704","open_px":"8.40","high_px":"8.65","low_px":"8.31","close_px":"8.63","business_amount":"11813663","business_balance":"100679634","ma5":"8.53","ma10":"8.4","ma20":"8.56"},{"min_time":"20160705","open_px":"8.63","high_px":"8.75","low_px":"8.54","close_px":"8.59","business_amount":"8845988","business_balance":"76123070","ma5":"8.56","ma10":"8.44","ma20":"8.5"},{"min_time":"20160706","open_px":"8.61","high_px":"8.89","low_px":"8.52","close_px":"8.88","business_amount":"15277041","business_balance":"132811366","ma5":"8.63","ma10":"8.5","ma20":"8.46"},{"min_time":"20160707","open_px":"8.85","high_px":"8.89","low_px":"8.62","close_px":"8.71","business_amount":"12146338","business_balance":"106256845","ma5":"8.66","ma10":"8.55","ma20":"8.43"},{"min_time":"20160708","open_px":"8.69","high_px":"8.74","low_px":"8.50","close_px":"8.64","business_amount":"9713741","business_balance":"83691216","ma5":"8.69","ma10":"8.59","ma20":"8.41"},{"min_time":"20160711","open_px":"8.51","high_px":"8.58","low_px":"8.28","close_px":"8.30","business_amount":"15021947","business_balance":"126936852","ma5":"8.62","ma10":"8.58","ma20":"8.42"},{"min_time":"20160712","open_px":"8.30","high_px":"8.35","low_px":"8.15","close_px":"8.32","business_amount":"11601838","business_balance":"95906019","ma5":"8.57","ma10":"8.57","ma20":"8.43"},{"min_time":"20160713","open_px":"8.30","high_px":"8.33","low_px":"8.20","close_px":"8.27","business_amount":"11857372","business_balance":"97918342","ma5":"8.45","ma10":"8.54","ma20":"8.43"},{"min_time":"20160714","open_px":"8.22","high_px":"8.37","low_px":"8.20","close_px":"8.32","business_amount":"9802544","business_balance":"81194325","ma5":"8.37","ma10":"8.52","ma20":"8.42"},{"min_time":"20160715","open_px":"8.29","high_px":"8.38","low_px":"8.24","close_px":"8.25","business_amount":"7066290","business_balance":"58542010","ma5":"8.29","ma10":"8.49","ma20":"8.42"},{"min_time":"20160718","open_px":"8.25","high_px":"8.28","low_px":"8.18","close_px":"8.27","business_amount":"5268950","business_balance":"43414013","ma5":"8.29","ma10":"8.46","ma20":"8.43"},{"min_time":"20160719","open_px":"8.25","high_px":"8.65","low_px":"8.21","close_px":"8.63","business_amount":"14249676","business_balance":"120436113","ma5":"8.35","ma10":"8.46","ma20":"8.45"},{"min_time":"20160720","open_px":"8.63","high_px":"8.81","low_px":"8.53","close_px":"8.65","business_amount":"14181557","business_balance":"123019564","ma5":"8.42","ma10":"8.44","ma20":"8.47"},{"min_time":"20160721","open_px":"8.65","high_px":"9.06","low_px":"8.55","close_px":"8.94","business_amount":"24003795","business_balance":"213663565","ma5":"8.55","ma10":"8.46","ma20":"8.51"},{"min_time":"20160722","open_px":"8.97","high_px":"9.10","low_px":"8.76","close_px":"8.78","business_amount":"14157932","business_balance":"126170518","ma5":"8.65","ma10":"8.47","ma20":"8.53"},{"min_time":"20160725","open_px":"8.82","high_px":"8.88","low_px":"8.66","close_px":"8.76","business_amount":"8100583","business_balance":"70918484","ma5":"8.75","ma10":"8.52","ma20":"8.55"},{"min_time":"20160726","open_px":"8.77","high_px":"8.95","low_px":"8.69","close_px":"8.81","business_amount":"9178106","business_balance":"80872191","ma5":"8.79","ma10":"8.57","ma20":"8.57"},{"min_time":"20160727","open_px":"8.82","high_px":"8.90","low_px":"7.98","close_px":"8.01","business_amount":"16293684","business_balance":"135974326","ma5":"8.66","ma10":"8.54","ma20":"8.54"},{"min_time":"20160728","open_px":"8.10","high_px":"8.43","low_px":"8.00","close_px":"8.28","business_amount":"10146862","business_balance":"83143549","ma5":"8.53","ma10":"8.54","ma20":"8.53"},{"min_time":"20160729","open_px":"8.30","high_px":"8.75","low_px":"8.23","close_px":"8.59","business_amount":"22520819","business_balance":"191947020","ma5":"8.49","ma10":"8.57","ma20":"8.53"},{"min_time":"20160801","open_px":"8.50","high_px":"8.54","low_px":"8.21","close_px":"8.31","business_amount":"13823762","business_balance":"115619522","ma5":"8.4","ma10":"8.58","ma20":"8.52"},{"min_time":"20160802","open_px":"8.26","high_px":"8.41","low_px":"8.24","close_px":"8.41","business_amount":"5706973","business_balance":"47628329","ma5":"8.32","ma10":"8.55","ma20":"8.51"},{"min_time":"20160803","open_px":"8.36","high_px":"8.75","low_px":"8.34","close_px":"8.68","business_amount":"13273643","business_balance":"114461672","ma5":"8.45","ma10":"8.56","ma20":"8.5"},{"min_time":"20160804","open_px":"8.70","high_px":"8.85","low_px":"8.58","close_px":"8.74","business_amount":"11928602","business_balance":"104230874","ma5":"8.55","ma10":"8.54","ma20":"8.5"},{"min_time":"20160805","open_px":"8.78","high_px":"8.78","low_px":"8.56","close_px":"8.66","business_amount":"7730902","business_balance":"66813909","ma5":"8.56","ma10":"8.52","ma20":"8.5"},{"min_time":"20160808","open_px":"8.58","high_px":"8.68","low_px":"8.38","close_px":"8.68","business_amount":"7422674","business_balance":"63312499","ma5":"8.63","ma10":"8.52","ma20":"8.52"},{"min_time":"20160809","open_px":"8.63","high_px":"8.97","low_px":"8.62","close_px":"8.85","business_amount":"14174409","business_balance":"124657191","ma5":"8.72","ma10":"8.52","ma20":"8.54"},{"min_time":"20160810","open_px":"8.81","high_px":"8.91","low_px":"8.73","close_px":"8.79","business_amount":"8999294","business_balance":"79279958","ma5":"8.74","ma10":"8.6","ma20":"8.57"},{"min_time":"20160811","open_px":"8.70","high_px":"8.84","low_px":"8.60","close_px":"8.60","business_amount":"6540802","business_balance":"56688915","ma5":"8.72","ma10":"8.63","ma20":"8.58"},{"min_time":"20160812","open_px":"8.57","high_px":"8.74","low_px":"8.52","close_px":"8.71","business_amount":"5186884","business_balance":"44919429","ma5":"8.73","ma10":"8.64","ma20":"8.61"},{"min_time":"20160815","open_px":"8.77","high_px":"8.88","low_px":"8.50","close_px":"8.87","business_amount":"14000651","business_balance":"122336784","ma5":"8.76","ma10":"8.7","ma20":"8.64"},{"min_time":"20160816","open_px":"8.86","high_px":"8.95","low_px":"8.78","close_px":"8.84","business_amount":"9943381","business_balance":"87905567","ma5":"8.76","ma10":"8.74","ma20":"8.65"},{"min_time":"20160817","open_px":"8.81","high_px":"9.51","low_px":"8.75","close_px":"9.38","business_amount":"25846542","business_balance":"238694410","ma5":"8.88","ma10":"8.81","ma20":"8.68"},{"min_time":"20160818","open_px":"9.76","high_px":"9.89","low_px":"9.40","close_px":"9.66","business_amount":"49017484","business_balance":"473040418","ma5":"9.09","ma10":"8.9","ma20":"8.72"},{"min_time":"20160819","open_px":"9.80","high_px":"10.63","low_px":"9.69","close_px":"10.63","business_amount":"69325570","business_balance":"724158574","ma5":"9.48","ma10":"9.1","ma20":"8.81"}]}}
  },
  calcMA : function(data,i) {
    data.reduce(function(x,y) { return x/i + y/i }, 0);
  },
  initOHLC : function(startPosition) {
    console.log(startPosition);
    var that = this;
    var data = [];
    var ohlcPrices = [];
    var volumes = [];
    var dates = [];
    var ma5Prices = [];
    var ma10Prices = [];
    var ma20Prices = [];
    data = that.data.kLine.result.detail_list.slice(startPosition, startPosition + that.data.dataCount);
    for (var i = 0, len = data.length; i < len; i++) {
      ohlcPrices.push({
        o: parseFloat(data[i].open_px),
        h: parseFloat(data[i].high_px),
        l: parseFloat(data[i].low_px),
        c: parseFloat(data[i].close_px)
      });
      var highPrices = ohlcPrices.map(function (price) {
          return price.h;
      });
      var lowPrices = ohlcPrices.map(function (price) {
          return price.l;
      });
      var maxPrice = Math.max.apply(null, highPrices);
      var minPrice = Math.min.apply(null, lowPrices);
      volumes.push(parseFloat(data[i].business_amount));
      dates.push(data[i].min_time.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2'));
      ma5Prices.push(parseFloat(data[i].ma5));
      ma10Prices.push(parseFloat(data[i].ma10));
      ma20Prices.push(parseFloat(data[i].ma20));
    }
    stockChart.drawKLine({
      id: 'kLine',
      pixelRatio:1,
      width: that.data.canvasWidth,
      height: 180,
      ohlcPrices: ohlcPrices,
      volumes: volumes,
      dates: dates,
      maLists: [
        {
          title: 'MA5',
          prices: ma5Prices
        },
        {
          title: 'MA10',
          prices: ma10Prices
        },
        {
          title: 'MA20',
          prices: ma20Prices
        }
      ],
      period: 0
    });
  },
  //this chart updating function failed to perform efficient enough to finish drawing within the refresh rate of touchmove function
  //will try drawing only the difference on CANVAS
  updateOHLC : function(startPosition) {
    console.log('update at: '+startPosition);
    var that = this;
    var data = [];
    var ohlcPrices = [];
    var volumes = [];
    var dates = [];
    var ma5Prices = [];
    var ma10Prices = [];
    var ma20Prices = [];
    data = that.data.kLine.result.detail_list.slice(startPosition, startPosition + that.data.dataCount);
    for (var i = 0, len = data.length; i < len; i++) {
      ohlcPrices.push({
        o: parseFloat(data[i].open_px),
        h: parseFloat(data[i].high_px),
        l: parseFloat(data[i].low_px),
        c: parseFloat(data[i].close_px)
      });
      volumes.push(parseFloat(data[i].business_amount));
      dates.push(data[i].min_time.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2'));
      ma5Prices.push(parseFloat(data[i].ma5));
      ma10Prices.push(parseFloat(data[i].ma10));
      ma20Prices.push(parseFloat(data[i].ma20));
    }
    stockChart.redraw({
        ctx : ctx,
        ohlcPrices : ohlcPrices,
        volumeHeight : 30,
        height : 180,
        width : that.data.canvasWidth,
        volumes : volumes,
        dataCount : 50
      });
  },
  animate : function(offset) {
    //STEPS:
    //1: copy previous actions array
    //2: truncate offscreen data points
    //3: concatenate difference data
    //4: calculate actions for new data
    //5: translate old actions
    //6: concate new and old actions array
    //7: draw()
    var that = this;
    stockChart.redrawAnimate({
      ctx: ctx,
      width : that.data.canvasWidth,
      dataCount : 50,
      offset : offset
    });
  },
  chartRedraw : function() {
    var that = this;
    var dataShift = Math.round(scrollLength / (that.data.canvasWidth / that.data.dataCount));
    startPosition = scrollPosition + dataShift;
    startPosition = startPosition < 0 ? 0 : startPosition;
    startPosition = startPosition > that.data.kLine.result.detail_list.length - that.data.dataCount ? 50 : startPosition;
    that.updateOHLC(startPosition);
  },
  touchStart : function(event) {
    var that = this;
    touchPosition = event.touches[0].x;
    anchorPoint = touchPosition;
  },
  touchMove : function(event) {
    var that = this;
    var offset = touchPosition - event.touches[0].x;
    offsetWatcher += offset;
    if(Math.abs(offsetWatcher) > (that.data.canvasWidth / 50)) {
      offsetWatcher = 0;
      reDraw = setTimeout(that.chartRedraw,0);
    } else {
      //that.animate(); to be implemented if smoother scrolling animation is needed
    }
    scrollLength  = anchorPoint - event.touches[0].x;
    //that.updateOHLC(offset);
    touchPosition = event.touches[0].x;
  },
  touchEnd : function(event) {
    var that = this;
    clearTimeout(reDraw);
    console.log('update should end');
    scrollLength = 0;
    scrollPosition = startPosition;
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var that = this;
    ctx = wx.createCanvasContext('kLine');
    try {
      var res = wx.getSystemInfoSync();
      that.setData({
        canvasWidth : res.windowWidth - 20,
        dataStartPosition : 50
      })
    } catch (e) {
      console.log('cant get system info');
    }
    that.initOHLC(50);
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    var that = this;
    /*
    setInterval(function() {
      var prev = that.data.kLine.result.detail_list[49].close_px;
      that.setData({
        'kLine.result.detail_list[49].close_px' : prev == 10.63 ? 10 : 10.63
      });
      that.initOHLC();
    }, 10000)
    */
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})