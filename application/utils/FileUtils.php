<?php

function getRandomFileNm($fileName)
{
    return gen_uuid_v4() . "." . getExt($fileName);
}


//확장자 리턴함수
function getExt($fileName)
{
    return pathinfo($fileName, PATHINFO_EXTENSION);
    // $fileNameArray = explode(".", $fileName);
    // return end($fileNameArray);

    // return substr($fileName, strrpos($fileName, ".") + 1);
}

function gen_uuid_v4()
{
    return sprintf(
        '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0xffff)
    );
}
