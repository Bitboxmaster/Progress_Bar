const CONTAINERS_COUNT = 5;
let currentContainerIndex = 0;
const lineNode = document.querySelector('.line');
const check = document.querySelector(".check");

// Функция для сброса прогресса
const onClickButton = () => {
    currentContainerIndex = 0;
    lineNode.style.setProperty('--progress', `0%`);
    check.style.visibility = "hidden"; // Скрыть кнопку после сброса

    // Сброс цветов текста и стилей
    document.querySelectorAll('.el-raw').forEach((el) => {
        el.style.color = 'darkslateblue'; // Исходный цвет текста
        el.style.fontWeight = 'normal'; // Исходный вес шрифта
    });
    document.querySelectorAll('.circle').forEach((circle) => {
        circle.style.backgroundColor = 'white'; // Исходный цвет фона круга
        circle.style.color = 'black'; // Исходный цвет текста внутри круга
    });
};

// Функция для обработки кликов на контейнерах
const onContainerClick = (index) => () => {
    const diff = Math.abs(index - currentContainerIndex);
    if (diff > 1) {
        return;
    }
    currentContainerIndex = index;
    lineNode.style.setProperty('--progress', `${(currentContainerIndex * 20)}%`);
    console.log(index, currentContainerIndex, diff);

    // Обновление цветов текста и стилей
    document.querySelectorAll('.el-raw').forEach((el, i) => {
        if (i < index) {
            el.style.color = 'darkblue'; // Цвет текста после клика
            el.style.fontWeight = 'normal'; // Жирный шрифт для предыдущих элементов ###
        } else {
            el.style.color = 'darkslateblue'; // Исходный цвет текста
            el.style.fontWeight = 'normal'; // Исходный вес шрифта
        }
    });

    // Обновление стилей кругов
    document.querySelectorAll('.circle').forEach((circle, i) => {
        if (i < index) {
            circle.style.backgroundColor = 'darkblue'; // Темный цвет фона круга
            circle.style.color = 'white'; // Белый цвет текста внутри круга
        } else {
            circle.style.backgroundColor = 'white'; // Исходный цвет фона круга
            circle.style.color = 'black'; // Исходный цвет текста внутри круга
        }
    });

    // Проверка, достигли ли мы последнего контейнера
    if (currentContainerIndex === CONTAINERS_COUNT) {
        check.style.visibility = "visible"; // Показать кнопку, если достигли последнего контейнера
    } else {
        check.style.visibility = "hidden"; // Скрыть кнопку, если не достигли
    }
};

// Добавление обработчиков событий на контейнеры
for (let i = 1; i <= CONTAINERS_COUNT; i++) {
    const candidate = document.querySelector(`.el-raw--${i}`);
    if (!candidate) {
        continue;
    }
    candidate.addEventListener("click", onContainerClick(i));
}

// Добавление обработчика события на кнопку сброса
check.addEventListener("click", onClickButton);

// Скрыть кнопку по умолчанию
check.style.visibility = "hidden";