console.log("Js Start");

console.log(document.body);


var t1 = document.querySelector("#delBtn");
var t2 = document.querySelector("#editBtn");
var motal_body = document.querySelector(".modal-body");
var modal_closebtn = document.querySelector("#modal_closebtn");
var modal = document.querySelector(".modal");
function btn_listener(event){
		motal_body.innerHTML = "";
		console.log(event);
		switch(event.target.id){
				case 'delBtn':
						// alert(1);
						console.log("delBtn click");
						motal_body.innerHTML = "Del";
						break;
				case 'editBtn':
					  console.log("editBtn click");
						// alert(2);
						motal_body.innerHTML = "Edit";
						break;
		}
		modal.style.display = "block";
}

modal_closebtn.addEventListener('click', function(){
  console.log("modal_closebtn click");
  motal_body.innerHTML = "";
});

t1.addEventListener('click', btn_listener); // btn_listener()가 아니다.
t2.addEventListener('click', btn_listener); // btn_listener()가 아니다.
