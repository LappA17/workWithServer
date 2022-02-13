// Все происходит на MUMP + прописал json-server db.json

window.addEventListener("DOMContentLoaded", () => {

    const body = document.querySelector('body');
    
    //сохраним данные с перебора
    let textNodes = [];

    function recursy(element) { // Нам нужно пройтись по бади до самых первых нод благодаря рекурсии. element - это бади
        element.childNodes.forEach(node => { // получаем детей бади в виде массива

            /* Если элемент будет иметь больше одного потомка, то мы запускаем фцию заново, только с той нодой с перебора.
К примеру у нас есть сексция => в ней див контейнер => в контейнере хедер и еще див => и так далее до самого-самого конца
пока не натлокнеться на какуе-то текстовую ноду, те нужно дойти до последней ноды где нет потомка */
            // ^ это начало строки, H - заголовок, d - какая-то цифра потому заголовки имеют цифры
            if (node.nodeName.match(/^H\d/)) {
                const obj = {
                    header: node.nodeName, // я хочу знать из какого именно заголовка пришел этот текст
                    content: node.textContent
                };
                textNodes.push(obj); // все что внутри заголовка попадет в массив
            } else { // пока нода не найдена рекурсия дальше ее ищет
                recursy(node);
            }
        });
    }
    
    recursy(body);

    // Теперь нам необходимо отправить этот объект
    fetch("http://localhost:3000/people", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(textNodes)
    })
    .then(response => response.json())
    .then(json => console.log(json));
    
}); 
/* (4) [{…}, {…}, {…}, {…}]
0: {header: 'H1', content: 'Заголовок 1'}
1: {header: 'H1', content: 'Заголовок 2'}
2: {header: 'H2', content: 'Заголовок поменьше 2'}
3: {header: 'H2', content: 'Заголовок поменьше 2'}
length: 4
[[Prototype]]: Array(0) */
/*  Я на своей index.html создал текст, пару заголовков и блок с текстом без заголовка, и в консоль получил массив с 
объектами, это значит что код работает и возвращает мне в виде промиса мой массив. 
    Этот код можно вставить прям на любом сайте в браузере и в консоле мне вернет все заголовки на сайте :) */