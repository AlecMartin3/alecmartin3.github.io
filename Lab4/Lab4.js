window.onload = function() {
    document.body.className += " loaded";
    var AddArtistBut = document.getElementById('AddArtistBut');
    var customFields = document.getElementById('customFields'); 
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    ul.insertBefore(li, ul.firstChild);
    if(this.ArrayArtist[0] != ""){
    this.Load(this.ArrayArtist);
    }
    function AddArtistName(){
        var ArtName = document.createElement('Input');
        ArtName.type = 'text';
        ArtName.id = "Inputs"
        ArtName.placeholder = "Artist Name"
        return ArtName;
    }
    function AddArtistInfo(){
        var ArtInfo = document.createElement('Input');
        ArtInfo.type = 'text';
        ArtInfo.id = "Inputs";
        ArtInfo.placeholder = "Artist Info"
        return ArtInfo;
    }
    function AddArtistPic(){
        var ArtPic = document.createElement('Input');
        ArtPic.type = 'text';
        ArtPic.id = "Inputs"
        ArtPic.placeholder = "Artist Picture"
        return ArtPic;
    }
    function AddAddBut(){
        var AddBut = document.createElement('Button');
        AddBut.type = 'button';
        AddBut.id = "AddBut"
        AddBut.textContent = "Add"
            AddBut.addEventListener('click', function(e){
                var Name = "";
                var About = "";
                var URL = "";
                var x = document.getElementById("customFields").elements;
                Name = x[0].value;
                About = x[1].value;
                URL = x[2].value;
                        
                if(Name.length == 0){
                    Name = "No Name Given";
                }
                if(About.length == 0){
                    About = "No About Given";
                }
                if(URL.length == 0){
                    URL = "https://i.ytimg.com/vi/JrQkgLLL9XQ/hqdefault.jpg";
                }
                if(Name.length > 40){
                    Name = "Name too long";
                }
                if(About.length > 40){
                    About = "About too long";
                }
                if(ArrayArtist.includes(Name)){
                    alert( "Name Taken at: " + ArrayArtist.indexOf(Name));
                }
                else{
                    var ul = document.getElementById("list");
                    var li = document.createElement("li");
                    ul.insertBefore(li, ul.firstChild);
                    var person = document.createElement("div");
                    person.setAttribute("id", "person");
                    li.appendChild(person);
                    var img = document.createElement("img");
                    person.appendChild(img);
                    img.setAttribute("onError","noImg(this)");
                    img.setAttribute("id", "img");
                    img.setAttribute("alt", Name);
                    img.setAttribute("src", URL);
                    var info = document.createElement("div");
                    info.setAttribute("class", "info");
                    person.appendChild(info);
                    var name = document.createElement("p");
                    name.setAttribute("class", "name");
                    var about = document.createElement("p");
                    info.appendChild(name);
                    info.appendChild(about);
                    name.appendChild(document.createTextNode(Name));
                    about.appendChild(document.createTextNode(About));
                    var del = document.createElement("button");
                    del.setAttribute("class", "del");
                    del.setAttribute("onClick", "Delete(this)");
                    person.appendChild(del);
                    del.appendChild(document.createTextNode("Delete"));

                    Store(URL, Name, About)

                }
            });
        return AddBut;
    }
    AddArtistBut.addEventListener('click', function(e) {
        const inputs = document.getElementById("customFields");
        if(document.getElementById("Inputs")){
            while (inputs.firstChild) {
                inputs.removeChild(inputs.firstChild);
              }
        }
        else{
            customFields.appendChild(AddArtistName());
            customFields.appendChild(AddArtistInfo());
            customFields.appendChild(AddArtistPic());
            customFields.appendChild(AddAddBut());
        }
    });

}
var ArrayArtist = [];
var i = 0;
var global = 0;
console.log(i);
if(i != null){
    if ((localStorage.getItem('i') != null)){
        i = parseInt(localStorage.getItem('i'));
        console.log(i);
    }
}
if (localStorage.getItem("ArrayArtist") != null) {
    ArrayArtist = localStorage.getItem("ArrayArtist").split(",");
}
function noImg(image){
    image.src = "https://i.ytimg.com/vi/JrQkgLLL9XQ/hqdefault.jpg";
}
function Delete(btn){
    (btn.parentNode.parentNode.parentNode).removeChild(btn.parentNode.parentNode);
    Name = btn.parentNode.children[1].firstChild.textContent;
    localStorage.removeItem(Name)
    var index = ArrayArtist.indexOf(Name);
    if (index > -1) {
        ArrayArtist.splice(index, 1);
     }

    console.log(ArrayArtist)
    i--;
    localStorage.setItem("ArrayArtist", ArrayArtist); 
    localStorage.setItem("i", i);
}
function Store(URL, Name, About){
    var index = ArrayArtist.indexOf("");
    if (index > -1) {
        ArrayArtist.splice(index, 1);
     }
    i++;
    var Arr =  [URL, Name, About];
    localStorage.setItem(Name, JSON.stringify(Arr));
    ArrayArtist = ArrayArtist.concat([Name])
    localStorage.setItem("i", i);
    localStorage.setItem("ArrayArtist", ArrayArtist);
    console.log(ArrayArtist);
}
function Load(arr){
    console.log(arr);
    
    for (let index = 1; index < arr.length+1; index++) {
        Get(arr[arr.length-index])
    }
}

function Get(Name){
    console.log(Name);
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    ul.insertBefore(li, ul.firstChild);
    var artist = JSON.parse(localStorage.getItem(Name));
    console.log(artist[0] + " " + artist[1] + " " + artist[2]);
    var person = document.createElement("div");
    person.setAttribute("id", "person");
    li.appendChild(person);
    var img = document.createElement("img");
    person.appendChild(img);
    img.setAttribute("onError","noImg(this)");
    img.setAttribute("id", "img");
    img.setAttribute("alt", artist[1]);
    img.setAttribute("src", artist[0]);
    var info = document.createElement("div");
    info.setAttribute("class", "info");
    person.appendChild(info);
    var name = document.createElement("p");
    name.setAttribute("class", "name");
    var about = document.createElement("p");
    info.appendChild(name);
    info.appendChild(about);
    name.appendChild(document.createTextNode(artist[1]));
    about.appendChild(document.createTextNode(artist[2]));
    var del = document.createElement("button");
    del.setAttribute("class", "del");
    del.setAttribute("onClick", "Delete(this)");
    person.appendChild(del);
    del.appendChild(document.createTextNode("Delete"));       
}
function Search(){
    console.log(ArrayArtist);
    var searchBar = document.getElementById("search")
    var filter = searchBar.value.toUpperCase();
    ul = document.getElementById("list");
    li = ul.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
        
        var txtValue = li[i].textContent;
        console.log(txtValue.toUpperCase().indexOf(filter) + " " + li[i].textContent)
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
	}
}