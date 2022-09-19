<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://unpkg.com/@tabler/core@1.0.0-beta3/dist/js/tabler.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/@tabler/core@1.0.0-beta3/dist/css/tabler.min.css">
    <title><?=$pageTitle?></title>
</head>
<body>
    <div class="wrapper">
        <div class="navbar-expand-md">
            <div class="collapse navbar-collapse" id="navbar-menu">
            <div class="navbar navbar-light">
                <div class="container-xl">
                    <ul class="navbar-nav">
                        <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                        <a href="/">
                            ATAO
                        </a>
                        </h1>
                        <?php
                            if($userRole == 'student'): 
                        ?>
                        <li class="nav-item <?=($pageActive == "my-grades") ? "active" : '' ?>">
                            <a class="nav-link" href="/my-grades">
                                <span class="nav-link-icon d-md-none d-lg-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-box-multiple-5" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <rect x="7" y="3" width="14" height="14" rx="2"></rect>
                                        <path d="M12 14h2a2 2 0 1 0 0 -4h-2v-4h4"></path>
                                        <path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2"></path>
                                    </svg>
                                </span>
                                <span class="nav-link-title">
                                    Мои Оценки
                                </span>
                            </a>
                        </li>
                        <?php endif; ?>
                        <?php
                         if($userRole == 'admin'): 
                        ?>
                        <li class="nav-item <?=($pageActive == "edit-users") ? "active" : '' ?>">
                            <a class="nav-link" href="/edit-users">
                                <span class="nav-link-icon d-md-none d-lg-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                                    </svg>
                                </span>
                                <span class="nav-link-title">
                                    Ред. пользователей
                                </span>
                            </a>
                        </li>
                        <li class="nav-item <?=($pageActive == "edit-disciplines") ? "active" : '' ?>">
                            <a class="nav-link" href="/edit-disciplines">
                                <span class="nav-link-icon d-md-none d-lg-inline-block">
                                
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-book" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
                                        <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
                                        <line x1="3" y1="6" x2="3" y2="19"></line>
                                        <line x1="12" y1="6" x2="12" y2="19"></line>
                                        <line x1="21" y1="6" x2="21" y2="19"></line>
                                    </svg>
                                </span>
                                <span class="nav-link-title">
                                    Ред. дисциплин
                                </span>
                            </a>
                        </li>
                        <li class="nav-item <?=($pageActive == "groups") ? "active" : '' ?>">
                            <a class="nav-link" href="/groups">
                                <span class="nav-link-icon d-md-none d-lg-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                                    </svg>
                                </span>
                                <span class="nav-link-title">
                                    Группы
                                </span>
                            </a>
                        </li>
                        <?php endif; ?>
                        <?php
                            if($userRole == 'teacher'): 
                        ?>
                        <li class="nav-item <?=($pageActive == "disciplines") ? "active" : '' ?>">
                            <a class="nav-link" href="/disciplines">
                                <span class="nav-link-icon d-md-none d-lg-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-square" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                        <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                                        <polyline points="11 12 12 12 12 16 13 16"></polyline>
                                    </svg>
                                </span>
                                <span class="nav-link-title">
                                    Блоки Дисциплин
                                </span>
                            </a>
                        </li>
                        <?php endif; ?>
                        <li class="nav-item <?=($pageActive == "about") ? "active" : '' ?>">
                            <a class="nav-link" href="/about">
                                <span class="nav-link-icon d-md-none d-lg-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-square" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                        <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                                        <polyline points="11 12 12 12 12 16 13 16"></polyline>
                                    </svg>
                                </span>
                                <span class="nav-link-title">
                                    О нас
                                </span>
                            </a>
                        </li>
                        <li class="nav-item <?=($pageActive == "contacts") ? "active" : '' ?>">
                            <a class="nav-link" href="/contacts">
                                <span class="nav-link-icon d-md-none d-lg-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                                    </svg>
                                </span>
                                <span class="nav-link-title">
                                    Контакты
                                </span>
                            </a>
                        </li>
                    </ul>
                    <div class="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
                        <ul class="navbar-nav">
                            <?php
                                //user not auth
                                if($isAuth == false):
                            ?>
                            <li class="nav-item cursor-pointer">
                                <a class="nav-link" onclick="renderRegisterModal()">
                                    <span class="nav-link-title">
                                        Регистрация
                                    </span>
                                </a>
                            </li>
                            <li class="nav-item cursor-pointer">
                                <a class="nav-link" onclick="renderLoginModal()">
                                    <span class="nav-link-title">
                                        Вход
                                    </span>
                                </a>
                            </li>
                            <?php
                                endif;
                            ?>
                            <?php
                                //user is auth
                                if($isAuth == true):
                            ?>
                            <li class="nav-item <?=($pageActive == "profile") ? "active" : '' ?>">
                                <a class="nav-link" href="/profile">
                                    <span class="nav-link-title">
                                        <?php
                                            echo $userName; //show user-name
                                        ?>
                                    </span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/app/logout.php">
                                    <span class="nav-link-title">
                                        Выход
                                    </span>
                                </a>
                            </li>
                            <?php
                                endif;
                            ?>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>