const transactionWraper = document.querySelector(".transactions");
const transactionsBtn = document.querySelector(".transactions-aploading");
let color;
let datas = [];

transactionsBtn.addEventListener("click", () => {
  axios
    .get("http://localhost:3000/transactions")
    .then((res) => {
      datas = res.data;
      render(datas);
      savedDatas(datas);
    })
    .catch((error) => {
      console.log(error);
    });
});

// console.log(datas);
function render(datas) {
  getDatas(datas);
  transactionWraper.innerHTML = "";
  let result = "";
  result += ` <div class="transactions__header">
    <h3>لیست تراکنش ها</h3>
    <input type="text" placeholder="جستجوی تراکنش ....." id="transaction__search"/>
  </div>
  <div class="transactions__body">
    <h3>لیست تراکنش ها</h3>
    <table>
      <tr>
        <th>ردیف</th>
        <th>نوع تراکنش</th>
        <th class="sort sort-price">مبلغ<i class="fa-solid fa-chevron-down">
        <div class="price-sort__wraper hidden">
        <a class="ascent">بیشترین</a>
        <a class="descent">کمترین</a>
        </div></i></th>
        <th>شماره پیگیری</th>
        <th class="sort sort-date">تاریخ تراکنش<i class="fa-solid fa-chevron-down">
        <div class="date-sort__wraper hidden">
        <a class="date-ascent">زودترین</a>
        <a class="date-descent">دیرترین</a>
        </div></i></th>
      </tr> </table>
      </div>`;
  transactionWraper.innerHTML += result;
  const table = document.querySelector("table");
  datas.forEach((data) => {
    table.innerHTML += `<tr>
    <td>${data.id}</td>
    <td class="color-type">${data.type}</td>
    <td>${data.price}</td>
    <td>${data.refId}</td>
    <td>${new Date(data.date).toLocaleString("fa")}</td>
  </tr>`;
  });

  const transactionSearch = document.getElementById("transaction__search");
  const priceSortWraper = document.querySelector(".price-sort__wraper");
  const dateSortWraper = document.querySelector(".date-sort__wraper");
  const ascent = document.querySelector(".ascent");
  const descent = document.querySelector(".descent");
  const sortPrice = document.querySelector(".sort-price");
  const sortDate = document.querySelector(".sort-date");
  const dateAscent = document.querySelector(".date-ascent");
  const dateDescent = document.querySelector(".date-descent");
  const sortIcon = document.querySelector(".fa-solid");

  // events
  transactionSearch.addEventListener("change", (e) => {
    const refId = parseInt(e.target.value);
    console.log(refId);
    axios
      .get(`http://localhost:3000/transactions?refId_like=${refId}`)
      .then((res) => {
        datas = res.data;
        render(datas);
        savedDatas(datas);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  sortPrice.addEventListener("click", (e) => {
    toggle(priceSortWraper);
    iconChanging();
    ascent.addEventListener("click", () => {
      sort("http://localhost:3000/transactions?_sort=price&_order=asc");
    });
    descent.addEventListener("click", () => {
      sort("http://localhost:3000/transactions?_sort=price&_order=desc");
    });
  });

  sortDate.addEventListener("click", (e) => {
    toggle(dateSortWraper);
    iconChanging();
    dateAscent.addEventListener("click", () => {
      sort("http://localhost:3000/transactions?_sort=date&_order=asc");
    });
    dateDescent.addEventListener("click", () => {
      sort("http://localhost:3000/transactions?_sort=date&_order=asc");
    });
  });
  function iconChanging() {
    if (sortIcon.classList.contains("fa-chevron-down")) {
      sortIcon.classList.toggle("fa-chevron-up");
    }
    if (sortIcon.classList.contains("fa-chevron-up")) {
      sortIcon.classList.toggle("fa-chevron-down");
    }
  }
}
function sort(sortLink) {
  axios
    .get(sortLink)
    .then((res) => {
      datas = res.data;
      render(datas);
      savedDatas(datas);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
function toggle(className) {
  className.classList.toggle("hidden");
}

// storage
function getDatas() {
  return JSON.parse(localStorage.getItem("datas"));
}
function savedDatas(datas) {
  localStorage.setItem("datas", JSON.stringify(datas));
}
