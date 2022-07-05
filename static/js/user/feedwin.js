const url = new URL(location.href);
function getFeedList() {
  if (!feedObj) {
    return;
  }

  feedObj.showLoading();
  const param = {
    page: feedObj.currentPage++,
    iuser: url.searchParams.get("iuser"),
  };
  fetch("/PHPgram/user/feed" + encodeQueryString(param))
    .then((res) => res.json())
    .then((list) => {
      feedObj.makeFeedList(list);
    })
    .catch((e) => {
      console.error(e);
      feedObj.hideLoading();
    });
}

getFeedList();

(function () {
  const lData = document.querySelector("#lData");
  const btnFollow = document.querySelectorAll(".btnFollow");
  console.log(btnFollow[0].dataset);

  btnFollow.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const param = {
        toiuser: parseInt(lData.dataset.toiuser),
      };
      const follow = e.target.dataset.follow;
      const followUrl = "/PHPgram/user/follow";
      const followerCnt = document.querySelector("#followerCnt>span");
      switch (follow) {
        case "1":
          //팔로우취소

          fetch(followUrl + encodeQueryString(param), { method: "DELETE" })
            .then((res) => res.json())
            .then((res) => {
              if (res.result) {
                btn.classList.add("d-none");
                if (btn.dataset.youme === "1") {
                  document.querySelector("#btnFollowToo").classList.remove("d-none");
                } else {
                  document.querySelector("#btnFollow").classList.remove("d-none");
                }

                followerCnt.innerHTML = parseInt(followerCnt.innerHTML) - 1;
              }
            });
          break;
        case "0":
          //팔로우등록
          fetch(followUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(param),
          })
            .then((res) => res.json())
            .then((res) => {
              //   console.log(res);
              if (res.result) {
                btn.classList.add("d-none");
                document.querySelector("#btnCancel").classList.remove("d-none");
                followerCnt.innerHTML = parseInt(followerCnt.innerHTML) + 1;
              }
            });
          break;
      }
    });
  });
})();
