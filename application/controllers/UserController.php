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
                    return "redirect:signin?email={$email}&err";
                } else {
                    $_SESSION[_LOGINUSER] = $dbUser;
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
                return "redirect:signin";
        }
    }
}
