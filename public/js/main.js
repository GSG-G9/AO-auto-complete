// auto Input Complete
const autoCompleteInput = (InputNode) => {
  let inputVal = "";
  InputNode.addEventListener("input", (event) => {
    inputVal = InputNode.value;
    if (!inputVal) return;
    removeOldList();
    const list = document.createElement("div");
    list.classList.add("list");
    InputNode.parentNode.appendChild(list);

    fetch.post('/getList',{inputVal},(err,data)=>{
      if(err) return err
      console.log(data);
      const resalesArray = data // /*send input val than get the data */ ["sad", "sad"];
      resalesArray.forEach((re) => {
        const item = document.createElement("div");
        item.textContent = re;
        list.appendChild(item);
        item.addEventListener("click", (event) => {
          InputNode.value = item.textContent;
          removeOldList();
        })
      });
    })
   
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

const hidedList = () => { //NoT Used yet
  displayList("none");
};

const showedList = () => { //NoT Used yet
  displayList("block");
};

const calLResult = (callback) => {
  let resultNode = document.querySelector(".Result ");
  if (resultNode == null){
    resultNode = document.createElement("h1");
    document.querySelector("main").appendChild(resultNode)
  } 
  callback(resultNode)
}

// onStart
(()=>{
  autoCompleteInput(document.querySelector(".input-contener input"));
  document.querySelector('form').addEventListener("submit",(e)=>{
    e.preventDefault();
    console.dir(e.target.elements[0].va);
    fetch.post('/getResult',{inputVal: document.querySelector(".input-contener input").value},(err, data)=>{
      if(err) return
      calLResult((resultNode)=>{
        resultNode.textContent = data.Result
      })
    })
  })
})()  