let topTitleContainer = document.getElementById('titleContainer');
let logo = document.createElement('div');
logo.id = 'logo';
topTitleContainer.appendChild(logo);




let firstArticleContainer = document.createElement('div');
firstArticleContainer.id = 'container1';
firstArticleContainer.className ='articleContainer';
let textAreaFirst =  document.createElement('div');
textAreaFirst.id = 'textAreaFirst';
firstArticleContainer.appendChild(textAreaFirst);


let articleContainer = document.getElementById('articleContainer');
articleContainer.appendChild(firstArticleContainer);




(function (window) {
	
	App.utils.Get('https://www.reddit.com/r/food/.json',(data) => {
		const parsedFirstData = JSON.parse(data);
		let author = parsedFirstData.data.children[1].data.author;
		let title = parsedFirstData.data.children[1].data.title;
		let pictureData = parsedFirstData.data.children[1].data.preview.images[0].source.url;
		if (pictureData === undefined) {
			pictureData = 'http://www.freeiconspng.com/uploads/reddit-logo-icon-0.png';
		}

		let titleContainer = document.createElement('h1');
		let articleDetailsContainer = document.createElement('h4');
		let picture = document.createElement('img');
		picture.src = pictureData;
		picture.style.width = '350px';
		picture.style.height = '300px';
		textAreaFirst.appendChild(picture);
		textAreaFirst.appendChild(titleContainer);
		textAreaFirst.appendChild(articleDetailsContainer);


		titleContainer.innerHTML = title;
		articleDetailsContainer.innerHTML += `by ${author}`;

		let i = 2;
		while(JSON.parse(data).data.children[i] !== undefined){
			let subsequentArticleContainer = document.createElement('div');
			subsequentArticleContainer.className ='articleContainer';
			subsequentArticleContainer.id = 'container'+i;
			let textAreaSubsequent =  document.createElement('div');
			subsequentArticleContainer.appendChild(textAreaSubsequent);
			
			let subsequentTitleContainer = document.createElement('h1');
			let subsequentDetailsContainer = document.createElement('h4');
			let subsequentPictureData;
			if (parsedFirstData.data.children[i].data.preview === undefined) {
				subsequentPictureData = 'http://www.freeiconspng.com/uploads/reddit-logo-icon-0.png';
			} else {
				subsequentPictureData = parsedFirstData.data.children[i].data.preview.images[0].source.url;
			}

			let subsequentPicture = document.createElement('img');
			subsequentPicture.src = subsequentPictureData;
			subsequentPicture.style.width = '350px';
			subsequentPicture.style.height = '300px';
			
			textAreaSubsequent.appendChild(subsequentPicture);
			textAreaSubsequent.appendChild(subsequentTitleContainer);
			textAreaSubsequent.appendChild(subsequentDetailsContainer);
			articleContainer.appendChild(subsequentArticleContainer);


			const parsedSubsequentData = JSON.parse(data);
			let subsequentAuthor = parsedSubsequentData.data.children[i].data.author;
			let subsequentTitle = parsedSubsequentData.data.children[i].data.title;
			subsequentTitleContainer.innerHTML = subsequentTitle +'<br>';
			subsequentDetailsContainer.innerHTML += `by ${subsequentAuthor}`;
			i++;
		}
	});
}(window));