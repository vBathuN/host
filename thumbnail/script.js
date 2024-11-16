window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded() {
    canvasApp();
}

function drawImageProp(context, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
        x = y = 0;
        w = 1280;
        h = 720;
    }

    /// default offset is center
    offsetX = offsetX ? offsetX : 0.5;
    offsetY = offsetY ? offsetY : 0.5;

    /// keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   /// new prop. width
        nh = ih * r,   /// new prop. height
        cx, cy, cw, ch, ar = 1;

    /// decide which gap to fill
    if (nw < w) ar = w / nw;
    if (nh < h) ar = h / nh;
    nw *= ar;
    nh *= ar;

    /// calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    /// make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    /// fill image in dest. rectangle
    context.drawImage(img, cx, cy, cw, ch, x, y, w, h);
}

function canvasApp() {

    var message = "Something went viral online";
    var tickermessage = "\"Is this really news?\" asks commenter  |  5 million retweets in 1 hour already";
    var img = new Image();
    var imageRatio = "wide";
    var merchDraw = false;

    var theCanvas = document.getElementById("canvasOne");
    var context = theCanvas.getContext("2d");

    var formElement = document.getElementById("textBox");
    formElement.addEventListener("keyup", textBoxChanged, false);

    var formElement2 = document.getElementById("tickerBox");
    formElement2.addEventListener("keyup", textBox2Changed, false);

    var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);

    if (document.querySelector('input[name="imageRatio"]')) {
        document.querySelectorAll('input[name="imageRatio"]').forEach((elem) => {
            elem.addEventListener("change", function (event) {
                imageRatioChanged(event)
            });
        });
    }

    const imgPreview = document.querySelector('.js-merch-preview');

    const positions = {
        portrait: {
            "canvasWidth": 1280,
            "canvasHeight": 2276,
            "liveText": {
                "font": '48px',
                "x": 96,
                "y": 256,
            },
            "liveBox": {
                "x": 80,
                "y": 200,
                "w": 128,
                "h": 80,
            },
            "credit": {
                "font": '52px',
                "x": 680,
                "y": 260,
            },
            "headlineBoxX": 80,
            "headlineBoxY": 2020,
            "headlineTextX": 100,
            "headlineTextY": 2100,
            "clockBox": {
                "x": 80,
                "y": 2130,
                "w": 120,
                "h": 72,
            },
            "clockText": {
                "font": "34px",
                "x": 96,
                "y": 2176,
            },
            "breakingBox": {
                "x": 80,
                "y": 1924,
                "w": 500,
                "h": 96,
            },
            "breakingText": {
                "x": 100,
                "y": 1990,
                "font": '58px',
            },
            "tickerBox": {
                "x": 200,
                "y": 2130,
                "w": 1080,
                "h": 72,
            },
            "tickerText": {
                "font": "34px",
                "x": 220,
                "y": 2176,
            },
        },
        square: {
            "canvasWidth": 1280,
            "canvasHeight": 1280,
            "liveText": {
                "font": '48px',
                "x": 96,
                "y": 116,
            },
            "liveBox": {
                "x": 80,
                "y": 60,
                "w": 128,
                "h": 80,
            },
            "credit": {
                "font": '44px',
                "x": 775,
                "y": 110,
            },
            "headlineBoxX": 80,
            "headlineBoxY": 1020,
            "headlineTextX": 100,
            "headlineTextY": 1100,
            "clockBox": {
                "x": 80,
                "y": 1130,
                "w": 120,
                "h": 72,
            },
            "clockText": {
                "font": "34px",
                "x": 96,
                "y": 1176,
            },
            "breakingBox": {
                "x": 80,
                "y": 924,
                "w": 500,
                "h": 96,
            },
            "breakingText": {
                "x": 100,
                "y": 990,
                "font": '58px',
            },
            "tickerBox": {
                "x": 200,
                "y": 1130,
                "w": 1080,
                "h": 72,
            },
            "tickerText": {
                "font": "34px",
                "x": 220,
                "y": 1176,
            },
        },
        wide: {
            "canvasWidth": 1280,
            "canvasHeight": 720,
            "liveText": {
                "font": '36px',
                "x": 96,
                "y": 84,
            },
            "liveBox": {
                "x": 80,
                "y": 40,
                "w": 104,
                "h": 60,
            },
            "credit": {
                "font": '38px',
                "x": 850,
                "y": 80,
            },
            "headlineBoxX": 80,
            "headlineBoxY": 510,
            "headlineTextX": 100,
            "headlineTextY": 590,
            "clockBox": {
                "x": 80,
                "y": 620,
                "w": 100,
                "h": 60,
            },
            "clockText": {
                "font": "28px",
                "x": 96,
                "y": 660,
            },
            "breakingBox": {
                "x": 80,
                "y": 430,
                "w": 420,
                "h": 80,
            },
            "breakingText": {
                "x": 100,
                "y": 488,
                "font": '48px',
            },
            "tickerBox": {
                "x": 180,
                "y": 620,
                "w": 1100,
                "h": 60,
            },
            "tickerText": {
                "font": "28px",
                "x": 200,
                "y": 660,
            },
        }
    };

    var imageObj = new Image();
    imageObj.src = 'overlay.png';


    drawScreen();

    function drawScreen() {

        let currentPos = positions[imageRatio];

        if (merchDraw === true) {
            context.canvas.width = currentPos.canvasWidth * 2;
            context.canvas.height = (currentPos.canvasHeight * 2) + 100;
            context.scale(2, 2);
        }

        //Background
        context.fillStyle = "#222222";
        context.fillRect(0, 0, currentPos.canvasWidth, currentPos.canvasHeight);


        //Image
        if (img.src) {
            drawImageProp(context, img, 0, 0, currentPos.canvasWidth, currentPos.canvasHeight);
        }

        //Live
        context.fillStyle = "rgba(194, 21, 15, 1.000)";
        context.fillRect(currentPos.liveBox.x, currentPos.liveBox.y, currentPos.liveBox.w, currentPos.liveBox.h);

        context.font = "700 " + currentPos.liveText.font + " Signika";
        context.fillStyle = "#FFFFFF";
        context.fillText('LIVE', currentPos.liveText.x, currentPos.liveText.y);

        //Breaking News Strap
        // Create gradient

        let currentGradEnd = currentPos.breakingBox.y + currentPos.breakingBox.h

        redgrd = context.createLinearGradient(0, currentPos.breakingBox.y, 0, currentGradEnd);

        // Add colors
        redgrd.addColorStop(0.000, 'rgba(109, 36, 39, 1.000)');
        redgrd.addColorStop(0.015, 'rgba(224, 54, 44, 1.000)');
        redgrd.addColorStop(0.455, 'rgba(194, 21, 15, 1.000)');
        redgrd.addColorStop(0.488, 'rgba(165, 10, 1, 1.000)');
        redgrd.addColorStop(1.000, 'rgba(109, 36, 39, 1.000)');

        context.fillStyle = redgrd;
        context.fillRect(currentPos.breakingBox.x, currentPos.breakingBox.y, currentPos.breakingBox.w, currentPos.breakingBox.h);

        context.font = "700 " + currentPos.breakingText.font + " Signika";
        context.fillStyle = "#FFFFFF";
        context.fillText('BREAKING NEWS', currentPos.breakingText.x, currentPos.breakingText.y);

        //Box
        context.fillStyle = "rgba(255,255,255,0.85)";
        context.fillRect(currentPos.headlineBoxX, currentPos.headlineBoxY, 1200, 110);

        //Text
        context.font = "700 72px Signika";
        context.fillStyle = "#000000";
        context.fillText(message.toUpperCase(), currentPos.headlineTextX, currentPos.headlineTextY);


        //Clock
        context.fillStyle = "#000";
        context.fillRect(currentPos.clockBox.x, currentPos.clockBox.y, currentPos.clockBox.w, currentPos.clockBox.h);

        today = new Date();
        var m = today.getMinutes();
        var h = today.getHours();

        if (h < 10) {
            h = "0" + h
        }

        if (m < 10) {
            m = "0" + m
        }

        context.font = "700 " + currentPos.clockText.font + " Signika";
        context.fillStyle = "#FFFFFF";
        context.fillText((h + ":" + m), currentPos.clockText.x, currentPos.clockText.y);


        //Ticker
        context.fillStyle = "#feeb1a";
        context.fillRect(currentPos.tickerBox.x, currentPos.tickerBox.y, currentPos.tickerBox.w, currentPos.tickerBox.h);

        context.font = "700 " + currentPos.tickerText.font + " Signika";
        context.fillStyle = "#000";
        context.fillText(tickermessage.toUpperCase(), currentPos.tickerText.x, currentPos.tickerText.y);

        //Logo

        if (merchDraw === true) {
            context.globalAlpha = 1;
            context.font = "400 24px Signika";
            context.fillStyle = "#000";
            context.fillText('breakyourownnews.com', 0, (currentPos.canvasHeight + 30));
        } else {
            context.globalAlpha = 0.7;
            context.shadowColor = "rgba(0,0,0,0.7)";
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = 6;

            context.font = "400 " + currentPos.credit.font + " Signika";
            context.fillStyle = "#fff";
            context.fillText('breakyourownnews.com', currentPos.credit.x, currentPos.credit.y);
            context.globalAlpha = 1;
            context.shadowBlur = 0;

        }

        //Copy to merch preview

        theCanvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            imgPreview.src = url;
        });

        //context.drawImage(imageObj, 560, 20);


    }

    function textBoxChanged(e) {
        var target = e.target;
        message = target.value;
        drawScreen();
    }


    function textBox2Changed(e) {
        var target = e.target;
        tickermessage = target.value;
        drawScreen();
    }

    function imageRatioChanged(e) {
        //put a class on the Canvas so you can max-width it in CSS.

        imageRatio = e.target.value;

        context.canvas.width = positions[imageRatio].canvasWidth;
        context.canvas.height = positions[imageRatio].canvasHeight;

        theCanvas.setAttribute('data-ratio', e.target.value)

        drawScreen();
    }

    function handleImage(e) {
        var reader = new FileReader();
        reader.onload = function (event) {
            img.onload = function () {
                drawScreen();
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);


    }


    var button = document.getElementById('btn-download');

    $('#btn-download').click(function () {

        ga('send', 'event', 'Break Your Own News', 'Download');
        button.href = theCanvas.toDataURL('image/jpeg', 0.9);
    });


    $('#btn-imgur').click(function () {
        share();
    });



    const products = {
        unisex: {
            "item_code": "RNA1",
            "name": "Custom Break Your Own News T-Shirt - Unisex",
            "price": 22,
        },
        womens: {
            "item_code": "RNB14",
            "name": "Custom Break Your Own News T-Shirt - Womens",
            "price": 22,
        },
        mug: {
            "item_code": "RNK25",
            "name": "Custom Break Your Own News Mug",
            "price": 12,
        },
        tote: {
            "item_code": "RNT1",
            "name": "Custom Break Your Own News Tote Bag",
            "price": 14,
        },
    }

   $('.js-buy').click(function () {
       buy($(this).data('product'));
    });

    function buy(product) {

        currentProduct = products[product];

        merchDraw = true;
        drawScreen();

        // Export the base64 image from the canvas
        const base64_image = theCanvas.toDataURL();

        merchDraw = false;
        context.canvas.width = positions[imageRatio].canvasWidth;
        context.canvas.height = positions[imageRatio].canvasHeight;
        drawScreen();

        const apiKey = 'HTmzIMEVKXbR288y08f2RjpWL7F9NT0SG4hAcvt8';

        // Set the fields to submit. image_url is the only required field for the API request. If you want, you can set the product name, description and price. You can also change the product type and colours using item_code and colours. To find an up-to-date list of available options for these fields, visit this endpoint: https://teemill.com/omnis/v3/product/options/
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                image_url: base64_image,
                item_code: currentProduct.item_code,
                name: currentProduct.name,
                price: currentProduct.price,
                cross_sell: true,
            }),
        };
        // Open a new tab, ready to receive the product URL.
         var newTab = window.open('about:blank', '_blank');
         newTab.document.write(
            "<body style='background-color:#faf9f9;width:100%;height:100%;margin:0;position:relative;'><img src='https://storage.googleapis.com/teemill-dev-image-bucket/doodle2tee_loader.gif' style='position:absolute;top:calc(50% - 100px);left:calc(50% - 100px);'/></body>"
         );

        // Send the API request, and redirect the new tab to the URL that is returned
         fetch('https://teemill.com/omnis/v3/product/create', options)
            .then(response => response.json())
            .then(response => newTab.location.href = response.url)
            .catch(err => console.error(err));
    }

    function share() {
        try {
            var img = theCanvas.toDataURL('image/jpeg', 0.9).split(',')[1];
        } catch (e) {
            var img = theCanvas.toDataURL().split(',')[1];
        }
        $('.upload-response').html('Uploading...');

        // upload to imgur using jquery/CORS
        // https://developer.mozilla.org/En/HTTP_access_control
        $.ajax({
            url: 'https://api.imgur.com/3/image',
            type: 'POST',
            headers: {
                Authorization: 'Client-ID ae18f967d8336e3',
                Accept: 'application/json'
            },
            data: {
                type: 'base64',
                name: 'breakyourownnews.jpg',
                title: 'Break Your Own News',
                caption: 'Made with http://www.breakyourownnews.com/',
                image: img
            },
            success: function (result) {
                ga('send', 'event', 'Break Your Own News', 'imgur');
                console.dir(result);
                var url = 'https://imgur.com/' + result.data.id;
                var deleteurl = 'https://imgur.com/delete/' + result.data.deletehash;
                $('.upload-response').html("Uploaded! You can find it at <a href='" + url + "'>" + url + "</a><br />If you want to delete your image, save and visit this address: <a href='" + deleteurl + "'>" + deleteurl + "</a>");
            },
            error: function (result) {
                $('.upload-response').html('Couldn\'t upload to imgur - sorry! :(');
            }

        });

    }


}
