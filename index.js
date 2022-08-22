

if (typeof document !== 'undefined') {
// 表示させる要素と今日の日付をそれぞれ取得
    let year = document.getElementById("year");
    let month = document.getElementById("month");
    let day = document.getElementById("day");
    let hours = document.getElementById("hours");
    if (typeof thisyear !== 'undefined') {
        const date = new Date();
        const thisYear = date.getFullYear();
        // 年のセレクトボックスのoptionを生成
    for (let i = 1930; i <= thisYear; i++) {
        let option = document.createElement("option");
        option.setAttribute("value", i);
        option.innerHTML = i + "年";
        year.appendChild(option);
        if (option.value == thisYear) {   //値が今年だったら
            option.setAttribute("selected", true);    // selectedの属性を付与
        }
    }
    // 月のセレクトボックスのoptionを生成
    for (let i = 1; i <= 12; i++) {
        let option = document.createElement("option");
        option.setAttribute("value", i);
        option.innerHTML = i + "月";
        month.appendChild(option);
        if (option.value == date.getMonth() + 1) {  //値が今月だったら、「+1」 をお忘れなく
            option.setAttribute("selected", true);    // selectedの属性を付与
        }
    } 
    // 日のセレクトボックスのoptionを生成
    for (let i = 1; i <= 31; i++) {
        let option = document.createElement("option");
        option.setAttribute("value", i);
        option.innerHTML = i + "日";
        day.appendChild(option);
        if (option.value == date.getDate()) {       //値が今日だったら
            option.setAttribute("selected", true);    // selectedの属性を付与
        }
    }
    // 時のセレクトボックスのoptionを作成
    for (let i = 1; i <= 24; i++) {
        let option = document.createElement("option");
    option.setAttribute("value", i);
    option.innerHTML = i + "時";
    hours.appendChild(option);
    if (option.value == date.getHours()) {
        option.setAttribute("selected", true)
    }
    }
    for (let i = 00; i <= 59; i++) {
        let option = document.createElement("option");
        option.setAttribute("value", i);
        option.innerHTML = i + "分";
        minuts.appendChild(option);
        if (option.value == date.getMinutes()) {
            option.setAttribute("selected", true)
        }
    }
}
}

// function initMap() {
    //     const geocoder = new google.maps.Geocoder;
    //     //　マップの初期設定.　中心やzoomを設定している
//     const defaultSettings = {
//         zoom: 15,
//         center:
//         {
//             lat: 35.6811673,
//             lng: 139.7670516
//         }
//     };
//     const map = new google.maps.Map(
//         // mapっていうidがついたdivに対して,マップを適用させている
//         document.querySelector('#map'),
//         defaultSettings
//     );
// }

// ２点間の直線距離で中心を出して、中心の半径○km内の店を出す
// 店を選んで、その店に紐づいた駅を出す
    let directionsService;
    let directionsRenderer;
    let distanceMatrixservice;
    let map;

    let userLatLng = [];

    // ユーザーが入力した住所から緯度経度を取得
    function getInputAddress() {
        getLatLng(document.getElementById('place1').value);
        getLatLng(document.getElementById('place2').value);
        setTimeout(drowRoute, 1000);
    }

    // グローバル変数にpush
    // 使い回す変数だからグローバルにいれてる
    // 別関数から参照したい
    function workLatLng(latLng) {
        userLatLng.push(latLng);
    }
    // ユーザーの入力した住所を緯度経度に変えてる
    // 見つからなかったらエラー表示
    function getLatLng(inputAddress) {
        let geocoder = new google.maps.Geocoder();

        geocoder.geocode({
                address: inputAddress,
            },
            function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    for (let i in results) {
                        if (results[i].geometry) {
                            workLatLng([results[i].geometry.location.lat(), results[i].geometry.location.lng()]);
                        }
                    }
                } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                    alert("住所が見つかりませんでした。");
                } else if (status === google.maps.GeocoderStatus.ERROR) {
                    alert("サーバ接続に失敗しました。");
                } else if (status === google.maps.GeocoderStatus.INVALID_REQUEST) {
                    alert("リクエストが無効でした。");
                } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                    alert("リクエストの制限回数を超えました。");
                } else if (status === google.maps.GeocoderStatus.REQUEST_DENIED) {
                    alert("サービスが使えない状態でした。");
                } else if (status === google.maps.GeocoderStatus.UNKNOWN_ERROR) {
                    alert("原因不明のエラーが発生しました。");
                }
            });
    }
    // ユーザーが入力した２点間を線で結んで、線の中心を計算
    function drowRoute() {
        const center = {lat: userLatLng[0][0], lng: userLatLng[0][1]};
        const options = {zoom: 15, scaleControl: true, center: center};
        map = new google.maps.Map(
            document.getElementById('map'), options);

        const position1 = {lat: userLatLng[0][0], lng: userLatLng[0][1]};
        const position2 = {lat: userLatLng[1][0], lng: userLatLng[1][1]};
        const centerPosition = {lat: (userLatLng[0][0]  + userLatLng[1][0]) / 2, lng: (userLatLng[0][1]  + userLatLng[1][1]) / 2};

        const mk1 = new google.maps.Marker({position: position1, map: map});
        const mk2 = new google.maps.Marker({position: position2, map: map});
        new google.maps.Marker({position: centerPosition, map: map});

        const distance = haversineDistance(mk1, mk2);
        console.log("Distance between positions: " + distance.toFixed(2) + " km. half-> " + (distance.toFixed(2) / 2 + "km"));

        const popylinePath = new google.maps.Polyline({path: [position1, position2], map: map});
        console.log(popylinePath.getPath());
    }

    // map初期化
    // 一番最初に走るメソッド。　初期のやつ
    // APIキーの最後でコールバックを指定してる
    function initMap() {
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
        distanceMatrixservice = new google.maps.DistanceMatrixService();

        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 16,
            center: { lat: 35.6812405, lng: 139.7649361 },
        });

        directionsRenderer.setMap(map);

        directionsRenderer.setOptions({
            preserveViewport: true,
        });
    }
    // 出発地点と到着地点の距離を計算してる
    function haversineDistance(mk1, mk2) {
        const R = 6371.071;
        const rlat1 = mk1.position.lat() * (Math.PI/180);
        const rlat2 = mk2.position.lat() * (Math.PI/180);
        const difflat = rlat2-rlat1;
        const difflon = (mk2.position.lng()-mk1.position.lng())
            * (Math.PI/180);

        return 2 * R
            * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2)
                + Math.cos(rlat1) * Math.cos(rlat2)
                * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    }


    // 中間地点周辺のお店をホットペッパーから抽出して出す

/** リクルートWEBサービスのAPIキー */
// const RECRUIT_API_KEY "?key=0eaac536fc8a8837"
// /** グルメサーチAPI名 */
// const HOT_PEPPER_01_GOURMET = '01.gourmet';
// $gourmet_api = new HotPepperAPI(RECRUIT_API_KEY, HOT_PEPPER_01_GOURMET);
// $params = [
//     'count' = PER_PAGE_COUNT,
//     'type' = 'lite',
//     'format' = 'json',

// const API_KEY = '?key=0eaac536fc8a8837';
// const LAT = 34.6850514;
// const LNG = 135.840818;

// let cback = function(data) {
// console.log('callback', data);
// };

// let script = document.createElement('script');
// script.src = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key='
// + API_KEY
// + '&lat=' + LAT
// + '&lng=' + LNG
// + '&range=5&format=jsonp&callback=cback';

// document.body.appendChild(script);

// function addresAcquisition(centerPosition) {
//     console.log
// }

// https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
// https://groups.google.com/g/google-maps-js-api-v3/c/5rbaLFzY0Vw
// https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline.getEditable
// https://qiita.com/masuda-sankosc/items/9e8cf167b2e57a347ea7
// https://chayarokurokuro.hatenablog.com/entry/2021/07/30/074506

// fsモジュールを使用して、node.jsでHTMLファイルを表示する
const httpp = require('http');
const module_fs = require('fs');

var server = httpp.createServer(
    (request,response)=>{
        module_fs.readFile('./index.html','UTF-8',(error,data)=>{
            response.writeHead(200, {'Content-Type':'text/html'});
            response.write(data);
            response.end();
        })
    }
);
server.listen(3000);

// ルーティング
const http = require('http');
const fs = require('fs');
const moment = require('moment');
const url = require('url');

moment.locale('ja');
let datetoday = moment().format('LL');

const index = fs.readFileSync('./index.js','utf8');
const style_css =fs.readFileSync('./style.css','utf8');

var server = http.createServer(getFromClient);
server.listen(3000);
console.log('Server start!');
console.log(datetoday);

function getFromClient(req,res){
        
        var url_parts = url.parse(req.url);
        console.log(url_parts)
        switch(url_parts.pathname){
                
                case '/':
                        var content = js.render(index,{
                                title:'nominabi',
                                today:datetoday,        
                        });
                        res.writeHead(200, {'Content-Type':'text/html'});
                        res.write(content);
                        res.end();
                        break;
                case 'css/style.css':
                        res.writeHead(200, {'Content-Type':'text/css'});
                        res.write(style_css);
                        res.end();
                        break;
                default:
                        res.writeHead(404, {'Content-Type':'text/plain'});
                        res.end('no page...');
                        break;
        }
}