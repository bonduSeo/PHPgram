const feedObj = {
  limit: 20,
  itemLength: 0,
  currentPage: 1,
  swiper: null,
  refreshSwipe: function () {
    if (this.swiper !== null) {
      this.swiper = null;
    }
    this.swiper = new Swiper(".swiper", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: { el: ".swiper-pagination" },
      allowTouchMove: false,
      direction: "horizontal",
      loop: false,
    });
  },
  loadingElem: document.querySelector(".loading"),
  containerElem: document.querySelector("#item_container"),
  getFeedCmtList: function (ifeed, divCmtList, spanMoreCmt) {
    fetch(`/PHPgram/feedcmt/index?ifeed=${ifeed}`)
      .then((res) => res.json())
      .then((res) => {
        if (res && res.length > 0) {
          if (spanMoreCmt) {
            spanMoreCmt.remove();
          }
          divCmtList.innerHTML = null;
          res.forEach((item) => {
            const divCmtItem = this.makeCmtItem(item);
            divCmtList.appendChild(divCmtItem);
          });
        }
      });
  },
  makeCmtItem: function (item) {
    const divCmtItemContainer = document.createElement("div");
    divCmtItemContainer.className = "d-flex flex-row align-items-center mb-2";
    const src = "/PHPgram/static/img/profile/" + (item.writerimg ? `${item.iuser}/${item.writerimg}` : "defaultProfileImg_100.png");
    divCmtItemContainer.innerHTML = `
        <div class="circleimg h24 w24 me-1">
            <img src="${src}" class="profile w24 pointer">                
        </div>
        <div class="d-flex flex-row">
            <div class="pointer me-2"><span id="writer">${item.writer}</span> - ${getDateTimeInfo(item.regdt)}</div>
            <div>${item.cmt}</div>
        </div>
    `;
    const imgToLink = divCmtItemContainer.querySelector("div>img");
    const writerToLink = divCmtItemContainer.querySelector("#writer");
    imgToLink.addEventListener("click", (e) => {
      // console.log(e.target);
      moveToFeedWin(item.iuser);
    });
    writerToLink.addEventListener("click", (e) => {
      moveToFeedWin(item.iuser);
    });
    return divCmtItemContainer;
  },

  makeFeedList: function (list) {
    if (list.length !== 0) {
      list.forEach((item) => {
        const divItem = this.makeFeedItem(item);
        this.containerElem.appendChild(divItem);
      });
    }

    this.refreshSwipe();
    this.hideLoading();
  },

  makeFeedItem: function (item) {
    console.log(item);
    const divContainer = document.createElement("div");
    divContainer.className = "item mt-3 mb-3";

    const regDtInfo = getDateTimeInfo(item.regdt);
    const divTop = document.createElement("div");
    divContainer.appendChild(divTop);

    divTop.className = "d-flex flex-row ps-3 pe-3";
    const writerImg = `<img src='/PHPgram/static/img/profile/${item.iuser}/${item.mainimg}' 
        onerror='this.error=null;this.src="/PHPgram/static/img/profile/defaultProfileImg_100.png"'>`;

    divTop.innerHTML = `
          <div class="d-flex flex-column justify-content-center">
            <div class="circleimg h40 w40 feedwin pointer">${writerImg}</div>
            </div>
          <div class="p-3 flex-grow-1">
            <div><span class="pointer feedwin">${item.writer}</span> - ${regDtInfo}</div>
            <div>${item.location === null ? "" : item.location}</div>
        `;
    const feedwinList = divTop.querySelectorAll(".feedwin");
    feedwinList.forEach((el) => {
      el.addEventListener("click", () => {
        moveToFeedWin(item.iuser);
      });
    });

    const divImgSwiper = document.createElement("div");
    divContainer.appendChild(divImgSwiper);
    divImgSwiper.className = "swiper item_img";
    divImgSwiper.innerHTML = `
        <div class="swiper-wrapper align-items-center"></div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"><img src='/PHPgram/static/svg/leftArrow.svg'></div>
        <div class="swiper-button-next"><img src='/PHPgram/static/svg/rightArrow.svg'></div>
      `;
    const divSwiperWrapper = divImgSwiper.querySelector(".swiper-wrapper");

    item.imgList.forEach(function (imgObj) {
      const divSwiperSlide = document.createElement("div");
      divSwiperWrapper.appendChild(divSwiperSlide);
      divSwiperSlide.classList.add("swiper-slide");

      const img = document.createElement("img");
      divSwiperSlide.appendChild(img);
      img.className = "w100p_mw614";
      img.src = `/PHPgram/static/img/feed/${item.ifeed}/${imgObj.img}`;
    });

    const divBtns = document.createElement("div");
    divContainer.appendChild(divBtns);
    divBtns.className = "favCont p-3 d-flex flex-row";

    const heartIcon = document.createElement("i");
    divBtns.appendChild(heartIcon);
    heartIcon.className = "fa-heart pointer rem1_5 me-3";
    heartIcon.classList.add(item.isFav === 1 ? "fas" : "far");
    heartIcon.addEventListener("click", (e) => {
      let method = "POST";
      if (item.isFav === 1) {
        method = "DELETE";
      }

      fetch(`/PHPgram/feed/fav/${item.ifeed}`, {
        method: method,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.result) {
            item.isFav = 1 - item.isFav; // 0 > 1, 1 > 0
            if (item.isFav === 0) {
              // ????????? ??????
              heartIcon.classList.remove("fas");
              heartIcon.classList.add("far");
            } else {
              // ????????? ??????
              heartIcon.classList.remove("far");
              heartIcon.classList.add("fas");
            }
          } else {
            alert("???????????? ??? ??? ????????????.");
          }
        })
        .catch((e) => {
          console.log(e);
          alert("??????????????? ????????? ????????????.");
        });
    });

    const divDm = document.createElement("div");
    divBtns.appendChild(divDm);
    divDm.className = "pointer";
    divDm.innerHTML = `<svg aria-label="???????????? ?????????" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>`;
    divDm.addEventListener("click", (e) => {
      location.href = `/PHPgram/dm/index?oppoiuser=${item.iuser}`;
    });
    const divFav = document.createElement("div");
    divContainer.appendChild(divFav);
    divFav.className = "p-3 d-none";
    const spanFavCnt = document.createElement("span");
    divFav.appendChild(spanFavCnt);
    spanFavCnt.className = "bold";
    spanFavCnt.innerHTML = `????????? ${item.favCnt}`;

    if (item.favCnt > 0) {
      divFav.classList.remove("d-none");
    }

    if (item.ctnt !== null && item.ctnt !== "") {
      const divCtnt = document.createElement("div");
      divContainer.appendChild(divCtnt);
      divCtnt.innerText = item.ctnt;
      divCtnt.className = "itemCtnt p-3";
    }

    const divCmtList = document.createElement("div");
    divContainer.appendChild(divCmtList);
    divCmtList.className = "ms-3";
    const divCmt = document.createElement("div");
    divContainer.appendChild(divCmt);

    const spanMoreCmt = document.createElement("span");
    //7???4??? ??????????????????(??????)
    if (item.cmt) {
      const divCmtItem = this.makeCmtItem(item.cmt);
      divCmtList.appendChild(divCmtItem);

      if (item.cmt.ismore === 1) {
        const divMoreCmt = document.createElement("div");
        divCmt.appendChild(divMoreCmt);
        divMoreCmt.className = "ms-3";

        divMoreCmt.appendChild(spanMoreCmt);
        spanMoreCmt.className = "pointer rem0_9 c_lightgray";
        spanMoreCmt.innerText = "?????? ?????????..";
        spanMoreCmt.addEventListener("click", (e) => {
          this.getFeedCmtList(item.ifeed, divCmtList, spanMoreCmt);
        });
      }
    }
    //
    const divCmtForm = document.createElement("div");
    divCmtForm.className = "d-flex flex-row";
    divCmt.appendChild(divCmtForm);

    divCmtForm.innerHTML = `
        <input type="text" class="flex-grow-1 my_input back_color" placeholder="????????? ???????????????..">
        <button type="button" class="btn btn-outline-primary">??????</button>
      `;
    const inputCmt = divCmtForm.querySelector("input");
    inputCmt.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        btnCmtReg.click();
      }
    });

    const btnCmtReg = divCmtForm.querySelector("button");
    btnCmtReg.addEventListener("click", (e) => {
      console.log(inputCmt.value);

      const param = {
        ifeed: item.ifeed,
        cmt: inputCmt.value,
      };
      fetch("/PHPgram/feedCmt/index", {
        method: "POST",
        body: JSON.stringify(param),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("res.result : " + res.result);
          if (res.result) {
            inputCmt.value = "";
            this.getFeedCmtList(item.ifeed, divCmtList, spanMoreCmt);
          }
        });
    });

    return divContainer;
  },

  showLoading: function () {
    this.loadingElem.classList.remove("d-none");
  },
  hideLoading: function () {
    this.loadingElem.classList.add("d-none");
  },
};

function moveToFeedWin(iuser) {
  location.href = `/PHPgram/user/feedwin?iuser=${iuser}`;
}

(function () {
  const btnNewFeedModal = document.querySelector("#btnNewFeedModal");
  if (btnNewFeedModal) {
    const modal = document.querySelector("#newFeedModal");
    const body = modal.querySelector("#id-modal-body");
    const frmElem = modal.querySelector("form");
    const btnClose = modal.querySelector(".btn-close");
    //????????? ?????? ?????????
    frmElem.imgs.addEventListener("change", function (e) {
      console.log(`length: ${e.target.files.length}`);
      //form ????????? . ?????? -???????????? ??????????????? (????????????)??????????????????
      if (e.target.files.length > 0) {
        body.innerHTML = `
                  <div>
                      <div class="d-flex flex-md-row">
                          <div class="flex-grow-1 h-full"><img id="id-img" class="w300"></div>
                          <div class="ms-1 w250 d-flex flex-column">                
                              <textarea placeholder="?????? ??????..." class="flex-grow-1 p-1"></textarea>
                              <input type="text" placeholder="??????" class="mt-1 p-1">
                          </div>
                      </div>
                  </div>
                  <div class="mt-2">
                      <button type="button" class="btn btn-primary">????????????</button>
                  </div>
              `;
        btnClose.addEventListener("click", () => {
          frmElem.reset();
        });

        // modal.addEventListener("click", (event) => {
        //   event.stopPropagation();
        //   frmElem.reset();
        // });
        const imgElem = body.querySelector("#id-img");

        const imgSource = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(imgSource);
        reader.onload = function () {
          imgElem.src = reader.result;
        };

        const shareBtnElem = body.querySelector("button");
        shareBtnElem.addEventListener("click", function () {
          const files = frmElem.imgs.files;

          const fData = new FormData();
          for (let i = 0; i < files.length; i++) {
            fData.append("imgs[]", files[i]);
          }
          fData.append("ctnt", body.querySelector("textarea").value);
          fData.append("location", body.querySelector("input[type=text]").value);

          fetch("/PHPgram/feed/rest", {
            method: "post",
            body: fData,
          })
            .then((res) => res.json())
            .then((myJson) => {
              console.log(myJson);

              if (myJson) {
                btnClose.click();

                //????????? ??????
                const lData = document.querySelector("#lData");
                const gData = document.querySelector("#gData");
                if (lData && lData.dataset.toiuser !== gData.dataset.loginiuser) {
                  return;
                }
                // ?????? feedWin??? ???????????? ????????? ??????!!!

                const feedItem = feedObj.makeFeedItem(myJson);
                feedObj.containerElem.prepend(feedItem);
                feedObj.refreshSwipe();
              }
            });
        });
      }
    });

    btnNewFeedModal.addEventListener("click", function () {
      const selFromComBtn = document.createElement("button");
      selFromComBtn.type = "button";
      selFromComBtn.className = "btn btn-primary";
      selFromComBtn.innerText = "??????????????? ??????";
      selFromComBtn.addEventListener("click", function () {
        frmElem.imgs.click();
      });
      body.innerHTML = null;
      body.appendChild(selFromComBtn);
    });
  }
})();
