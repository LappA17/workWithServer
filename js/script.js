   window.addEventListener("DOMContentLoaded", () => {

    // ТЕПЕРЬ ОТПРАВЛЯЕМ formData + подключаем php сервер для его отправки
    // Так же подключаем MUMP
    const form = document.querySelector('form');

    function req(e) {
        e.preventDefault();

        let formData = new FormData(form);
        
        /* Есть очень важное правило ! Когда я использую XMLHttpRequest плюс ФОРМДЕЙТУ никогда нельзя указывать заголовок, по этому я 
      request.setRequestHeader("Content-type", "multipart/form-data"); закомментирую потому что сервер сам автоматически его подставит
      И теперь после того как я подключил MUMP, в консоле мне выдало array(2) {
  ["name"]=>
  string(25) "Руслан Потоюк"
  ["age"]=>
  string(8) "php.test"
}  */
        const request = new XMLHttpRequest();
        request.open("POST", "./api.php");  // тут уже php, а не локальный сервер с терминала

        // request.setRequestHeader("Content-type", "multipart/form-data"); // из документации, таким образом сервер поймет что я присылаю

        request.send(formData); // тут формдейту отправляем

        request.addEventListener("load", function() {
            if (request.status == 200) {
                console.log(request.response); // уже не нужно парсить джсон объект, а просто выводим в консоль ответ сервера
            } else {
                console.error("Что-то пошло не так");
            }
        });  
    }

    form.addEventListener("submit", (e) => req(e), {"once": true}); 

    async function getResource(url, data) { 
        const res = await fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json" 
            },
            body: JSON.stringify(data)
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