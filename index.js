

// 表示させる要素と今日の日付をそれぞれ取得
let year = document.getElementById("year");
let month = document.getElementById("month");
let day = document.getElementById("day");
let hours = document.getElementById("hours");
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

// ２点間の直線距離で中心を出して、中心の半径○km内の店を出す
// 店を選んで、その店に紐づいた駅を出す

function initMap() {
    const geocoder = new google.maps.Geocoder;
    //　マップの初期設定.　中心やzoomを設定している
    const defaultSettings = {
        zoom: 15,
        center:
        {
            lat: 35.6811673,
            lng: 139.7670516
        }
    };
    const map = new google.maps.Map(
        // mapっていうidがついたdivに対して,マップを適用させている
        document.querySelector('#map'),
        defaultSettings
    );
}


// const API_KEY = '?key=0eaac536fc8a8837';
// const LAT = 35.6811673;
// const LNG = 139.7670516;

// let cback = function(data) {
// console.log('callback', data);
// };

// let script = document.createElement('script');
// script.src = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/'
// + API_KEY
// + '&lat=' + LAT
// + '&lng=' + LNG
// + '&range=5&format=jsonp&callback=cback';

// document.body.appendChild(script);

// function initMap() {
//     var opts = {
//         zoom: 15,
//         center: new google.maps.LatLng(35.709984,139.810703)
//     };
//     var map = new google.maps.Map(document.getElementById("map"), opts);
// }

// function initMap() {
//     var mapPosition = new google.maps.LatLng(35.6882495, 139.6856557);//緯度経度
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 17,//ズーム
//         center: mapPosition
//     });
// }

// function googleMap() {
//     var latlng = new google.maps.LatLng(35.90977599140045, 139.40254908920852);/* 座標を入れる */
//     var myOptions = {
//         zoom: 18, /*拡大比率 値が大きいと詳細に表示され、値が小さいと俯瞰*/
//         scrollwheel: false, /* スクロールを無効化 */
//         streetViewControl: false, /*ストリートビューを表示させない*/
//         center: latlng, /*表示枠内の中心を軸にする*/
//         mapTypeControlOptions: { mapTypeIds: ['style', google.maps.MapTypeId.ROADMAP] }/*表示タイプの指定*/
//     };
//     var gmap = new google.maps.Map(document.getElementById('map'), myOptions);
// }
