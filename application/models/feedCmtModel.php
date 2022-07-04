<?php

namespace application\models;

use PDO;


class FeedCmtModel extends Model
{
    public function insFeedCmt(&$param)
    {
        $sql =
            "   INSERT INTO t_feed_cmt
                (ifeed, iuser, cmt)
                VALUES
                (:ifeed, :iuser, :cmt)
            ";
        $stmt = $this->pdo->prepare($sql);

        $stmt->execute([$param['ifeed'], $param['iuser'], $param['cmt']]);
        return intval($this->pdo->lastInsertId());
    }
};
