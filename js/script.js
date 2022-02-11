   window.addEventListener("DOMContentLoaded", () => {

/* В ЭТОМ УРОКЕ МЫ РАЗБЕРЕМ fetch ПОТОМУ ЧТО НЕ БУДЕТ КОЛЛБЕК ХЕЛЛА КАК В ПРЕДЫДУЩЕМ УРОКЕ + КОД БУДЕТ ПООПРЯТНЕЙ
   ЕСЛИ ВЫБИРАТЬ МЕЖДУ ФЕТЧЕМ и XMLHttpRequest то FETCH лучше всего !
   Но между фетчем и axios нужно по ситуации, потому что фетч удобней, а у axios больше возможностей(например отмена запроса,
    трансформация элементов в автоматическом режиме) */

    function req() {
        // Переходим к fetch и код ниже закомментирует потому что в будущем понадобиться в пост запросах
        /* const request = new XMLHttpRequest();
        request.open("GET", "http://localhost:3000/people"); 

        request.setRequestHeader("Content-type", "application/json; charset=utf-8");

        request.send();

        request.addEventListener("load", function() {
            if (request.status == 200) {
                let data = JSON.parse(request.response); // приобразоваем json данные в javascript объект
                console.log(data);
                createCards(data); // и помещаем внутрь данные от сервера

            } else {
                console.error("Что-то пошло не так");
            }
        }); */ 

        // идет get запрос по данному адресу
        getResource("http://localhost:3000/people") // вернется промис который можно обрабодать с помощью then
            .then(data => createCards(data)) /* data.json() - вернет нам промис который мы дальше в then обработаем.
Дата.джсон нам нужно что бы сделать с джсон данные джаваскриптовые. Теперь подставили createCards(data)
как здесь let data = JSON.parse(request.response); // приобразоваем json данные в javascript объект*/

            .then(data => console.log(err)) // и уже в этом промисе вернуться обычные данные в формате джаваскрипта а не джсон
/* Теперь после того как мы написали второй then и для теста вывели в консоль данные .then(data => console.log(data)
  мне в консоли после клика пришел массив со всеми данным с db.json */

            .catch(err => console.error(err));
        this.remove();
    }

    document.querySelector("button").addEventListener("click", req, {"once": true}); 

    async function getResource(url) { // url - куда мы будем делать запрос
        const res = await fetch(`${url}`); /* во внутрь передаем тот url который нужно зафетчить. Теперь вместо банального фетча можно вызывать
фцию getResource */

        if (!res.ok) { // внутри фетча у респонс(ответа) появляется свойсвто окей
            throw new Error(`Coult not fetch ${url}, status: ${res.status}`) // вручную статус показываем ${res.status}
        }

        return await res.json(); // здесь тоже промис по этому await
/* Помни что фетч возвращает промис, но он асинхроный как И ЛЮБАЯ ОПЕРАЦИЯ ПО РАБОТЕ С СЕРВЕРОМ(он не может сразу дать ответ) */
/* Теперь берем фцию getResource и подставляем вместо фетча fetch("http://localhost:3000/people"), ПОТОМУ ЧТО ГЕТРЕСУРС ВОЗВРАЩАЕТ
НАМ НОРМАЛЬНЫЙ ОБЫЧНЫЙ ОБЪЕКТ, МЫ ЕГО ЗАПИСЫВАЕМ В data и дейта можем спокойно использовать */
    }

    // Теперь разберем Axios

    getResource("http://localhost:3000/people") 
            .then(data => createCards(data.data)) /* Axios действительне вернет нам объект, и там будет намного больше данных, к примеру
там будут конфиги, заголовки. Но нас интересует data, по этому вместо того что бы просто прописыывать createCards(data), нужно 
поставить точку и еще раз прописать data */ 
            .then(data => console.log(err))
            .catch(err => console.error(err));

        this.remove();
    }
    async function getResource(url) { 
        const res = await axios(`${url}`); 
        if (res.status !== 200) { 
            throw new Error(`Coult not fetch ${url}, status: ${res.status}`);
        }

        return res; // Библиотека Axios автоматом конвертирует в объект из джсона
    }

    // Оптимизируем код
    function createCards (response) {
        response.forEach(item => {
            let card = document.createElement('div');

            card.classList.add("card"); 

            let icon;
            if (item.sex === "male") {
                icon = "icons/mars.png";
            } else {
                icon = "icons/female.png";
            } 

            card.innerHTML = `
                <img src="${item.photo}" alt="photo"
                <div class="name"${item.name} ${item.surname}</div>
                <div class="sex">
                    <img src=${icon} alt="male">
                </div>
                <div class="age">${item.age}</div>
            `; 
            document.querySelector('.app').appendChild(card); 
        });
    }
});