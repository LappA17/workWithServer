   window.addEventListener("DOMContentLoaded", () => {

    // ТЕПЕРЬ ОТПРАВЛЯЕМ formData + подключаем php сервер для его отправки
    // Так же подключаем MUMP
    
    const form = document.querySelector('form');

    function req(e) {
        e.preventDefault();

        let formData = new FormData(form);

        // Теперь fetch + formData

         /* getResource("./api.php", formData)
            .then(data => console.log(data))
            .catch(err => console.error(err)); */
        /* array(2) {
  ["name"]=>
  string(25) "Руслан Потоюк"
  ["age"]=>
  string(16) "fetch + formData"
} */


        // Тут axios + formData

       /* axios({ // все что написано ниже есть в документации axios
            method: "post",
            url: "./api.php",
            data: formData,
            headers:{"content-type": "multipart/form-data"} // тут можно протестировать заголовки, потому что на двух предыдущих не работали
        })
        .then(data => console.log(data.data)); */
        /* array(2) {
  ["name"]=>
  string(25) "Руслан Потоюк"
  ["age"]=>
  string(16) "axios + formData"
} */
    }

    form.addEventListener("submit", (e) => req(e), {"once": true}); 

    async function getResource(url, data) { 
        const res = await fetch(`${url}`, {
            method: "POST",
            body: data // просто data
        }); 

        if (!res.ok) { 
            throw new Error(`Coult not fetch ${url}, status: ${res.status}`);
        }

        return await res.text(); //с сервера приходит обычный текст. Метод text - это метод фетча, тоже промис возвращает
    }
});