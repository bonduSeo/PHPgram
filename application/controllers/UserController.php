<?php

namespace application\controllers;


class UserController extends Controller
{
    public function signin()
    {
        switch (getMethod()) {
            case _GET:
                return "user/signin.php";
            case _POST:
                $email = $_POST['email'];
                $param = [
                    "email" => $email,
                ];
                $dbUser = $this->model->selUser($param);

                if (!$dbUser || !password_verify($_POST['pw'], $dbUser->pw)) {
                    return "redirect:/user/signin?email={$email}&err";
                } else {
                    $dbUser->pw = null;
                    $dbUser->regdt = null;
                    $this->flash(_LOGINUSER, $dbUser);
                    return "redirect:/feed/index";
                }
        }
    }

    public function signup()
    {
        switch (getMethod()) {
            case _GET:
                return "user/signup.php";
            case _POST:

                $param = [
                    "email" => $_POST['email'],
                    "pw" => password_hash($_POST['pw'], PASSWORD_BCRYPT),
                    "nm" => $_POST['nm']
                ];
                $this->model->insUser($param);
                return "redirect:/user/signin";
        }
    }

    public function logout()
    {
        $this->flash(_LOGINUSER);
        return "redirect:" . _DIR . "/user/signin";
    }

    public function feedwin()
    {
        $this->addAttribute(_JS, ["https://unpkg.com/swiper@8/swiper-bundle.min.js", "feed/index"]);
        $this->addAttribute(_CSS, ["feed/index", "https://unpkg.com/swiper@8/swiper-bundle.min.css"]);
        $this->addAttribute(_MAIN, $this->getView("user/feedwin.php"));
        return "template/t1.php";
    }
}
