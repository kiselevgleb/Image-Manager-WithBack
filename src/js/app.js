const dropEl = document.querySelector('[data-id=drop-area]');
const previewEl = document.querySelector('[data-id=preview]');
const inp = document.querySelector('.inp');
const but = document.querySelector('.but');

let files = [];
let filesURL = [];
let boo = false;

function init() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://back-image-manager.herokuapp.com/?method=all', false);
  xhr.send();
  if (xhr.status !== 200) {
    alert(`${xhr.status}: ${xhr.statusText}`);
  } else {
    console.log(xhr.responseText);
    filesURL = JSON.parse(xhr.responseText);
    // add();
    return;
  }
}
init();
add();
// dropEl.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   console.log("submit");

//   console.log(evt.currentTarget.firstChild.nextSibling.value);
//   const formData = new FormData(evt.currentTarget);
//   const xhr = new XMLHttpRequest();
//   xhr.open('POST', 'http://localhost:7070?method=create'); // TODO: subscribe to response 
//   xhr.send(formData);
//   boo=false;
//   // return false;
// })

function check(size) {
  const imgs = document.querySelectorAll('.image');
  let boo = true;
  if (imgs.length > 0) {
    imgs.forEach((element) => {
      if (element.getAttribute('num') === size.toString()) {
        boo = false;
      }
    });
    return boo;
  }
  return true;
}

dropEl.addEventListener('dragover', (evt) => {
  evt.preventDefault();
});
dropEl.addEventListener('drop', (evt) => {
  evt.preventDefault();
  if (evt.dataTransfer.files[0].type.match('image.*') && check(evt.dataTransfer.files[0].size)) {
    files = Array.from(evt.dataTransfer.files);
    console.log("C:\\fakepath\\"+evt.dataTransfer.files[0].name);
    // evt.target.parentElement.firstChild.nextSibling.value="C:\\fakepath\\"+evt.dataTransfer.files[0].name;
    console.log(evt.target.parentElement.firstChild.nextSibling.value);
    console.log(evt.target.parentElement.firstChild.nextSibling);

    const formData = new FormData();
    formData.append("file", files[0], '1.png');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://back-image-manager.herokuapp.com/?method=create'); // TODO: subscribe to response 
    xhr.send(formData);

    boo=true;
    add();
  } else {
    // console.log("uncorrect type file");
  }
});

inp.addEventListener('change', handleFiles, false);

function handleFiles() {

  if (this.files[0].type.match('image.*') && check(this.files[0].size)) {
    files = Array.from(this.files);
    console.log(this.files);

    // let button = this.nextSibling.nextSibling.nextSibling.nextSibling;
    // console.log(this.nextSibling.nextSibling.nextSibling.nextSibling);
    // const but = document.querySelector('.but');
    // setTimeout(function() {but.сlick();}, 1000);
    // dropEl.submit();
    // create(this.parentElement);
    const formData = new FormData();
    formData.append("file", files[0], '1.png');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://back-image-manager.herokuapp.com/?method=create'); // TODO: subscribe to response 
    xhr.send(formData);

    boo=true;
    add();
  } else {
    // console.log("uncorrect type file");
  }
}

function add() {
  console.log(filesURL);
  if(!boo){
  filesURL.forEach(element => {
    const divimg = document.createElement('div');
    const img = document.createElement('img');
    img.src = element.path;
    img.setAttribute('num', element.size);
    img.classList.add('image');
    img.height = '100';
    divimg.appendChild(img);
    divimg.classList.add('previewDiv');
    const butDel = document.createElement('a');
    butDel.innerHTML = '&#9747';
    butDel.classList.add('del');
    divimg.appendChild(butDel);
    previewEl.appendChild(divimg);
    del();
  });
  }
  else {
    const divimg = document.createElement('div');
    const img = document.createElement('img');
    img.src = URL.createObjectURL(files[0]);
    img.setAttribute('num', files[0].size);
    img.classList.add('image');
    img.height = '100';
    divimg.appendChild(img);
    divimg.classList.add('previewDiv');
    const butDel = document.createElement('a');
    butDel.innerHTML = '&#9747';
    butDel.classList.add('del');
    divimg.appendChild(butDel);
    previewEl.appendChild(divimg);
    del();
  }
}

function del() {
  const butDel = document.querySelectorAll('.del');
  butDel.forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      e.srcElement.parentElement.remove();
      const json = JSON.stringify({
        num: e.srcElement.previousSibling.getAttribute('num'),
      });
      console.log(e.srcElement.previousSibling.getAttribute('num'));
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://back-image-manager.herokuapp.com/?method=delById'); // TODO: subscribe to response 
      xhr.send(json);
    });
  });
  // add();
}
