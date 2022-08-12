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