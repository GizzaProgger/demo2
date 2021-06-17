export default () => {
    let sound = document.querySelectorAll("[data-play-sound]");
    sound.forEach(snd=>{
        // Функция click принимает на вход функцию
        // По этому ты не можешь вызвать ее так
        // snd.addEventListener('click', playSound(snd.getAttribute("data-play-sound")));
        // Получается, что при такой записи ты ее вызываешь и в addEventListener передаешь результат ее работы
        // А именно undefined т.к. она ничего не возращает
        snd.addEventListener('click', e => {
            e.preventDefault();
            playSound(snd.getAttribute("data-play-sound"))
        });
    });

    function playSound(url){
        let audio = new Audio(url);
        audio.play();
    }

    // Комменты не удаляй. Когда будем мержить, то удалим не нужное
    function playSoundFactory(uri) {
        return () => playSound(uri)
    }

    // playSoundFactory - это фабрика по производству функций.
    // Она возращает тебе функцию. По этому можно написать так
    // snd.addEventListener('click', playSound(snd.getAttribute("data-play-sound"));
    // В данном случае это бесполезно и даже путает, но иногда такой подход может быть полезен
}