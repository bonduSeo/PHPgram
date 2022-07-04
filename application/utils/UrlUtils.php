<?php
function getJson()
{
    return json_decode(file_get_contents('php://input'), true);
    //php 에서는 json형태의값을 받아쓸려면 이렇게해야함(?)
}

function getParam($key)
{
    return isset($_GET[$key]) ? $_GET[$key] : "";
}

function getUrl()
{
    return isset($_GET['url']) ? rtrim($_GET['url'], '/') : "";
}
function getUrlPaths()
{
    $getUrl = getUrl();
    return $getUrl !== "" ? explode('/', $getUrl) : "";
}

function getMethod()
{
    return $_SERVER['REQUEST_METHOD'];
}

function isGetOne()
{
    $urlPaths = getUrlPaths();
    if (isset($urlPaths[2])) { //one
        return $urlPaths[2];
    }
    return false;
}
