window.onload = function() {
    document.body.className += " loaded";
    var AddArtistBut = document.getElementById('AddArtistBut');
    var customFields = document.getElementById('customFields');  
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
                if(About.length == 0){
                    About = "About too long";
                }
                var ul = document.getElementById("list");
                var li = document.createElement("li");
                var person = document.createElement("div");
                person.setAttribute("id", "person");
                ul.insertBefore(li, ul.firstChild);
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
                del.setAttribute("onClick", "deleteArtist(this)");
                person.appendChild(del);
                del.appendChild(document.createTextNode("Delete"));
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
function noImg(image){
    image.src = "https://i.ytimg.com/vi/JrQkgLLL9XQ/hqdefault.jpg";
}
function deleteArtist(btn){
    (btn.parentNode.parentNode.parentNode).removeChild(btn.parentNode.parentNode);
}