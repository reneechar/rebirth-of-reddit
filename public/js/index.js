let topTitleContainer = document.getElementById('titleContainer');
let articleSection = document.getElementById('content');

let nextURL;


let fetchedData = false;

function displayArticles (url) {
	fetchedData = false;
	
	App.utils.Get(url,(data) => {
		
		const parsedData = JSON.parse(data);

		let i = 1;
		if (url.substring(url.length-4) === 'json') {
			nextURL = url+'?count=25&after=' + parsedData.data.after;
		} else {
			nextURL = url.substring(0,url.indexOf('after=')+6) + parsedData.data.after;
		}

		while(JSON.parse(data).data.children[i] !== undefined){

			let articleBox = document.createElement('div');
			articleBox.className ='articleBox';
			articleBox.id = 'container'+i;
			let articleText =  document.createElement('div');
			articleBox.appendChild(articleText);
			
			let articleTitle = document.createElement('h1');
			let articleDetails = document.createElement('h4');
			let pictureURL;
			if (parsedData.data.children[i].data.preview === undefined) {
				pictureURL = 'http://www.freeiconspng.com/uploads/reddit-logo-icon-0.png';
			} else {
				pictureURL = parsedData.data.children[i].data.preview.images[0].source.url;
			}

			let picture = document.createElement('img');
			picture.src = pictureURL;
			picture.style.width = '350px';
			picture.style.height = '300px';
			
			articleText.appendChild(picture);
			articleText.appendChild(articleTitle);
			articleText.appendChild(articleDetails);
			articleSection.appendChild(articleBox);


			let author = parsedData.data.children[i].data.author;
			let title = parsedData.data.children[i].data.title;
			articleTitle.innerHTML = title +'<br>';
			articleDetails.innerHTML += `by ${author}`;
			i++;
		}
		fetchedData = true;
	});
}

//initial onload display
displayArticles('https://www.reddit.com/r/food/.json');

//display another subreddit when clicking randomButton
let randomButton = document.getElementById('randomButton');

randomButton.addEventListener('click', () => {
	while(articleSection.hasChildNodes()) {
		articleSection.removeChild(articleSection.lastChild);
	}
	//need to be able to use iframes
	// displayArticles(randomURL);
});


//display dbz for myboards

let myBoards = document.getElementById('myBoardsButton');
myBoards.addEventListener('click', () => {
	while(articleSection.hasChildNodes()) {
		articleSection.removeChild(articleSection.lastChild);
	}
	displayArticles('https://www.reddit.com/r/dbz/.json');

});


//adds more articles from the next page
this.window.addEventListener('scroll', function(){
let scrollTop = this.document.body.scrollTop;
let windowHeight = this.document.body.clientHeight;
let scrollPercentage = Math.round(scrollTop / windowHeight*10)/10;
  if(scrollPercentage > 0.8 && fetchedData){
		displayArticles(nextURL);
  }
});
