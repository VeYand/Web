let authorPhotoField = document.querySelector('.form-block__author-photo-field');
let authorPhotoLabel = document.querySelector('.author-photo-field__label');
let postCardPreview__authorPhotoContainer = document.querySelector('.post-card-preview__author-photo-container');

var authorPhotoURL;
var authorPhotoName;
const authorPhotoReader = new FileReader();
function updateAuthorPhoto(input) {
    var curFile = input.files[0];
    if ((document.querySelector('.author-photo-field__uploaded-block') == null) && curFile) {
        authorPhotoField.removeChild(authorPhotoLabel);
        let lastChild = input.parentNode.querySelector('.alert-text');
        lastChild.insertAdjacentHTML("beforebegin", `<div class="author-photo-field__uploaded-block uploaded-block">
                                                                <img alt="AuthorIcon" class="author-photo-uploaded-block__image">
                                                                <div class="author-photo-uploaded-block__update-button-block update-button-block">
                                                                    <label for="author-photo" class="author-photo-uploaded-block__new-button-container new-button-container">
                                                                        <img src="${CameraIconURL}" alt="Upload New" class="new-button-icon">
                                                                        <span class="author-photo-uploaded-block__new-button-text new-button-text">Upload New</span>
                                                                    </label>
                                                                    <label onclick="removeAuthorPhoto()" class="author-photo-uploaded-block__del-button-container del-button-container">
                                                                        <img src="${TrashIconURL}" alt="Remove" class="del-button-icon">
                                                                        <span class="author-photo-uploaded-block__del-button-text del-button-text">Remove</span>
                                                                    </label>
                                                                </div>
                                                            </div>`);
        postCardPreview__authorPhotoContainer.insertAdjacentHTML("beforeend", `<img alt="AuthorIcon" class="post-card-preview__author-photo">`);
    }
    let authorPhoto = document.querySelector('.author-photo-uploaded-block__image');
    
    if (curFile)
    {
        authorPhotoReader.readAsDataURL(curFile);
        authorPhotoName = curFile.name;
    }

    authorPhotoReader.addEventListener(
        "load",
        ()=>{
            authorPhotoURL = authorPhotoReader.result;
            authorPhoto.src = authorPhotoURL;
            document.querySelector('.post-card-preview__author-photo').src = authorPhotoURL;
        },
        false
    );
    removeAlertEmptyField(input.parentNode);
}

function removeAuthorPhoto() {
    authorPhotoField.removeChild(document.querySelector('.author-photo-field__uploaded-block'));
    let lastChild = document.querySelector('.form-block__author-photo-field .alert-text');
    lastChild.before(authorPhotoLabel);
    postCardPreview__authorPhotoContainer.removeChild(document.querySelector('.post-card-preview__author-photo'));
    authorPhotoURL = null;
    authorPhotoName = null;
}


let largeHeroImageField = document.querySelector('.form-block__hero-image_large');
let largeHeroImageLabel = document.querySelector('.hero-image__label_large');
let largeHeroImageRequirements = document.querySelector('.hero-image__requirements_large-image');
let articlePreview__imageContainer = document.querySelector('.article-preview__image-container');

var largeHeroImageURL;
var largeHeroImageName;
const largeHeroPhotoReader = new FileReader();
function updateLargeHeroPhoto(input) {
    var curFile = input.files[0];
    if ((document.querySelector('.hero-image__uploaded-block_large') == null) && curFile) {
        largeHeroImageField.removeChild(largeHeroImageLabel);
        largeHeroImageField.removeChild(largeHeroImageRequirements);
        let lastChild = input.parentNode.querySelector('.alert-text');
        lastChild.insertAdjacentHTML("beforebegin", `<div class="hero-image__uploaded-block hero-image__uploaded-block_large">
                                                            <img alt="LargeImage" class="hero-image-uploaded-block__image hero-image-uploaded-block__image_large">
                                                            <div class="hero-image-uploaded-block__update-button-block update-button-block">
                                                                <label for="image-large" class="hero-image-uploaded-block__new-button-container new-button-container">
                                                                    <img src="${CameraIconURL}" alt="Upload New" class="new-button-icon">
                                                                    <span class="hero-image-uploaded-block__new-button-text new-button-text">Upload New</span>
                                                                </label>
                                                                <label onclick="removeLargeHeroPhoto()" class="hero-image-uploaded-block__del-button-container del-button-container">
                                                                    <img src="${TrashIconURL}" alt="Remove" class="del-button-icon">
                                                                    <span class="hero-image-uploaded-block__del-button-text del-button-text">Remove</span>
                                                                </label>
                                                            </div>
                                                        </div>`);
        articlePreview__imageContainer.insertAdjacentHTML("beforeend", `<img alt="Large Image" class="article-preview__large-image">`);
    }
    let largeHeroImage = document.querySelector('.hero-image-uploaded-block__image_large');

    if (curFile)
    {
        largeHeroPhotoReader.readAsDataURL(curFile);
        largeHeroImageName = curFile.name;
    }

    largeHeroPhotoReader.addEventListener(
        "load",
        ()=>{
            largeHeroImageURL = largeHeroPhotoReader.result;
            largeHeroImage.src = largeHeroImageURL;
            articlePreview__imageContainer.querySelector('.article-preview__large-image').src = largeHeroImageURL;
        },
        false
    );
    removeAlertEmptyField(input.parentNode);
}

function removeLargeHeroPhoto() {
    largeHeroImageField.removeChild(document.querySelector('.hero-image__uploaded-block_large'));
    let lastChild = document.querySelector('.form-block__hero-image_large .alert-text');
    lastChild.before(largeHeroImageLabel, largeHeroImageRequirements);
    articlePreview__imageContainer.removeChild(document.querySelector('.article-preview__large-image'));
    largeHeroImageURL = null;
    largeHeroImageName = null;
}

let smallHeroImageField = document.querySelector('.form-block__hero-image_small');
let smallHeroImageLabel = document.querySelector('.hero-image__label_small');
let smallHeroImageRequirements = document.querySelector('.hero-image__requirements_small-image');
let postCardPreview__smallImageContainer = document.querySelector('.post-card-preview__small-image-container');

var smallHeroImageURL;
var smallHeroImageName;
const smallHeroPhotoReader = new FileReader();
function updateSmallHeroPhoto(input) {
    var curFile = input.files[0];
    if ((document.querySelector('.hero-image__uploaded-block_small') == null) && curFile) {
        smallHeroImageField.removeChild(smallHeroImageLabel);
        smallHeroImageField.removeChild(smallHeroImageRequirements);
        let lastChild = input.parentNode.querySelector('.alert-text');
        lastChild.insertAdjacentHTML("beforebegin", `<div class="hero-image__uploaded-block hero-image__uploaded-block_small">
                                                                <img alt="SmallImage" class="hero-image-uploaded-block__image hero-image-uploaded-block__image_small">
                                                                <div class="hero-image-uploaded-block__update-button-block update-button-block">
                                                                    <label for="image-small" class="hero-image-uploaded-block__new-button-container new-button-container">
                                                                        <img src="${CameraIconURL}" alt="Upload New" class="new-button-icon">
                                                                        <span class="hero-image-uploaded-block__new-button-text new-button-text">Upload New</span>
                                                                    </label>
                                                                    <label onclick="removeSmallHeroPhoto()" class="hero-image-uploaded-block__del-button-container del-button-container">
                                                                        <img src="${TrashIconURL}" alt="Remove" class="del-button-icon">
                                                                        <span class="hero-image-uploaded-block__del-button-text del-button-text">Remove</span>
                                                                    </label>
                                                                </div>
                                                            </div>`);
        postCardPreview__smallImageContainer.insertAdjacentHTML("beforeend", `<img alt="Small Image" class="post-card-preview__small-image">`);
    }
    let smallHeroImage = document.querySelector('.hero-image-uploaded-block__image_small');
    
    if (curFile)
    {
        smallHeroPhotoReader.readAsDataURL(curFile);
        smallHeroImageName = curFile.name;
    }

    smallHeroPhotoReader.addEventListener(
        "load",
        ()=>{
            smallHeroImageURL = smallHeroPhotoReader.result
            smallHeroImage.src = smallHeroImageURL;
            postCardPreview__smallImageContainer.querySelector('.post-card-preview__small-image').src = smallHeroImageURL;
        },
        false
    );
    removeAlertEmptyField(input.parentNode);
}

function removeSmallHeroPhoto() {
    smallHeroImageField.removeChild(document.querySelector('.hero-image__uploaded-block_small'));
    let lastChild = document.querySelector('.form-block__hero-image_small .alert-text');
    lastChild.before(smallHeroImageLabel, smallHeroImageRequirements);
    postCardPreview__smallImageContainer.removeChild(document.querySelector('.post-card-preview__small-image'));
    smallHeroImageURL = null;
    smallHeroImageName = null;
}


function alertEmptyField(fieldBlock) {
    const alertText = fieldBlock.querySelector('.alert-text');

    setTimeout(() => {
        alertText.style.fontSize = '12px';
    }, 10);

    const alertLine = fieldBlock.querySelector('.alert-line');
    if (alertLine) {
        setTimeout(() => {
            alertLine.style.width = '100%';
            }, 10); 
    }
}

function removeAlertEmptyField(fieldBlock) {
    const alertText = fieldBlock.querySelector('.alert-text');
    if (alertText.style.fontSize !== '0px'){
        setTimeout(() => {
            alertText.style.fontSize = '0px';
        }, 10);

        const alertLine = fieldBlock.querySelector('.alert-line');
        if (alertLine) {
            setTimeout(() => {
                alertLine.style.width = '0%';
                }, 10);
        }
    }
}

let titlePostCardPreview = document.querySelector('.post-card-preview__title');
let titleArticlePreview = document.querySelector('.article-preview__title');
function changeTitle(titleInputField) {
    let title = titleInputField.value;
    if (title) {
        titlePostCardPreview.textContent = title;
        titleArticlePreview.textContent = title;
        removeAlertEmptyField(titleInputField.parentNode)
    }
    else {
        console.log('Пустая строка!!!');
        alertEmptyField(titleInputField.parentNode)
        titlePostCardPreview.textContent = 'New Post';
        titleArticlePreview.textContent = 'New Post';
    }
}

let descriptionPostCardPreview = document.querySelector('.post-card-preview__subtitle');
let descriptionArticlePreview = document.querySelector('.article-preview__subtitle');
function changeDescription(descriptionInputField) {
    let description = descriptionInputField.value;
    if (description) {
        descriptionPostCardPreview.textContent = description;
        descriptionArticlePreview.textContent = description;
        removeAlertEmptyField(descriptionInputField.parentNode)
    }
    else {
        console.log('Пустая description!!!');
        alertEmptyField(descriptionInputField.parentNode)
        descriptionPostCardPreview.textContent = 'Please, enter any description';
        descriptionArticlePreview .textContent = 'Please, enter any description';
    }
}

let authorNamePostCardPreview = document.querySelector('.post-card-preview__author');
function changeAuthorName(authorNameInputField) {
    let authorName = authorNameInputField.value;
    if (authorName) {
        authorNamePostCardPreview.textContent = authorName;
        removeAlertEmptyField(authorNameInputField.parentNode)
    }
    else {
        console.log('Пустая authorName!!!');
        alertEmptyField(authorNameInputField.parentNode)
        authorNamePostCardPreview.textContent = 'Enter author name';
    }
}


function getTodayDate(format) {
    if (format == 'YYYY-MM-DD') {
        return (new Date()).toISOString().split('T')[0];
    }
    else if (format == 'MM/DD/YYYY') {
        let dateObj = new Date();
        return `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
    }
    else {
        throw new Error('Invalid format parameter!');
    }
}
document.querySelector('.publish-date-field__input').value = getTodayDate('YYYY-MM-DD');
document.querySelector('.post-card-preview__data').textContent = getTodayDate('MM/DD/YYYY');

var isDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

let datePostCardPreview = document.querySelector('.post-card-preview__data');
function changeDate(dateInputField) {
    let date = dateInputField.value;
    if (isDate(date)) {
        console.log("Верная дата");
        datePostCardPreview.textContent = date;
        removeAlertEmptyField(dateInputField.parentNode)
    }
    else {
        console.log("Неверная дата!!");
        alertEmptyField(dateInputField.parentNode)
        datePostCardPreview.textContent = getTodayDate('MM/DD/YYYY');
    }
}


function changeContent(contentInputField) {
    let content = contentInputField.value;
    if (content) {
        removeAlertEmptyField(contentInputField.parentNode)
    }
    else {
        console.log('Пустой контент!!!');
        alertEmptyField(contentInputField.parentNode)
    }
}

function getTitle() {
    let titleField = document.querySelector('.title-field__title-input');
    return titleField.value;
}

function getShortDescription() {
    let shortDescriptionField = document.querySelector('.description-field__description-input');
    return shortDescriptionField.value;
}

function getAuthorName() {
    let authorNameField = document.querySelector('.author-name-field__author-name-input');
    return authorNameField.value;
}

function getPublishDate() {
    let publishDateField = document.querySelector('.publish-date-field__input');
    if (isDate(publishDateField.value)) {
        let date = publishDateField.value.split('-')
        return `${date[1]}/${date[2]}/${date[0]}`; 
    }
    else {
        return null;
    }
    
}

function getContent() {
    let contentField = document.querySelector('.content-block__content-field');
    return contentField.value;
}

function errLog(errText) {
    if (postStatusBlock.classList.contains('post-status-block_successful')) {
        postStatusBlock.classList.remove('post-status-block_successful');
    }
    postStatusBlock.classList.add("post-status-block_error");
    postStatusBlock.querySelector('.post-status-block__text').textContent = errText;
    postStatusBlock.querySelector('.post-status-block__icon').src = AlertIconURL;
}

function publish() {
    let postInfo = {
        "title": getTitle(),
        "shortDescription": getShortDescription(),
        "authorName": getAuthorName(),
        "authorPhotoURL": authorPhotoURL,
        "authorPhotoName": authorPhotoName,
        "publishDate": getPublishDate(),
        "largeHeroImageURL": largeHeroImageURL,
        "largeHeroImageName": largeHeroImageName,
        "smallHeroImageURL": smallHeroImageURL,
        "smallHeroImageName": smallHeroImageName,
        "content": getContent()
    }

    let filledFields = true;
    for (var key in postInfo) {
        if (postInfo[key] == null || postInfo[key] == "") {
            filledFields = false;
            console.log(key);
            switch (key) {
                case 'title':
                    alertEmptyField(document.querySelector('.form-block__title-field'));
                    break;
                case 'shortDescription':
                    alertEmptyField(document.querySelector('.form-block__description-field'));
                    break;
                case 'authorName':
                    alertEmptyField(document.querySelector('.form-block__author-name-field'));
                    break;
                case 'publishDate':
                    alertEmptyField(document.querySelector('.form-block__publish-date-field'));
                    break;
                case 'content':
                    alertEmptyField(document.querySelector('.content-block__container'));
                    break;
                case 'authorPhotoURL':
                    alertEmptyField(document.querySelector('.form-block__author-photo-field'));
                    break;
                case 'largeHeroImageURL':
                    alertEmptyField(document.querySelector('.form-block__hero-image_large'));
                    break;
                case 'smallHeroImageURL':
                    alertEmptyField(document.querySelector('.form-block__hero-image_small'));
                    break;
            }
        }
    }
    let postStatusBlock = document.querySelector('.post-status-block');
    if (!postStatusBlock) {
        let topBlock = document.querySelector('.top-block');
        topBlock.insertAdjacentHTML("afterend", `<div class="post-status-block ">
                                                        <img src="" alt="Status icon" class="post-status-block__icon">
                                                        <span class="post-status-block__text"></span>
                                                    </div>`);
        postStatusBlock = document.querySelector('.post-status-block');
        setTimeout(() => {
                postStatusBlock.style.height = '44px';
                postStatusBlock.style.marginBottom = '16px';
        }, 10);
        
    }
    if (!filledFields) {
        console.log('Заполните все поля!!');
        errLog('Whoops! Some fields need your attention :o');
        return;
    }    
    else
    {
        if (postStatusBlock.classList.contains('post-status-block_error')) {
            postStatusBlock.classList.remove('post-status-block_error');
        }
        postStatusBlock.classList.add("post-status-block_successful");
        postStatusBlock.querySelector('.post-status-block__text').textContent = 'Publish Complete!';
        postStatusBlock.querySelector('.post-status-block__icon').src = CheckIconURL;


        let json = JSON.stringify(postInfo);
        console.log(json);
        console.log("Сохраняем страницу");

        let newPostContent = JSON.stringify(postInfo);
        let XHR = new XMLHttpRequest();
        XHR.open("POST", "/api/post");
        XHR.send(newPostContent);
    }
}

function logout() {
    let XHR = new XMLHttpRequest();
    XHR.open("POST", "/api/logout");
    XHR.send("");
    window.location.href = "/home"
}