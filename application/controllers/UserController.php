<?php

namespace application\controllers;

use application\libs\Application;

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
        return "redirect:/user/signin";
    }

    public function feedwin()
    {
        $iuser = isset($_GET["iuser"]) ? intval($_GET["iuser"]) : 0;
        $param = [
            "feediuser" => $iuser,
            "loginiuser" => getIuser()
        ];
        $this->addAttribute(_DATA, $this->model->selUserProfile($param));

        $this->addAttribute(_JS, ["user/feedwin", "https://unpkg.com/swiper@8/swiper-bundle.min.js"]);
        $this->addAttribute(_CSS, ["user/feedwin", "https://unpkg.com/swiper@8/swiper-bundle.min.css", "feed/index"]);
        $this->addAttribute(_MAIN, $this->getView("user/feedwin.php"));
        return "template/t1.php";
    }

    public function feed()
    {
        if (getMethod() === _GET) {
            $page = 1;
            if (isset($_GET["page"])) {
                $page = intval($_GET["page"]);
            }
            $startIdx = ($page - 1) * _FEED_ITEM_CNT;
            $param = [
                "startIdx" => $startIdx,
                "toiuser" => $_GET["iuser"],
                "loginiuser" => getIuser()
                //?????? feedWin?????? feed ????????? ????????? ????????? ?????? ??????
            ];
            $list = $this->model->selFeedList($param);
            foreach ($list as $item) {
                $param2 = ["ifeed" => $item->ifeed];
                $item->imgList = Application::getModel("feed")->selFeedImgList($param2);
            }
            return $list;
        }
    }


    public function follow()
    {
        $param = [
            "fromiuser" => getIuser(),
            // "toiuser" =>  $_REQUEST["toiuser"]
        ];
        // REQUEST: get or post ????????????
        switch (getMethod()) {
            case _POST:
                $json = getJson();
                $param["toiuser"] = $json['toiuser'];
                $result = $this->model->insUserFollow($param);
                return [_RESULT => $result];
            case _DELETE:;
                $param["toiuser"] = $_GET['toiuser'];
                return [_RESULT =>  $this->model->delFollow($param)];
        }
    }
}
