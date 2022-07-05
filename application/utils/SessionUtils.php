<?php
function getLoginUser()
{
    return $_SESSION[_LOGINUSER];
}

function getIuser()
{
    if (isset($_SESSION[_LOGINUSER])) {
        return getLoginUser()->iuser;
    }
}

function getMainImgSrc()
{

    return getIuser() . "/" . getLoginUser()->mainimg;
}
