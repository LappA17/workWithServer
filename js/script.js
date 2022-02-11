   window.addEventListener("DOMContentLoaded", () => {

    // Теперь работаем с методом POST(отправка данных на сервер/ те данные прийдут в db.json + с помощью php отправит formData)

/* Создадим кнопку submit в форме и ВСЕГДА ЕСЛИ Я ПРЕДПОЛОГАЮ ЧТО С МОИМИ ИНПУТАМИ БУДЕТ КАКОЕ-ТО СЕРВЕРНОЕ ВЗАИМОДЕЙСТВИЕ - ТО ВСЕГДА
НАЗНАЧАТЬ АТРИБУТ name, по нему идет ориентация, без него сервер не будет работать */

    const form = document.querySelector('form');

    function req(e) {
        e.preventDefault();

        // Теперь получаем данные из form 
        let formData = new FormData(form); // во внутрь помещаем ту форму которую мы хотим получить
        formData.append("id", Math.random()); // Помни что json всегда просит id, а math.random - его значение
/* При создание объекта который мы будем постить на наш сервер json сервер обязательно требует что бы у нашего объекта 
который мы присылаем на сервер был ID !  */
        
        // Но мы не можем просто так взять и превратить формДейта в дсон объект, let json = JSON.stringify(formData) не сработает
        let obj = {};
        formData.forEach((value, key) => {
            // Расскрываем эту коллбек фцию и говорим что я буду заполнять мой новый объект вот таким вот образом
            obj[key] = value; // Таким образом obj будет заполнен всем тем что было внутри formData
        });
        // let json = JSON.stringify(obj); 
        /* {
            "name": "Руслан Потоюк",
            "age": "38099",
            "id": "0.13823632680258857"
          } Теперь те данные которые я ввел в инпут вернутьс нам в db.json
    То-есть сначало нужно получить форму с которой будем работать с html const form = document.querySelector('form');
    Дальше навесить обработчик события submit и передать объект события. Отменяем станд повед браузера 
    Дальше при помощи объекта formData мы получаем все данные из определенной формы new FormData(form)
    Добавляем уникальный айди(если сервер требует это)
    Дальше что бы наш formData сформировать в виде json мы провели мохинацию с obj, создаем пустой объект и при помощи forEach перекладываем
в него все значения и потом самый обычный объект трасформируем при помощи джсон стрингифай и потом именно этот json как переменую
мы отправляем на сервер request.send(json); */


        /* ЗАКОММЕНТИРУЕМ ПОТОМУ ЧТО В СЕРЕДИНЕ УРОКА ВАНЯ ПОКАЖЕТ КАК С ПОМОЩЬЮ fetch и axios сделать тоже самое !
        const request = new XMLHttpRequest();
        request.open("POST", "http://localhost:3000/people"); 

        request.setRequestHeader("Content-type", "application/json; charset=utf-8");

        request.send(json); // говорим то что хоти отправить

        request.addEventListener("load", function() {
            if (request.status == 200) {
                let data = JSON.parse(request.response); // приобразоваем json данные в javascript объект
                console.log(data);
                // createCards(data); // и помещаем внутрь данные от сервера

            } else {
                console.error("Что-то пошло не так");
            }
        });  */

        /*в getResource после url, нужно передать объект который нам нужно превратить в json, 
те эту строчку которую мы создали в начали МЫ ИГНОРИУРЕМ let json = JSON.stringify(obj); Мы эту операцию делаем в настройках в fetch*/ 
         /*getResource("http://localhost:3000/people",  obj)
            .then(data => createCards(data)) 
            .catch(err => console.error(err)); */
/* И все работает {
      "name": "fetch test",
      "age": "test fetch",
      "id": "0.44254062065929234"
    } */

        axios.post("http://localhost:3000/people",  obj); /* {
            "name": "Русла axios",
            "age": "38099",
            "id": "0.9325442333885843"
          } 
        ИЗ ПРОШЛОГО КОММИТА С ФЕТЧЕМ Я ПРОСТО ЗАКОММЕНТИРОВАЛ ТО ЧТО ВЫШЕ И ПРОПИСАЛ ВОТ ЭТУ КОММАНДУ И ПОЛУЧИЛОСЬ СДЕЛАТЬ ПОСТ ЗАПРОС */
    }

    // Нужно сказать что событие будет происходить на форме и событие сабмит
    form.addEventListener("submit", (e) => req(e), {"once": true}); /* Создадим стрелочную фцию которая
в свою очередь будет вызывать нашу фцию. Из-за того что мы отправляем форму нам нужно отменить стандартное поведение браузера с перезагрузкой */


    // Post запрос через fetch
    async function getResource(url, data) { 
        const res = await fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json" // Так как мы отправляем json то заголовок такой, и двоеточие потому что это объект
            },
            body: JSON.stringify(data) //body - это что мы будем отправлять. data - данные которые нужно отправить, в джсон объекте
        }); 

        if (!res.ok) { 
            throw new Error(`Coult not fetch ${url}, status: ${res.status}`);
        }

        return await res.json(); 
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