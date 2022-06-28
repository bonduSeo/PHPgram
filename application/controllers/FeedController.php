<?php

namespace application\controllers;

class FeedController extends Controller
{
    public function index()
    {
        $this->addAttribute(_MAIN, $this->getView("feed/index.php"));
        $this->addAttribute(_JS, ["feed/index"]);
        return "template/t1.php";
    }

    public function rest()
    {
        // print "method : " . getMethod() . "<br>";
        switch (getMethod()) {
            case _POST:
                //연결확인용
                // print getIuser();
                // if (is_array($_FILES)) {
                //     foreach ($_FILES['imgs']['name'] as $key => $value) {
                //         print "key : {$key}, value: {$value} <br>";
                //     }
                // }
                // print "ctnt : " . $_POST["ctnt"] . "<br>";
                // print "location : " . $_POST["location"] . "<br>";

                if (!is_array($_FILES) || !isset($_FILES['imgs'])) {
                    return ["result" => 0];
                }
                $iuser = getIuser();
                $param = [
                    "location" => $_POST["location"],
                    "ctnt" => $_POST["ctnt"],
                    "iuser" => $iuser
                ];
                $ifeed = $this->model->insFeed($param);


                foreach ($_FILES["imgs"]["name"] as $key => $value) {

                    $saveDirectory = _IMG_PATH .  "/feed/" . $ifeed;
                    if (!is_dir($saveDirectory)) {
                        mkdir($saveDirectory, 0777, true);
                    }
                    $tempName = $_FILES['imgs']['tmp_name'][$key];
                    $randName = getRandomFileNm($value);
                    $fullPath = $saveDirectory . "/" . $randName;
                    if (move_uploaded_file($tempName, $fullPath)) {

                        $paramImg = [
                            'ifeed' => $ifeed,
                            'img' => $randName
                        ];

                        $this->model->insFeedImg($paramImg);
                    }
                }

                return ["result" => 1];
                // return ["test" => $ifeed];
                // return ["result" => $ifeed];
        }
    }
}
