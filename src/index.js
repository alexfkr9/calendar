import './style.scss';


let allMembers = [];
let n = 0;

class Event {
  constructor(nameEvent, participants, day, time) {
    this.nameEvent = nameEvent;
    this.participants = participants;
    this.day = day;
    this.time = time;
  }
}

let basicView = document.getElementById('basicView');
let createNewEvent = document.getElementById('createNewEvent');

let weekDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
let hour = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

let result = '';

result += '<tbody>';

for(let i=0; i<10; ++i) {
  result += '<tr>';

  for(let j=0; j<6; ++j) {
    let td = weekDay[j-1] + hour[i-1] ;

    if ( i == 0 && j == 0 ) { result += `<td>Name</td>` }
    else if ( i == 0 ) { result += `<td id="${weekDay[j-1]}" class="">${weekDay[j-1]}</td>`
    } else if ( j == 0 ) { result += `<td id="${hour[i-1]}" class="">${hour[i-1]}</td>`;
    } else {
      result += `<td id="${td}" class="">-</td>`;
    }

  }

  result += '</tr>';
}

result += '</tbody>';

document.getElementById('calendar').innerHTML = result;


window.newEvent = function() { 
  basicView.style.display = "none";  
  createNewEvent.style.display = "block";  
}


window.saveEvent = function() {
  //  get data from form 'new event'
  let nameEvent = document.getElementById('nameEvent');
  let participants = document.getElementById('participants');
  let day = document.getElementById('day');
  let time = document.getElementById('time');

  let tabId = day.value + time.value;

  let i;
  if (n !== 0) {
    for (i = 0; i < allMembers.length ; ++i) {
      let s = allMembers[i].day + allMembers[i].time;
      if (tabId == s) {
        document.getElementById('failed').style.display = "block";
        return;
      }
    }
  }
  createArr(tabId);
  n++;
}

function createArr(tabId) {
  let result = '';

  let myEvent = new Event(
    nameEvent.value,
    participants.value,
    day.value,
    time.value
  );

  allMembers.push(myEvent);

  goToBasicView();
  document.getElementById(tabId).style.background = "#aef";
  document.getElementById(tabId).style.visibility = "visible";

  result += '<span>' + nameEvent.value + '</span>';
  result += '<span>&nbsp;&nbsp;</span>';
  result += `<span id="${tabId}" onclick="delConfirm(id)"><i class="fas fa-trash-alt"></i></span>`;

  document.getElementById(tabId).innerHTML = result;
}

window.goToBasicView = function() {
  createNewEvent.style.display = "none";
  document.getElementById('failed').style.display = "none";
  basicView.style.display = "block";
}

// Delete event
window.delConfirm = function (id) {
  document.getElementById('delEvent').style.display = "block";
  document.getElementById("delBtn").addEventListener("click", delEvent);

  function delEvent() {
    document.getElementById(id).style.visibility = "hidden";
    let i;
    for (i = 0; i < allMembers.length ; i++) {
      let tabId = allMembers[i].day + allMembers[i].time;
      if (tabId == id) {
        allMembers.splice(i, 1);
      }
    }
    document.getElementById('delEvent').style.display = 'none';    
  }
}

// Filtering participants
window.filterPerson = function(name) {
  let i;
  for (i = 0; i < allMembers.length ; i++) {
    let idF = allMembers[i].day + allMembers[i].time;
    document.getElementById(idF).style.visibility = "hidden";

    if ( name == "All members" || name == allMembers[i].participants ) {
      document.getElementById(idF).style.visibility = "visible";
    }
  }
}