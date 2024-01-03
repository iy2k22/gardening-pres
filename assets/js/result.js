$(document).ready(() => {
    const plantApiKey = "sk-xb196594798a6d05b3635";
    let requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };
    fetch(`https://perenual.com/api/species-list?q=Maple&key=${plantApiKey}`, requestOptions)
    .then((res) => {
        if (!res.ok)
            throw new Error('as');
        return res.json();
    })
    .then(({ data }) => {
        console.log(data);
        for (let plant of data) {
            console.log(plant);
            const plantEl = $("<li></li>");
            plantEl.attr("id", plant.id);
            const link = $("<a></a>");
            link.attr("href", `./species-page.html?id=${plant.id}`);
            const head = $("<h2></h2>");
            head.text(plant.common_name);
            link.append(head);
            plantEl.append(link);
            if (plant.default_image) {
                const plantImg = $("<img>");
                plantImg.attr("src", plant.default_image.thumbnail);
                plantEl.append(plantImg);
            }
            $("#plants").append(plantEl);
        }
    })
})