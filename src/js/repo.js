// const data = [];

// export default data;
export {
  all, byId, create, delById,
};

function all() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://help-desk-backend2.herokuapp.com/?method=all', false);
  xhr.send();
  if (xhr.status !== 200) {
    alert(`${xhr.status}: ${xhr.statusText}`);
  } else {
    return xhr.responseText;
  }
}
function byId(id) {
  const url = `https://help-desk-backend2.herokuapp.com/?method=byId&id=${id}`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();
  if (xhr.status !== 200) {
    alert(`${xhr.status}: ${xhr.statusText}`);
  } else {
    return xhr.responseText;
  }
}
function delById(form) {
  const url = 'https://help-desk-backend2.herokuapp.com/?method=delById';
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, false);
  xhr.send(form);
  if (xhr.status !== 200) {
    alert(`${xhr.status}: ${xhr.statusText}`);
  } else {
    return xhr.responseText;
  }
}
function create(formData) {
  // const formData = new FormData(evt.dataTransfer.files);
  const xhr = new XMLHttpRequest();
  
  xhr.open('POST', 'http://localhost:7070?method=create'); 
  xhr.setRequestHeader('Content-Type', 'multipart/form-data boundary=' + Math.random().toString());
  xhr.send(formData);
  // const url = 'https://help-desk-backend2.herokuapp.com/?method=createTicket';
  // const xhr = new XMLHttpRequest();
  // xhr.open('POST', url, false);
  // xhr.send(formData);
  // if (xhr.status !== 200) {
  //   alert(`${xhr.status}: ${xhr.statusText}`);
  // } else {
  //   return xhr.responseText;
  // }
}
