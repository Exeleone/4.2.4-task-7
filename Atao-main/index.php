<?php
require 'autoload.php';


$App = new App;
$App->checkAuth($_SESSION,$db);
$App->view($route);


class App {
    public $errorPage = "client/pages/404/index.php";
    public $headerComponent = "client/components/header.php";
    public $footerComponent = "client/components/footer.php";

    public $userRole = "user";
    public $session;
    public $isAuth = false;
    public $userName = '';
    public $login;

    public $pageTitles = [
        NULL => "ATAO - Главная",
        'contacts' => 'ATAO - Контакты',
        'about' => 'ATAO - О нас',
        'profile' => 'АТАО - Профиль',
        'disciplines' => 'АТАО - Блоки дисциплин',
        'edit-users' => 'АТАО - Редактор пользователей',
        'edit-disciplines' => 'АТАО - Редактор дисциплин',
        'my-grades' => 'АТАО - Мои оценки',
        'groups' => 'ATAO - Группы'
    ];

    public function checkAuth($sessionInfo, $db) {
        $this->session = $sessionInfo;
        if(isset($this->session['username'])) {
            $this->isAuth = true;
            $this->login = $this->session['username'];
            $login = $this->login;
            $query = $db->query("SELECT `user_type`,`user_name` FROM `users` WHERE `login` = '$login'")->fetch_assoc();
            $this->userRole = $query['user_type'];
            $this->userName = $query['user_name'];
        }
    }

    private function setPageTitle($pageName) {
        return ($this->pageTitles[$pageName]) ? $this->pageTitles[$pageName] : "ATAO";
    }

    public function view($pageName) {
        $pageTitle = $this->setPageTitle($pageName);
        $isAuth = $this->isAuth;
        $userRole = $this->userRole;
        $userName = $this->userName;
        $pageActive = $pageName;
        $login = $this->login;
        $routes = [
            'profile' => 'needAuth',
            'edit-users' => 'needAuth',
            'edit-disciplines' => 'needAuth',
            'my-grades' => 'needAuth',
            'disciplines' => 'needAuth',
            'groups' => 'needAuth'
        ];
        require($this->headerComponent);
        //main page
        ($pageName == NULL) ? $this->fileName = "client/pages/index/index.php" : $this->fileName = "client/pages/$pageName/index.php";
        //profile
        if ($routes[$pageName]) {
            if ($routes[$pageName] == 'needAuth') {
                if ($isAuth) {
                    $this->fileName = "client/pages/$pageName/index.php";
                } else {
                    $this->fileName = "client/pages/index/index.php";
                }
            }
        }
        //public pages
        if(file_exists($this->fileName)) {
            require "$this->fileName";
         } else {
            require "$this->errorPage";
         }
         require "$this->footerComponent";

    }
}

?>
