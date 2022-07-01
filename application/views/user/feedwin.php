<div class="d-flex flex-column align-items-center">
    <div class="size_box_100"></div>
    <div class="w100p_mw614">
        <div class="d-flex flex-row">
            <div class="d-flex flex-column justify-content-center">
                <div class="circleimg h150 w150 pointer feedwin" data-bs-toggle="modal" data-bs-target="#changeProfile">
                    <img src='<?= _DIR ?>/static/img/profile/<?= $this->data->iuser ?>/<?= $this->data->mainimg ?>' onerror='this.error=null;this.src="<?= _DIR ?>/static/img/profile/defaultProfileImg_100.png"'>
                </div>
            </div>

            <div></div>
        </div>
    </div>
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