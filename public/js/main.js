const autoCompleteInput = (InputNode) => {
  let inputVal = "";
  InputNode.addEventListener("input", (event) => {
    inputVal = InputNode.value;
    if (!inputVal) return;
    removeOldList();
    const list = document.createElement("div");
    list.classList.add("list");
    InputNode.parentNode.appendChild(list);

    const resalesArray = /*send input val than get the data */ ["sad", "sad"];
    resalesArray.forEach((re) => {
      const item = document.createElement("div");
      item.textContent = re;
      list.appendChild(item);
      item.addEventListener("click", (event) => {
        InputNode.value = item.textContent;
        removeOldList();
      })
    });
  });
};

const callList = (callback) => {
  const list = document.querySelector(".input-contener .list");
  if (list != null) callback(list)
}

const removeOldList = () => {
  callList((list) => {
    console.log(list.parentNode);
    list.parentNode.removeChild(list);
  });
};

const displayList = (val) => {
  callList((list) => {
    list.style.display = val;
  });
};

const hidedList = () => {
  displayList("none");
};

const showedList = () => {
  displayList("block");
};

autoCompleteInput(document.querySelector(".input-contener input"));
