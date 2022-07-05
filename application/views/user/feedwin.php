<div id="lData" data-toiuser=<?= $this->data->iuser ?>>
    <div class="d-flex flex-column align-items-center">
        <div class="size_box_100"></div>
        <div class="w100p_mw614">
            <div class="d-flex flex-row">
                <div class="d-flex flex-column justify-content-center">
                    <div class="circleimg h150 w150 pointer feedwin" data-bs-toggle="modal" data-bs-target="#changeProfile">
                        <img src='<?= _DIR ?>/static/img/profile/<?= $this->data->iuser ?>/<?= $this->data->mainimg ?>' onerror='this.error=null;this.src="<?= _DIR ?>/static/img/profile/defaultProfileImg_100.png"'>
                    </div>
                </div>

                <?php
                $ismyfeed = $this->data->iuser == getIuser() ? true : false;
                $youme = $this->data->youme;
                $meyou = $this->data->meyou;
                ?>

                <div class="flex-grow-1 d-flex flex-column justify-content-evenly">
                    <div><?= $this->data->email ?>
                        <button type="button" id="btnModProfile" class="btn btn-outline-secondary <?= $ismyfeed ? "" : "d-none" ?> ">프로필 수정</button>
                        <button type="button" id="btnFollowToo" data-youme="<?= $youme ?>" data-follow="0" class="btn btn-primary btnFollow <?= !$ismyfeed && $youme && !$meyou ? "" : "d-none" ?> ">맞팔로우 하기</button>
                        <button type="button" id="btnFollow" data-youme="<?= $youme ?>" data-follow="0" class="btn btn-primary btnFollow <?= !$ismyfeed && !$youme && !$meyou ? "" : "d-none" ?> ">팔로우</button>
                        <button type="button" id="btnCancel" data-youme="<?= $youme ?>" data-follow="1" class="btn btn-outline-secondary btnFollow <?= !$ismyfeed && $meyou ? "" : "d-none" ?> ">팔로우 취소</button>
                    </div>
                    <div class="d-flex flex-row">
                        <div class="flex-grow-1">게시물<span><?= $this->data->feedcnt ?></span></div>
                        <div id="followerCnt" class="flex-grow-1">팔로워<span><?= $this->data->followerCnt ?></span></div>
                        <div id="followCnt" class="flex-grow-1">팔로우<span><?= $this->data->followCnt ?></span></div>
                    </div>
                    <div class="bold"><?= $this->data->nm ?></div>
                    <div><?= $this->data->cmt ?></div>
                </div>

            </div>
            <div id="item_container"></div>
        </div>
        <div class="loading d-none"><img src="<?= _DIR ?>/static/img/loading.gif"></div>
    </div>



    <!-- Modal -->
    <div class="modal fade" id="changeProfile" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-400">
            <div class="modal-content">

                <div class="modal-body p-0">
                    <div class="modal-title bold">프로필 사진 바꾸기</div>
                    <div class="profileUpload bold pointer">사진 업로드</div>
                    <div class="profileDelete bold pointer">현재 사진 삭제</div>
                    <div class="pointer" data-bs-dismiss="modal" aria-label="Close">취소</div>

                </div>
            </div>
        </div>