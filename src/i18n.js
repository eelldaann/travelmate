export const languages = ["en", "ru", "kz"];

export const translations = {
    en: {
        nav: {
            home: "Home",
            tours: "Tours",
            howItWorks: "How it works",
            login: "Log in",
            register: "Sign up",
            admin: {
                main: "Admin Panel",
                tours: "Tours",
                orders: "Orders",
            },
            logout: "Log out"
        },

        home: {
            badge: "Kazakhstan tours",
            title: "Plan your next vacation across Kazakhstan",
            description:
                "TravelMate helps you build a custom route across Kazakhstan: canyons, lakes, dunes and cities.",
            moodLabel: "Mood",
            moods: {
                relax: "relax",
                adventure: "adventure",
                culture: "culture",
            },
            budgetLabel: "Budget",
            budgetOptions: {
                economy: "Economy (hostels, trains)",
                comfort: "Comfort (3–4★ hotels)",
                premium: "Premium (5★ & private)",
            },
            datesLabel: "Dates",
            datesPlaceholder: "Anytime in 2025",
            travelersLabel: "Travelers",
            buildButton: "Build itinerary",
            helperText:
                "We combine canyons, alpine lakes, dunes and heritage cities into one balanced route.",
            signatureTitle: "Signature destinations",
            signatureSubtitle:
                "All locations are in Kazakhstan. Photos are real places you can visit with us.",
            signatureCta: "See all tours",
            cards: {
                0: {
                    title: "Charyn Canyon",
                    tag: "Adventure • 2 days from Almaty",
                    desc: "Mini-Grand Canyon of Kazakhstan with orange cliffs, sunset views and easy hiking.",
                },
                1: {
                    title: "Kolsai & Kaindy Lakes",
                    tag: "Nature • 2–3 days",
                    desc: "Glassy alpine lakes, spruce forests and the surreal flooded forest of Kaindy.",
                },
                2: {
                    title: "Astana & Nur-Sultan skyline",
                    tag: "City • 1–2 days",
                    desc: "Futuristic capital with modern architecture, museums and river promenades.",
                },
            },
            heroPrice: 620,
            heroPriceFrom: "from",
            heroPricePerPerson: "/ person",
        },

        tours: {
            badge: "Catalog",
            title: "Tours across Kazakhstan",
            description: "",
            previewButton: "Send request",
        },

        howItWorks: {
            badge: "Process",
            title: "How TravelMate works",
            description:
                "",
            steps: {
                0: {
                    num: "01",
                    title: "Tell us how you travel",
                    text: "You share basic info: dates, budget range, number of people and your travel style.",
                },
                1: {
                    num: "02",
                    title: "We design several routes",
                    text: "We mix canyons, lakes, dunes and cities into 2–3 balanced itineraries with different pace.",
                },
                2: {
                    num: "03",
                    title: "You approve details",
                    text: "You pick the option you like, we fine-tune hotels, transport and activities together.",
                },
                3: {
                    num: "04",
                    title: "We book & support",
                    text: "We handle bookings, transfers and stay in touch while you travel across Kazakhstan.",
                },
            },
            extrasTitle: "What you get:",
            extrasList: [
                "One clear contact point for all questions before and during trip.",
                "Transparent program with distances, times and difficulty level.",
                "Support in Russian/English (and local contacts for drivers/guides).",
            ],
        },

        login: {
            badge: "Sign in",
            title: "Log in to TravelMate",
            description: "",
            emailLabel: "Email",
            passwordLabel: "Password",
            submit: "Log in",
            noAccount: "No account yet?",
            toRegister: "Sign up",
        },

        register: {
            badge: "Sign up",
            title: "Create an account",
            description: "",
            firstName: "First name",
            lastName: "Last name",
            emailLabel: "Email",
            passwordLabel: "Password",
            submit: "Sign up",
            hasAccount: "Already have an account?",
            toLogin: "Log in",
        },

        confirm: {
            badge: "Sign up",
            title: "Confirm your registration",
            description: "Open your email and confirm your registration.",
        },

        account: {
            badge: "Profile",
            title: "My account",
            description:
                "",
            preferredStyleLabel: "Preferred style",
            preferredStyleValue: "Relax + light hiking",
            homeCityLabel: "Home city",
            homeCityValue: "Almaty, Kazakhstan",
            tripsTitle: "Planned trips (demo)",
            tripsAdd: "Add new",
            tripsEmpty: "No trips yet. When you create an itinerary, it will appear here.",
            trips: {
                0: {
                    title: "Demo: Almaty – Kolsai & Charyn",
                    dates: "15–19 July 2025",
                    status: "Draft",
                },
                1: {
                    title: "Demo: Mangystau — Bozzhyra",
                    dates: "01–06 September 2025",
                    status: "Idea",
                },
            },
        },

        footer: {
            terms: "Terms",
            privacy: "Privacy",
            company: "TravelMate — Kazakhstan Tours",
        },


        admin: {
            common: {
                checkingAccess: "Checking access…",
                accessDeniedTitle: "Access denied",
                accessDeniedText:
                    "This page is only available to administrators. Log in with an admin account or contact the site owner.",
            },
            tours: {
                pageTitle: "Tours",
                loadError: "Failed to load tours",
                listTitle: "Tours list",
                newTourButton: "+ New tour",
                loading: "Loading tours...",
                empty: "No tours yet.",
                daysShort: "days",
                deleteButton: "Delete",
                deleteConfirm: "Delete this tour?",
                error: {
                    uploadImage: "Image upload error",
                    saveTour: "Failed to save tour",
                    deleteTour: "Failed to delete tour",
                    generic: "Error",
                },
                form: {
                    editTitle: "Edit tour",
                    newTitle: "New tour",
                    clearForm: "Clear form",
                    imageLabel: "Image (jpg, png)",
                    currentImage: "Current file:",
                    priceLabel: "Price, USD",
                    daysLabel: "Days",
                    nameLabel: "Title",
                    taglineLabel: "Tagline",
                    shortDescLabel: "Short description",
                    moodLabel: "Mood tags (comma-separated)",
                    moodHint: "Use values: relax, adventure, culture",
                    budgetLabel: "Budget",
                    submit: {
                        saving: "Saving...",
                        edit: "Save changes",
                        create: "Create tour",
                    },
                    cancelEdit: "Cancel editing",
                    examples: {
                        titleRu: "Charyn Canyon (RU)",
                        titleEn: "Charyn Canyon",
                        titleKz: "Sharyn Canyon (KZ)",
                        taglineRu: "Adventure • 2 days from Almaty (RU)",
                        taglineEn: "Adventure • 2 days from Almaty",
                        taglineKz: "Overview • 2 days from Almaty (KZ)",
                    },
                },
            },
            orders: {
                pageTitle: "Tour requests",
                pageSubtitle: "All tour requests submitted by users.",
                loadError: "Failed to load requests",
                loading: "Loading requests…",
                empty: "No requests yet.",
                table: {
                    id: "ID",
                    date: "Date",
                    tour: "Tour",
                    user: "User (user_id)",
                },
            },
        },

    },

    ru: {
        nav: {
            home: "Главная",
            tours: "Туры",
            howItWorks: "Как это работает",
            login: "Войти",
            register: "Регистрация",
            admin: {
                main: "Админка",
                tours: "Туры",
                orders: "Заявки"
            },
            logout: "Выход"
        },

        home: {
            badge: "Туры по Казахстану",
            title: "Спланируйте своё путешествие по Казахстану",
            description:
                "TravelMate помогает собрать индивидуальный маршрут по Казахстану: каньоны, озёра, дюны и города.",
            moodLabel: "Настроение",
            moods: {
                relax: "отдых",
                adventure: "экстрим",
                culture: "культура",
            },
            budgetLabel: "Бюджет",
            budgetOptions: {
                economy: "Эконом (хостелы, поезда)",
                comfort: "Комфорт (3–4★ отели)",
                premium: "Премиум (5★ и приват)",
            },
            datesLabel: "Даты",
            datesPlaceholder: "В любое время 2025",
            travelersLabel: "Путешественники",
            buildButton: "Построить маршрут",
            helperText:
                "Мы комбинируем каньоны, горные озёра, дюны и города наследия в один сбалансированный маршрут.",
            signatureTitle: "Ключевые направления",
            signatureSubtitle:
                "Все локации в Казахстане. На фотографиях реальные места, куда можно поехать с нами.",
            signatureCta: "Смотреть все туры",
            cards: {
                0: {
                    title: "Чарынский каньон",
                    tag: "Приключения • 2 дня из Алматы",
                    desc: "«Мини-Гранд Каньон» Казахстана с рыжими скалами, закатами и лёгким трекингом.",
                },
                1: {
                    title: "Озёра Кольсай и Каинды",
                    tag: "Природа • 2–3 дня",
                    desc: "Горные озёра, еловые леса и затопленный лес Каинды с кронами над водой.",
                },
                2: {
                    title: "Астана",
                    tag: "Город • 1–2 дня",
                    desc: "Современная столица с футуристической архитектурой, музеями и набережной.",
                },
            },
            heroPrice: 620,
            heroPriceFrom: "от",
            heroPricePerPerson: "/ человек",
        },

        tours: {
            badge: "Каталог",
            title: "Туры по Казахстану",
            description: "",
            previewButton: "Оставить заявку",
        },

        howItWorks: {
            badge: "Процесс",
            title: "Как работает TravelMate",
            description:
                "",
            steps: {
                0: {
                    num: "01",
                    title: "Вы рассказываете как путешествуете",
                    text: "Делитесь датами, примерным бюджетом, количеством людей и стилем отдыха.",
                },
                1: {
                    num: "02",
                    title: "Мы собираем несколько маршрутов",
                    text: "Комбинируем каньоны, озёра, дюны и города в 2–3 варианта с разным темпом.",
                },
                2: {
                    num: "03",
                    title: "Вы утверждаете детали",
                    text: "Выбираете вариант, мы донастраиваем отели, транспорт и активности.",
                },
                3: {
                    num: "04",
                    title: "Мы бронируем и поддерживаем",
                    text: "Берём на себя бронирования, трансферы и остаёмся на связи во время поездки.",
                },
            },
            extrasTitle: "Что вы получаете:",
            extrasList: [
                "Один понятный контакт по всем вопросам до и во время поездки.",
                "Прозрачная программа с расстояниями, временем в дороге и уровнем нагрузки.",
                "Поддержка на русском/английском и местные контакты гидов/водителей.",
            ],
        },

        login: {
            badge: "Вход",
            title: "Вход в TravelMate",
            description:
                "",
            emailLabel: "Email",
            passwordLabel: "Пароль",
            submit: "Войти",
            noAccount: "Ещё нет аккаунта?",
            toRegister: "Зарегистрироваться",
        },

        register: {
            badge: "Регистрация",
            title: "Создать аккаунт",
            description: "",
            firstName: "Имя",
            lastName: "Фамилия",
            emailLabel: "Email",
            passwordLabel: "Пароль",
            submit: "Зарегистрироваться",
            hasAccount: "Уже есть аккаунт?",
            toLogin: "Войти",
        },

        confirm: {
            badge: "Регистрация",
            title: "Подтвердите создание аккаунта",
            description: "Откройте свою почту и подтвердите регистрацию.",
        },

        account: {
            badge: "Профиль",
            title: "Мой аккаунт",
            description:
                "",
            preferredStyleLabel: "Предпочтительный стиль",
            preferredStyleValue: "Отдых + лёгкий трекинг",
            homeCityLabel: "Город",
            homeCityValue: "Алматы, Казахстан",
            tripsTitle: "Запланированные поездки (демо)",
            tripsAdd: "Добавить",
            tripsEmpty:
                "Пока поездок нет. Когда вы создадите маршрут, он появится здесь.",
            trips: {
                0: {
                    title: "Демо: Алматы – Кольсай и Чарын",
                    dates: "15–19 июля 2025",
                    status: "Черновик",
                },
                1: {
                    title: "Демо: Мангистау — Бозжыра",
                    dates: "01–06 сентября 2025",
                    status: "Идея",
                },
            },
        },

        footer: {
            terms: "Условия",
            privacy: "Конфиденциальность",
            company: "TravelMate — туры по Казахстану",
        },


        admin: {
            common: {
                checkingAccess: "Проверка доступа…",
                accessDeniedTitle: "Доступ запрещён",
                accessDeniedText:
                    "Эта страница доступна только администраторам. Войдите под админ-аккаунтом или обратитесь к владельцу сайта.",
            },
            tours: {
                pageTitle: "Туры",
                loadError: "Не удалось загрузить туры",
                listTitle: "Список туров",
                newTourButton: "+ Новый тур",
                loading: "Загрузка туров...",
                empty: "Туров пока нет.",
                daysShort: "дн",
                deleteButton: "Удалить",
                deleteConfirm: "Удалить этот тур?",
                error: {
                    uploadImage: "Ошибка загрузки картинки",
                    saveTour: "Ошибка сохранения тура",
                    deleteTour: "Не удалось удалить тур",
                    generic: "Ошибка",
                },
                form: {
                    editTitle: "Редактировать тур",
                    newTitle: "Новый тур",
                    clearForm: "Очистить форму",
                    imageLabel: "Картинка (jpg, png)",
                    currentImage: "Текущий файл:",
                    priceLabel: "Цена, USD",
                    daysLabel: "Дней",
                    nameLabel: "Название",
                    taglineLabel: "Подзаголовок (tagline)",
                    shortDescLabel: "Короткое описание",
                    moodLabel: "Теги настроения (через запятую)",
                    moodHint: "Используй значения: relax, adventure, culture",
                    budgetLabel: "Бюджет",
                    submit: {
                        saving: "Сохранение...",
                        edit: "Сохранить изменения",
                        create: "Создать тур",
                    },
                    cancelEdit: "Отменить редактирование",
                    examples: {
                        titleRu: "Шарынский каньон",
                        titleEn: "Charyn Canyon",
                        titleKz: "Шарын шатқалы",
                        taglineRu: "Приключение • 2 дня из Алматы",
                        taglineEn: "Adventure • 2 days from Almaty",
                        taglineKz: "Шолу • Алматыдан 2 күн",
                    },
                },
            },
            orders: {
                pageTitle: "Заявки на туры",
                pageSubtitle:
                    "Здесь отображаются все заявки, которые оставили пользователи.",
                loadError: "Не удалось загрузить заявки",
                loading: "Загрузка заявок…",
                empty: "Пока нет ни одной заявки.",
                table: {
                    id: "ID",
                    date: "Дата",
                    tour: "Тур",
                    user: "Пользователь (user_id)",
                },
            },
        },
    },

    kz: {
        nav: {
            home: "Басты бет",
            tours: "Турлар",
            howItWorks: "Қалай жұмыс істейді",
            login: "Кіру",
            register: "Тіркелу",
            admin: {
                main: "Әкім панелі",
                tours: "Турлар",
                orders: "Өтініштер"
            },
            logout: "Шығу"
        },

        home: {
            badge: "Қазақстан турлары",
            title: "Келесі саяхатыңызды Қазақстанда жоспарлаңыз",
            description:
                "TravelMate сізге каньондар, көлдер, құм төбелер мен қалаларды біріктіріп жеке маршрут жасауға көмектеседі.",
            moodLabel: "Көңіл-күй",
            moods: {
                relax: "демалыс",
                adventure: "экстрим",
                culture: "мәдениет",
            },
            budgetLabel: "Бюджет",
            budgetOptions: {
                economy: "Эконом (хостел, поезд)",
                comfort: "Комфорт (3–4★ қонақүй)",
                premium: "Премиум (5★ және жеке сервис)",
            },
            datesLabel: "Күндер",
            datesPlaceholder: "2025 кез келген уақыты",
            travelersLabel: "Саяхатшылар",
            buildButton: "Маршрут құру",
            helperText:
                "Біз каньондар, альпілік көлдер, құм төбелер мен тарихи қалаларды бір теңгерімді маршрутқа біріктіреміз.",
            signatureTitle: "Негізгі бағыттар",
            signatureSubtitle:
                "Барлық локациялар Қазақстанда. Фотоларда – бізбен баруға болатын шынайы орындар.",
            signatureCta: "Барлық турларды көру",
            cards: {
                0: {
                    title: "Шарын шатқалы",
                    tag: "Шуақты • Алматыдан 2 күн",
                    desc: "Қазақстанның «мини Гранд Каньоны»: қызыл жартас, күн батуы және жеңіл треккинг.",
                },
                1: {
                    title: "Көлсай және Қайыңды көлдері",
                    tag: "Табиғат • 2–3 күн",
                    desc: "Тау көлдері, шыршалы ормандар және су астындағы орманмен әйгілі Қайыңды.",
                },
                2: {
                    title: "Астана",
                    tag: "Қала • 1–2 күн",
                    desc: "Заманауи астана: футуристік архитектура, мұражайлар және жағалау серуендері.",
                },
            },

            heroPrice: 620,
            heroPriceFrom: "бастап",
            heroPricePerPerson: "/ адам",
        },

        tours: {
            badge: "Каталог",
            title: "Қазақстан бойынша турлар",
            description: "",
            previewButton: "Өтініш қалдыру",
        },

        howItWorks: {
            badge: "Процесс",
            title: "TravelMate қалай жұмыс істейді",
            description:
                "",
            steps: {
                0: {
                    num: "01",
                    title: "Саяхатыңыз туралы айтасыз",
                    text: "Күндеріңізді, болжамды бюджетіңізді, адам санын және стиліңізді бөлісесіз.",
                },
                1: {
                    num: "02",
                    title: "Бірнеше маршрут ұсынамыз",
                    text: "Каньондар, көлдер, құм төбелер мен қалаларды 2–3 түрлі темптегі маршрутқа біріктіреміз.",
                },
                2: {
                    num: "03",
                    title: "Сіз детальдарды мақұлдайсыз",
                    text: "Ұнаған нұсқаны таңдап, қонақүй, көлік және белсенділіктерді нақтылаймыз.",
                },
                3: {
                    num: "04",
                    title: "Бронь және қолдау",
                    text: "Броньдауды, трансферлерді біз жасаймыз және сапар барысында байланыста боламыз.",
                },
            },
            extrasTitle: "Не аласыз:",
            extrasList: [
                "Барлық сұрақ бойынша бір байланыс нүктесі.",
                "Қашықтықтар, жол уақыты және жүктеме деңгейі көрсетілген айқын бағдарлама.",
                "Қазақ/орыс/ағылшын тілдеріндегі қолдау және жергілікті гид/жүргізушілер контактілері.",
            ],
        },

        login: {
            badge: "Кіру",
            title: "TravelMate жүйесіне кіру",
            description:
                "",
            emailLabel: "Email",
            passwordLabel: "Құпиясөз",
            submit: "Кіру",
            noAccount: "Аккаунт жоқ па?",
            toRegister: "Тіркелу",
        },

        register: {
            badge: "Тіркелу",
            title: "Аккаунт құру",
            description:
                "",
            firstName: "Есім",
            lastName: "Тегіңіз",
            emailLabel: "Email",
            passwordLabel: "Құпиясөз",
            submit: "Тіркелу",
            hasAccount: "Аккаунтыңыз бар ма?",
            toLogin: "Кіру",
        },

        confirm: {
            badge: "Тіркелу",
            title: "Аккаунт жасауды растаңыз",
            description: "Поштаңызды ашып, тіркелуді растаңыз.",
        },

        account: {
            badge: "Профиль",
            title: "Менің аккаунтым",
            description: "",
            preferredStyleLabel: "Таңдаулы стиль",
            preferredStyleValue: "Демалыс + жеңіл трекинг",
            homeCityLabel: "Қала",
            homeCityValue: "Алматы, Қазақстан",
            tripsTitle: "Жоспарланған сапарлар (демо)",
            tripsAdd: "Қосу",
            tripsEmpty:
                "Әзірге сапарлар жоқ. Маршрут құрғанда, ол осында шығады.",
            trips: {
                0: {
                    title: "Демо: Алматы – Көлсай және Шарын",
                    dates: "15–19 шілде 2025",
                    status: "Жоба",
                },
                1: {
                    title: "Демо: Маңғыстау — Бозжыра",
                    dates: "01–06 қыркүйек 2025",
                    status: "Идея",
                },
            },
        },

        footer: {
            terms: "Шарттар",
            privacy: "Құпиялылық",
            company: "TravelMate — Қазақстан турлары",
        },

        admin: {
            common: {
                checkingAccess: "Қатынау тексерілуде…",
                accessDeniedTitle: "Қатынау жабық",
                accessDeniedText:
                    "Бұл бетке тек әкімшілік аккаунтпен кірген қолданушылар ғана өте алады.",
            },
            tours: {
                pageTitle: "Турлар",
                loadError: "Турларды жүктеу мүмкін болмады",
                listTitle: "Турлар тізімі",
                newTourButton: "+ Жаңа тур",
                loading: "Турлар жүктелуде...",
                empty: "Әзірге бірде-бір тур жоқ.",
                daysShort: "күн",
                deleteButton: "Жою",
                deleteConfirm: "Бұл турды жоямыз ба?",
                error: {
                    uploadImage: "Суретті жүктеу қатесі",
                    saveTour: "Турды сақтау мүмкін болмады",
                    deleteTour: "Турды жою мүмкін болмады",
                    generic: "Қате",
                },
                form: {
                    editTitle: "Турды өңдеу",
                    newTitle: "Жаңа тур",
                    clearForm: "Форманы тазарту",
                    imageLabel: "Сурет (jpg, png)",
                    currentImage: "Ағымдағы файл:",
                    priceLabel: "Бағасы, USD",
                    daysLabel: "Күн саны",
                    nameLabel: "Атауы",
                    taglineLabel: "Теглайн",
                    shortDescLabel: "Қысқаша сипаттама",
                    moodLabel: "Көңіл-күй тегтері (үтір арқылы)",
                    moodHint: "Қолдан: relax, adventure, culture",
                    budgetLabel: "Бюджет",
                    submit: {
                        saving: "Сақталуда...",
                        edit: "Өзгерістерді сақтау",
                        create: "Тур жасау",
                    },
                    cancelEdit: "Өңдеуді болдырмау",
                    examples: {
                        titleRu: "Шарын шатқалы (RU)",
                        titleEn: "Charyn Canyon",
                        titleKz: "Шарын шатқалы",
                        taglineRu: "Шеру • Алматыдан 2 күн (RU)",
                        taglineEn: "Adventure • 2 days from Almaty",
                        taglineKz: "Сапар • Алматыдан 2 күн",
                    },
                },
            },
            orders: {
                pageTitle: "Турға өтініштер",
                pageSubtitle:
                    "Мұнда қолданушылар жіберген барлық өтініштер көрсетіледі.",
                loadError: "Өтініштерді жүктеу мүмкін болмады",
                loading: "Өтініштер жүктелуде…",
                empty: "Әзірге бірде-бір өтініш жоқ.",
                table: {
                    id: "ID",
                    date: "Күні",
                    tour: "Тур",
                    user: "Қолданушы (user_id)",
                },
            },
        },
    },
};
