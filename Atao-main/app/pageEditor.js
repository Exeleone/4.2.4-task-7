window.onload = function () {
    tinymce.init({
        selector: '#pageEditor'
    });
}

const saveNewContent = () => {
    const newPageContent = tinymce.get('pageEditor').getContent();
    $.ajax({
        method: "POST",
        url: "api/v1/editPageContent.php",
        data: {
            page: location.pathname, 
            content: newPageContent
        },
        success: (data) => {
            location.href=location.href;
        }
    });
}